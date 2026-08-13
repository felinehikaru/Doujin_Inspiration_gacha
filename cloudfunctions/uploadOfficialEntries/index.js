const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const entries = require('./entries');

// =====================
// 版本号递增
//
// 格式:
// x.xx.xxx
//
// 示例:
// 1.00.000
// → 1.00.001
// =====================
function increaseVersion(version) {
  if (!version) {
    return "1.00.001";
  }

  const parts = version.split(".");
  let big = parseInt(parts[0]) || 1;
  let middle = parseInt(parts[1]) || 0;
  let small = parseInt(parts[2]) || 0;

  small += 1;

  // 小版本超过 999
  if (small > 999) {
    small = 0;
    middle += 1;
  }

  // 中间版本超过 99
  if (middle > 99) {
    middle = 0;
    big += 1;
  }

  return (
    big +
    "." +
    middle.toString().padStart(2, "0") +
    "." +
    small.toString().padStart(3, "0")
  );
}

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID || "orxV53bbr6LJBoYk3NQ8zp397VQo";

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
    // 获取当前官方版本
    // =====================
    let oldVersion = "1.00.000";

    try {
      const versionRes = await db.collection("system_config")
        .doc("official_version")
        .get();

      if (versionRes.data && versionRes.data.version) {
        oldVersion = versionRes.data.version;
      }
    } catch (e) {
      console.log("没有旧版本，使用初始版本");
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
    // 上传新官方词库
    // =====================
    const uploadBatch = 20;

    for (let i = 0; i < entries.length; i += uploadBatch) {
      const batch = entries.slice(i, i + uploadBatch);

      await Promise.all(
        batch.map(item => {
          return db.collection("entries")
            .add({
              data: item
            });
        })
      );
    }

    // =====================
    // 更新官方版本
    // =====================
    const newVersion = increaseVersion(oldVersion);

    await db.collection("system_config")
      .doc("official_version")
      .set({
        data: {
          version: newVersion,
          count: entries.length,
          updateTime: Date.now()
        }
      });

    return {
      success: true,
      message: "官方词库重新同步完成",
      count: entries.length,
      oldVersion: oldVersion,
      newVersion: newVersion
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
};