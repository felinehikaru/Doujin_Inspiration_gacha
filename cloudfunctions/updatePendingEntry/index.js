const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    // =====================
    // 权限检查
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
        message: "无修改权限"
      };
    }

    const {
      entryId,
      text,
      desc,
      category,
      tags
    } = event;

    if (!entryId) {
      return {
        success: false,
        message: "缺少词条ID"
      };
    }

    // =====================
    // 检查词条是否存在
    // =====================
    const entryRes = await db.collection("pending_entries")
      .doc(entryId)
      .get();

    if (!entryRes.data) {
      return {
        success: false,
        message: "投稿词条不存在"
      };
    }

    // =====================
    // 更新投稿词条
    // =====================
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
      message: "修改成功"
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
};