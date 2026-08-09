const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
  try {
    const openid = cloud.getWXContext().OPENID;

    if (!openid) {
      return {
        success: false,
        message: "未获取用户身份"
      };
    }

    // 检查审核权限
    const user = await db.collection("users")
      .where({
        openid: openid
      })
      .get();

    if (
      user.data.length === 0 ||
      (user.data[0].role !== "admin" && user.data[0].role !== "maintainer")
    ) {
      return {
        success: false,
        message: "无审核权限"
      };
    }

    const result = await db.collection('pending_entries')
      .orderBy('submitTime', 'desc')
      .get();

    return {
      success: true,
      data: result.data
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
};