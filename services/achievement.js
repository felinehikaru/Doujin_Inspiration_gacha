/**
 * 成就相关业务
 *
 * 包含：
 * checkAchievements
 * closeAchievementModal
 * openAchievements
 */

const {
  getAchievementList
} = require("../utils/achievements.js");

// =====================
// 检查成就
// =====================
async function checkAchievements(page, result) {
  // 游客不记录
  if (page.data.role === "visitor") {
    return;
  }

  try {
    const res = await wx.cloud.callFunction({
      name: "achievements",
      data: {
        action: "recordDraw",
        entryCount: result.length
      }
    });

    const data = res.result && res.result.data;
    const unlockedIds = data && data.newlyUnlocked || [];

    if (unlockedIds.length) {
      const achievement = getAchievementList(data)
        .find(item => item.id === unlockedIds[0]);

      page.setData({
        showAchievementModal: true,
        unlockedAchievement: achievement
      });
    }
  } catch (err) {
    console.log("成就进度同步失败", err);
  }
}

// =====================
// 关闭成就弹窗
// =====================
function closeAchievementModal(page) {
  page.setData({
    showAchievementModal: false,
    unlockedAchievement: null
  });
}

// =====================
// 打开成就页面
// =====================
function openAchievements(page) {
  if (page.data.role === "visitor") {
    wx.showModal({
      content: "用户功能，请登录",
      confirmText: "去登录",
      success(res) {
        if (res.confirm) {
          page.goLogin();
        }
      }
    });
    return;
  }

  wx.navigateTo({
    url: "/pages/achievements/achievements"
  });
}

module.exports = {
  checkAchievements,
  closeAchievementModal,
  openAchievements
};