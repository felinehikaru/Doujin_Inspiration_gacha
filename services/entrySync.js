const app = getApp();

// =====================
// 云端同步词库
// =====================
async function update(page) {
  if (!app.globalData.online) {
    console.log("当前离线，使用本地词库");
    return;
  }

  try {
    const res = await wx.cloud.callFunction({
      name: "syncEntries"
    });

    if (!res.result || !res.result.success) {
      console.log("词库同步失败", res.result);
      return;
    }

    const data = res.result.data || res.result;

    const {
      officialEntries,
      userEntries,
      officialVersion,
      userVersion
    } = data;

    // 当前本地版本
    const localOfficialVersion = app.globalData.officialVersion;
    const localUserVersion = app.globalData.userVersion;

    let updateData = {};

    // =====================
    // 官方词库版本比较
    // =====================
    if (officialVersion && officialVersion !== localOfficialVersion) {
      console.log(
        "官方词库更新",
        localOfficialVersion,
        "→",
        officialVersion
      );
      updateData.officialEntries = officialEntries;
      updateData.officialVersion = officialVersion;
    } else {
      console.log("官方词库无需更新");
    }

    // =====================
    // 用户词库版本比较
    // =====================
    if (userVersion && userVersion !== localUserVersion) {
      console.log(
        "用户词库更新",
        localUserVersion,
        "→",
        userVersion
      );
      updateData.userEntries = userEntries;
      updateData.userVersion = userVersion;
    } else {
      console.log("用户词库无需更新");
    }

    // 有更新才写缓存
    if (Object.keys(updateData).length) {
      app.updateLocalEntries(updateData);
    }

    // 页面数量
    page.setData({
      totalCount: app.globalData.localOfficialEntries.length +
        app.globalData.localUserEntries.length
    });

    console.log("词库检查完成");
  } catch (err) {
    console.error("同步词库失败:", err);
  }
}

module.exports = {
  update
};