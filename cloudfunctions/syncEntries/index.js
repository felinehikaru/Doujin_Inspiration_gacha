const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
  try {
    let version = 1;

    try {
      const versionRes = await db.collection("system_config")
        .doc("entries_version")
        .get();

      if (versionRes.data) {
        version = versionRes.data.version || 1;
      }
    } catch (e) {
      console.log("版本配置不存在，默认版本1");
    }

    const officialRes = await db.collection("entries")
      .orderBy("id", "asc")
      .limit(1000)
      .get();

    const userRes = await db.collection("user_entries")
      .orderBy("createTime", "desc")
      .limit(1000)
      .get();

    return {
      success: true,
      version,
      updateTime: Date.now(),
      data: [
        ...officialRes.data,
        ...userRes.data
      ]
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};