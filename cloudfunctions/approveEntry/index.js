const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    //权限检查
    const user = await db.collection('users')
      .where({
        openid
      })
      .get();

    if (user.data.length === 0 || (user.data[0].role !== "admin" && user.data[0].role !== "maintainer")) {
      return {
        success: false,
        message: "无审核权限"
      };
    }

    const {
      entryId,
      action
    } = event;

    const res = await db.collection('pending_entries')
      .doc(entryId)
      .get();

    const entry = res.data;

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
            createTime: new Date(),
            source: "user",
            extend: {},
            meta: {}
          }
        });

      await db.collection('pending_entries')
        .doc(entryId)
        .remove();

      return {
        success: true,
        message: "审核通过"
      };
    }

    if (action === "reject") {
      await db.collection('pending_entries')
        .doc(entryId)
        .remove();

      return {
        success: true,
        message: "已拒绝"
      };
    }

    return {
      success: false,
      message: "未知操作"
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};