const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
  try {
    // 获取当前用户openid
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;

    if (!openid) {
      return {
        success: false,
        message: "未获取用户身份",
        data: []
      };
    }

    // 查询当前用户收藏
    const res = await db.collection("favorites")
      .where({
        openid: openid
      })
      .orderBy(
        "createTime",
        "desc"
      )
      .get();

    return {
      success: true,
      data: res.data
    };

  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err.message,
      data: []
    };
  }
};