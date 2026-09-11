const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// =====================
// 中文文本相似度（原 submitEntry）
// =====================
function calculateSimilarity(a, b) {
  if (!a || !b) {
    return 0;
  }

  let same = 0;

  for (let i = 0; i < a.length; i++) {
    if (b.includes(a[i])) {
      same++;
    }
  }

  return same / Math.max(a.length, b.length);
}

// =====================
// 提交词条（原 submitEntry）
// =====================
async function submit(openid, event) {
  // 查询用户角色
  const userRes = await db.collection("users")
    .where({ openid })
    .get();

  let role = "visitor";

  if (userRes.data.length > 0) {
    role = userRes.data[0].role;
  }

  console.log("提交词条用户角色:", role);

  // 游客禁止提交
  if (role === "visitor") {
    return {
      success: false,
      message: "游客无法提交词条，请先登录注册"
    };
  }

  // 获取提交内容
  const {
    text,
    desc,
    category,
    tags
  } = event;

  if (!text || !desc || !category) {
    return {
      success: false,
      message: "资料填写不完整"
    };
  }

  // =====================
  // 三库相似词条检测
  // entries / user_entries / pending_entries
  // =====================
  const checkCollections = [
    "entries",
    "user_entries",
    "pending_entries"
  ];

  let duplicates = [];

  for (const collectionName of checkCollections) {
    const res = await db.collection(collectionName)
      .limit(1000)
      .get();

    res.data.forEach(item => {
      if (!item.text) {
        return;
      }

      const similarity = calculateSimilarity(text, item.text);

      if (similarity >= 0.7) {
        duplicates.push({
          source: collectionName,
          text: item.text,
          category: item.category || "",
          similarity: Math.round(similarity * 100) + "%"
        });
      }
    });
  }

  // 发现高度相似词条
  if (duplicates.length) {
    return {
      success: false,
      message: "发现相似词条",
      duplicates: duplicates
    };
  }

  // =====================
  // 检查重复提交
  // =====================
  const exist = await db.collection("pending_entries")
    .where({
      openid: openid,
      text: text
    })
    .get();

  if (exist.data.length > 0) {
    return {
      success: false,
      message: "你已经提交过相同词条，请等待审核"
    };
  }

  // 检查是否已经通过审核进入用户词库
  const approved = await db.collection("user_entries")
    .where({
      openid: openid,
      text: text
    })
    .get();

  if (approved.data.length > 0) {
    return {
      success: false,
      message: "该词条已经存在，无需重复提交"
    };
  }

  // 写入待审核词库
  await db.collection("pending_entries")
    .add({
      data: {
        id: "",
        text: text,
        category: category,
        desc: desc,
        tags: tags || [],
        openid: openid,
        submitTime: new Date(),
        extend: {},
        meta: {}
      }
    });

  return {
    success: true,
    message: "提交成功"
  };
}

// =====================
// 获取待审核列表（原 getPendingEntries）
// =====================
async function list(openid) {
  // 检查审核权限 admin / maintainer
  const user = await db.collection("users")
    .where({ openid })
    .get();

  if (
    user.data.length === 0 ||
    (
      user.data[0].role !== "admin" &&
      user.data[0].role !== "maintainer"
    )
  ) {
    return {
      success: false,
      data: null,
      message: "无审核权限",
      code: "NO_PERMISSION"
    };
  }

  // 获取待审核列表
  const result = await db.collection("pending_entries")
    .orderBy("submitTime", "desc")
    .get();

  return {
    success: true,
    data: result.data,
    message: ""
  };
}

// =====================
// 审核通过/拒绝（原 approveEntry）
// 通过/拒绝用 event.reviewAction 区分
// =====================
async function review(openid, event) {
  // 权限检查 admin / maintainer
  const user = await db.collection("users")
    .where({ openid })
    .get();

  if (
    user.data.length === 0 ||
    (
      user.data[0].role !== "admin" &&
      user.data[0].role !== "maintainer"
    )
  ) {
    return {
      success: false,
      data: null,
      message: "无审核权限",
      code: "NO_PERMISSION"
    };
  }

  const {
    entryId,
    reviewAction
  } = event;

  if (!entryId) {
    return {
      success: false,
      data: null,
      message: "缺少词条ID",
      code: "MISSING_ID"
    };
  }

  const res = await db.collection("pending_entries")
    .doc(entryId)
    .get();

  const entry = res.data;

  if (!entry) {
    return {
      success: false,
      data: null,
      message: "词条不存在",
      code: "NOT_FOUND"
    };
  }

  console.log(
    "审核操作:",
    reviewAction,
    "词条:",
    entry.text,
    "管理员:",
    openid
  );

  // 审核通过
  if (reviewAction === "approve") {
    await db.collection("user_entries")
      .add({
        data: {
          id: "",
          text: entry.text,
          category: entry.category,
          desc: entry.desc,
          tags: entry.tags || [],
          openid: entry.openid,
          reviewerOpenid: openid,
          createTime: entry.submitTime || new Date(),
          extend: {},
          meta: {}
        }
      });

    await db.collection("pending_entries")
      .doc(entryId)
      .remove();

    return {
      success: true,
      data: null,
      message: "审核通过"
    };
  }

  // 拒绝
  if (reviewAction === "reject") {
    await db.collection("pending_entries")
      .doc(entryId)
      .remove();

    return {
      success: true,
      data: null,
      message: "已拒绝"
    };
  }

  // 未知操作
  return {
    success: false,
    data: null,
    message: "未知操作",
    code: "INVALID_ACTION"
  };
}

// =====================
// 修改投稿词条（原 updatePendingEntry）
// =====================
async function update(openid, event) {
  // 权限检查 admin / maintainer
  const user = await db.collection("users")
    .where({ openid })
    .get();

  if (
    user.data.length === 0 ||
    (
      user.data[0].role !== "admin" &&
      user.data[0].role !== "maintainer"
    )
  ) {
    return {
      success: false,
      data: null,
      message: "无修改权限",
      code: "NO_PERMISSION"
    };
  }

  const {
    entryId,
    text,
    desc,
    category,
    tags
  } = event;

  // 参数检查
  if (!entryId) {
    return {
      success: false,
      data: null,
      message: "缺少词条ID",
      code: "MISSING_ID"
    };
  }

  // 检查词条是否存在
  const entryRes = await db.collection("pending_entries")
    .doc(entryId)
    .get();

  if (!entryRes.data) {
    return {
      success: false,
      data: null,
      message: "投稿词条不存在",
      code: "NOT_FOUND"
    };
  }

  // 更新投稿词条
  await db.collection("pending_entries")
    .doc(entryId)
    .update({
      data: {
        text: text || "",
        desc: desc || "",
        category: category || "",
        tags: Array.isArray(tags) ? tags : [],
        updateTime: new Date()
      }
    });

  console.log(
    "管理员修改投稿:",
    entryId,
    "管理员:",
    openid
  );

  return {
    success: true,
    data: null,
    message: "修改成功"
  };
}

// =====================
// 统一入口：event.action 分发
// =====================
exports.main = async (event) => {
  const openid = cloud.getWXContext().OPENID;
  const action = event && event.action;

  try {
    if (!openid) {
      return {
        success: false,
        data: null,
        message: "未获取用户身份",
        code: "NO_OPENID"
      };
    }

    switch (action) {
      case "submit":
        return await submit(openid, event);
      case "list":
        return await list(openid);
      case "review":
        return await review(openid, event);
      case "update":
        return await update(openid, event);
      default:
        return {
          success: false,
          data: null,
          message: "未知操作: " + action,
          code: "INVALID_ACTION"
        };
    }
  } catch (err) {
    console.error("entryAdmin错误:", action, err);
    return {
      success: false,
      data: null,
      message: err.message || "操作失败",
      code: "SERVER_ERROR"
    };
  }
};
