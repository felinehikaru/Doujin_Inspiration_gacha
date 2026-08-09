const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// =====================
// 中文文本相似度
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

exports.main = async (event, context) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    if (!openid) {
      return {
        success: false,
        message: "未获取用户身份"
      };
    }

    // 查询用户角色
    const userRes = await db.collection('users')
      .where({
        openid: openid
      })
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
// entries
// user_entries
// pending_entries
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

    // 检查当前用户是否已经提交过相同词条
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

    // 写入用户词库
    await db.collection('pending_entries')
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
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err.message
    };
  }
};