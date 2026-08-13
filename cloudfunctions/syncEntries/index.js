const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
  try {
    // =====================
    // 默认版本
    // =====================
    let officialVersion = "1.00.000";
    let userVersion = "1.00.000";

    // =====================
    // 获取官方词库版本
    // system_config / official_version
    // =====================
    try {
      const officialVersionRes = await db.collection("system_config")
        .doc("official_version")
        .get();

      if (officialVersionRes.data && officialVersionRes.data.version) {
        officialVersion = officialVersionRes.data.version;
      }
    } catch (e) {
      console.log("官方词库版本不存在，使用默认版本");
    }

    // =====================
    // 获取用户词库版本
    // system_config / user_version
    // =====================
    try {
      const userVersionRes = await db.collection("system_config")
        .doc("user_version")
        .get();

      if (userVersionRes.data && userVersionRes.data.version) {
        userVersion = userVersionRes.data.version;
      }
    } catch (e) {
      console.log("用户词库版本不存在，使用默认版本");
    }

    // =====================
    // 官方词库 entries
    // =====================
    const officialRes = await db.collection("entries")
      .orderBy("id", "asc")
      .limit(1000)
      .get();

    // =====================
    // 用户词库 user_entries
    // =====================
    const userRes = await db.collection("user_entries")
      .orderBy("createTime", "desc")
      .limit(1000)
      .get();

    // =====================
    // 返回数据
    // =====================
    return {
      success: true,
      officialVersion: officialVersion,
      userVersion: userVersion,
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