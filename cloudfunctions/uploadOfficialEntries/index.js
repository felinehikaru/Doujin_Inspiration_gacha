const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

const entries = require('./entries');

exports.main = async (event, context) => {
  try {
  // const openid = cloud.getWXContext().OPENID;

  const context = cloud.getWXContext();
  const openid = context.OPENID || "orxV53bbr6LJBoYk3NQ8zp397VQo";

    if (!openid) {
      return {
        success: false,
        message: "没有openid"
      };
    }

    // =====================
    // 检查维护员权限
    // =====================
    const user = await db.collection('users')
      .where({
        openid: openid
      })
      .get();

    if (user.data.length === 0 || user.data[0].role !== "maintainer") {
      return {
        success: false,
        message: "无维护员权限"
      };
    }

// =====================
// 清空官方词库
// =====================

while (true) {
  const oldEntries = await db.collection("entries")
    .limit(100)
    .get();

  if (!oldEntries.data.length) {
    break;
  }

  const removeTasks = oldEntries.data.map(item => {
    return db.collection("entries")
      .doc(item._id)
      .remove();
  });

  await Promise.all(removeTasks);

  console.log("删除旧词条:", oldEntries.data.length);
}

    // =====================
    // 分批上传新官方词库
    // =====================
    const uploadBatch = 20;

    for (let i = 0; i < entries.length; i += uploadBatch) {
      const batch = entries.slice(i, i + uploadBatch);

      await Promise.all(
        batch.map(item => {
          return db.collection('entries')
            .add({
              data: item
            });
        })
      );
    }

    return {
      success: true,
      message: "官方词库重新同步完成",
      count: entries.length
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
};