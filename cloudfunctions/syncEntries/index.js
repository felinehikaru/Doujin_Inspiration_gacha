const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
  try {
    let version = 1;

    // =====================
    // 获取词库版本
    // =====================
    try {
      const versionRes = await db.collection("system_config")
        .doc("entries_version")
        .get();

      if (versionRes.data) {
        version = versionRes.data.version || 1;
      }
    } catch (e) {
      console.log("版本不存在，默认1");
    }

    // =====================
    // 官方词库
    // entries
    // =====================
    const officialRes = await db.collection("entries")
      .orderBy("id", "asc")
      .limit(1000)
      .get();

    // =====================
    // 用户词库
    // user_entries
    // =====================
    const userRes = await db.collection("user_entries")
      .orderBy("createTime", "desc")
      .limit(1000)
      .get();

    // =====================
    // 返回分离数据
    // =====================
    return {
      success: true,
      version: version,
      updateTime: Date.now(),
      officialEntries: officialRes.data || [],
      userEntries: userRes.data.map(item => {
        return {
          id: item.id,
          text: item.text,
          category: item.category,
          desc: item.desc,
          tags: item.tags || [],
          createTime: item.createTime
        };
      }) || []
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
};