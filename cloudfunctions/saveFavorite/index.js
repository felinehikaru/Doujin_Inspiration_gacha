const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event) => {
  try {
    // 获取用户openid
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;

    if (!openid) {
      return {
        success: false,
        message: "未获取用户身份"
      };
    }

    const { text, entries } = event;

    if (!text || !entries || !entries.length) {
      return {
        success: false,
        message: "收藏内容为空"
      };
    }

    // 检查是否重复收藏
    const exist = await db.collection("favorites")
      .where({
        openid: openid,
        text: text
      })
      .get();

    if (exist.data.length) {
      return {
        success: false,
        message: "已经收藏过了"
      };
    }

    console.log("准备写入收藏",{
      openid,
      text,
      entries
     });

    // 写入收藏
    await db.collection("favorites")
      .add({
        data: {
          openid: openid,
          text: text,
          entries: entries,
          createTime: Date.now()
        }
      });

    return {
      success: true,
      message: "收藏成功"
    };

  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err.message
    };
  }
};