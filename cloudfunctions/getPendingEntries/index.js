const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
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
    // 检查审核权限
    // admin / maintainer
    // =====================
    const user = await db.collection("users")
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

    // =====================
    // 获取待审核列表
    // =====================
    const result = await db.collection('pending_entries')
      .orderBy('submitTime', 'desc')
      .get();

    return {
      success: true,
      data: result.data,
      message: ""
    };

  } catch (err) {
    console.error("getPendingEntries错误:", err);

    return {
      success: false,
      data: null,
      message: err.message || "获取审核列表失败",
      code: "SERVER_ERROR"
    };
  }
};