const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    // =====================
    // 未获取openid
    // =====================
    if (!openid) {
      return {
        success: false,
        data: null,
        message: "没有获取到openid",
        code: "NO_OPENID"
      };
    }

    const res = await db.collection('users')
      .where({
        openid: openid
      })
      .get();

    // =====================
    // 未注册用户
    // =====================
    if (res.data.length === 0) {
      return {
        success: true,
        data: {
          role: "visitor",
          isRegister: false,
          user: null
        },
        message: ""
      };
    }

    // =====================
    // 已注册用户
    // =====================
    const user = res.data[0];

    return {
      success: true,
      data: {
        role: user.role || "visitor",
        isRegister: true,
        user: user
      },
      message: ""
    };

  } catch (err) {
    console.error("checkRole错误:", err);

    return {
      success: false,
      data: null,
      message: err.message || "身份检查失败",
      code: "SERVER_ERROR"
    };
  }
};