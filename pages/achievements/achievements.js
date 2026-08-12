const { getAchievementList } = require("../../utils/achievements.js");

Page({
  data: {
    normalAchievements: [],
    hiddenAchievements: []
  },

  onShow() {
    this.loadAchievements();
  },

  async loadAchievements() {
    try {
      const roleRes = await wx.cloud.callFunction({ name: "checkRole" });
      if (!roleRes.result || !roleRes.result.success || roleRes.result.role === "visitor") {
        wx.showModal({
          content: "用户功能，请登录",
          showCancel: false,
          success: () => wx.navigateBack()
        });
        return;
      }

      const res = await wx.cloud.callFunction({ name: "achievements", data: { action: "get" } });
      if (!res.result || !res.result.success) {
        wx.showToast({ title: "成就读取失败", icon: "none" });
        return;
      }

      const achievements = getAchievementList(res.result.data);
      this.setData({
        normalAchievements: achievements.filter(item => item.type === "normal"),
        hiddenAchievements: achievements.filter(item => item.type === "hidden" && item.unlocked)
      });
    } catch (err) {
      console.log("成就读取失败", err);
      wx.showToast({ title: "成就读取失败", icon: "none" });
    }
  }
});