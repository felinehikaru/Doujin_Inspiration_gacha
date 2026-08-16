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
        message: "无修改权限",
        code: "NO_PERMISSION"
      };
    }

    const {
      entryId,
      text,
      desc,
      category,
      tags
    } = event;

    // =====================
    // 参数检查
    // =====================
    if (!entryId) {
      return {
        success: false,
        data: null,
        message: "缺少词条ID",
        code: "MISSING_ID"
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
        data: null,
        message: "投稿词条不存在",
        code: "NOT_FOUND"
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
      data: null,
      message: "修改成功"
    };

  } catch (err) {
    console.error("updatePendingEntry错误:", err);

    return {
      success: false,
      data: null,
      message: err.message || "修改失败",
      code: "SERVER_ERROR"
    };
  }
};