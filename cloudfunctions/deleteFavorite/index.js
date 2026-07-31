const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event) => {
  try {
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;

    if (!openid) {
      return {
        success: false,
        message: "未获取用户身份"
      };
    }

    const { id } = event;

    if (!id) {
      return {
        success: false,
        message: "缺少收藏ID"
      };
    }

    // 查询收藏是否属于当前用户
    const item = await db.collection("favorites")
      .doc(id)
      .get();

    if (!item.data) {
      return {
        success: false,
        message: "收藏不存在"
      };
    }

    if (item.data.openid !== openid) {
      return {
        success: false,
        message: "无权限删除"
      };
    }

    // 删除
    await db.collection("favorites")
      .doc(id)
      .remove();

    return {
      success: true,
      message: "删除成功"
    };

  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err.message
    };
  }
};