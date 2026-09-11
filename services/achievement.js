/**
 * 成就相关业务
 *
 * 成就逻辑（用户确认版）：
 *  - 首次抽卡（任何身份）：本地解锁 first_draw，弹恭喜窗 + 点亮入口
 *    （本地记录，清缓存即消失，游客不触发其他任何成就）
 *  - 非首次：游客跳过；登录用户走云端 recordDraw
 *  - 游客点成就入口：提示登录；登录后把本地首个成就上传云端
 */

const {
  getAchievementList
} = require("../utils/achievements.js");

// =====================
// 检查成就
// =====================
async function checkAchievements(page, result) {
  const role = page.data.role;
  const firstDone = !!wx.getStorageSync("firstDrawAchieved");

  // ---- 首次抽卡：本地解锁第一个成就 ----
  if (!firstDone) {
    wx.setStorageSync("firstDrawAchieved", true);
    wx.setStorageSync("achievementEntryUnlocked", true);

    const achievement = getAchievementList({
      unlockedAchievements: [{ id: "first_draw" }]
    }).find(item => item.id === "first_draw");

    page.setData({
      showAchievementModal: true,
      unlockedAchievement: achievement
      // 底部成就入口不在此处显示：恭喜窗点掉后由飞行动画落座
    });

    // 本次抽卡同步记录到云端（游客也上传，按 openid 记录；登录后同 openid 自动关联恢复）
    try {
      await wx.cloud.callFunction({
        name: "achievements",
        data: {
          action: "recordDraw",
          entryCount: result.length,
          entries: result.map(item => ({
            text: item.text,
            category: item.category,
            tags: item.tags
          }))
        }
      });
    } catch (err) {
      console.log("首次成就云端同步失败", err);
    }

    return;
  }

  // ---- 非首次抽卡 ----
  if (role === "visitor") {
    return; // 游客不触发其他任何成就
  }

  try {
    const res = await wx.cloud.callFunction({
      name: "achievements",
      data: {
        action: "recordDraw",
        entryCount: result.length,
        entries: result.map(item => ({
          text: item.text,
          category: item.category,
          tags: item.tags
        }))
      }
    });

    const data = res.result && res.result.data;
    const unlockedIds = data && data.newlyUnlocked || [];

    if (unlockedIds.length) {
      const achievement = getAchievementList(data)
        .find(item => item.id === unlockedIds[0]);

      wx.setStorageSync("achievementEntryUnlocked", true);
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

  // 游客首次成就恭喜窗关闭后：提示登录解锁更多成就（仅一次）
  if (
    page.data.role === "visitor" &&
    wx.getStorageSync("firstDrawAchieved") &&
    !wx.getStorageSync("firstDrawLoginTipShown")
  ) {
    wx.setStorageSync("firstDrawLoginTipShown", true);
    // 延迟到成就飞行动画播完后再提示，避免系统弹窗盖住动画
    setTimeout(() => {
      _showLoginTip();
    }, 3600);
    return;
  }

  function _showLoginTip() {
    wx.showModal({
      title: "提示",
      content: "登录解锁更多成就",
      confirmText: "去登录",
      cancelText: "暂不",
      success(res) {
        if (res.confirm) {
          page.goLogin();
        }
      }
    });
  }
}

// =====================
// 打开成就页面
// =====================
function openAchievements(page) {
  if (page.data.role === "visitor") {
    wx.showModal({
      title: "提示",
      content: "登录功能，解锁更多成就",
      confirmText: "去登录",
      cancelText: "取消",
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
