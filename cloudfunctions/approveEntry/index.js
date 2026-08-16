const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    // =====================
    // 检查openid
    // =====================
    if (!openid) {
      return {
        success: false,
        data: null,
        message: "未获取用户身份",
        code: "NO_OPENID"
      };
    }

    // =====================
    // 权限检查
    // admin / maintainer
    // =====================
    const user = await db.collection('users')
      .where({
        openid: openid
      })
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
      action
    } = event;

    if (!entryId) {
      return {
        success: false,
        data: null,
        message: "缺少词条ID",
        code: "MISSING_ID"
      };
    }

    const res = await db.collection('pending_entries')
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
      action,
      "词条:",
      entry.text,
      "管理员:",
      openid
    );

    // =====================
    // 审核通过
    // =====================
    if (action === "approve") {
      await db.collection('user_entries')
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

      await db.collection('pending_entries')
        .doc(entryId)
        .remove();

      return {
        success: true,
        data: null,
        message: "审核通过"
      };
    }

    // =====================
    // 拒绝
    // =====================
    if (action === "reject") {
      await db.collection('pending_entries')
        .doc(entryId)
        .remove();

      return {
        success: true,
        data: null,
        message: "已拒绝"
      };
    }

    // =====================
    // 未知操作
    // =====================
    return {
      success: false,
      data: null,
      message: "未知操作",
      code: "INVALID_ACTION"
    };

  } catch (err) {
    console.error("approveEntry错误:", err);

    return {
      success: false,
      data: null,
      message: err.message || "审核失败",
      code: "SERVER_ERROR"
    };
  }
};