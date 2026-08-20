/**
 * 收藏相关业务
 *
 * 包含：
 * collectCurrent
 * loadFavorites
 * openFavorites
 */

// =====================
// 收藏当前结果
// =====================
async function collectCurrent(page) {
  if (!page.data.results.length) {
    return;
  }

  // 三个词条文本
  const text = page.data.results
    .map(item => item.text)
    .join(" + ");

  // 三个完整词条
  const entries = page.data.results;

  // =====================
  // 游客本地收藏
  // =====================
  if (page.data.role === "visitor") {
    let favorites = wx.getStorageSync("favorites") || [];

    // 防止重复收藏
    const exist = favorites.some(item => item.text === text);

    if (exist) {
      wx.showToast({
        title: "已经收藏过了",
        icon: "none"
      });
      return;
    }

    favorites.unshift({
      text: text,
      entries: entries,
      createTime: Date.now()
    });

    if (favorites.length > 30) {
      favorites = favorites.slice(0, 30);
    }

    wx.setStorageSync("favorites", favorites);

    wx.showToast({
      title: "已保存到本地",
      icon: "success"
    });

    return;
  }

  // =====================
  // 登录用户云收藏
  // =====================
  try {
    const res = await wx.cloud.callFunction({
      name: "favorite",
      data: {
        action: "add",
        text: text,
        entries: entries
      }
    });

    if (res.result && res.result.success) {
      wx.showToast({
        title: "收藏成功",
        icon: "success"
      });
    } else {
      wx.showToast({
        title: res.result.message || "收藏失败",
        icon: "none"
      });
    }
  } catch (err) {
    console.log("收藏失败", err);
  }
}

// =====================
// 打开收藏页面
// =====================
function openFavorites() {
  wx.navigateTo({
    url: "/pages/favorites/favorites"
  });
}

// =====================
// 加载本地收藏
// =====================
function loadFavorites(page) {
  const favorites = wx.getStorageSync("favorites") || [];

  page.setData({
    favorites
  });
}

module.exports = {
  collectCurrent,
  openFavorites,
  loadFavorites
};