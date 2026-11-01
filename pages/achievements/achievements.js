const { getAchievementList } = require("../../utils/achievements.js");

const { generateSparkles, THEME_COLORS, randInt } = require("../../beautify/sparkleGen.js");

Page({
  data: {
    sparkles: [],
    normalAchievements: [],
    hiddenAchievements: [],
    normalCollapsed: true,
    hiddenCollapsed: true
  },

  toggleNormal() {
    this.setData({ normalCollapsed: !this.data.normalCollapsed });
  },

  toggleHidden() {
    this.setData({ hiddenCollapsed: !this.data.hiddenCollapsed });
  },

  onShow() {
    this.loadAchievements();
  this.setData({
    sparkles: [
      // 标题/副标题区域：至少 3 颗
      ...generateSparkles({ colors: THEME_COLORS.achievements, count: 3, xRange: [[70, 165], [680, 715]], yRange: [15, 100] }),
      // 页面其他区域：3~5 颗
      ...generateSparkles({ colors: THEME_COLORS.achievements, count: randInt(3, 5), xRange: [[60, 120], [635, 685]], yRange: [360, 760] })
    ]
  });
  
  },

  async loadAchievements() {
    try {
      const roleRes = await wx.cloud.callFunction({ name: "user", data: { action: "checkRole" } });
      if (!roleRes.result || !roleRes.result.success || roleRes.result.data.role === "visitor") {
        wx.showModal({
          content: "用户功能，请登录",
          showCancel: false,
          success: () => wx.navigateBack()
        });
        return;
      }

      // =====================
      // 本地优先：先读本地即时进度，云端数据作为补充合并
      // =====================
      let progressData = null;
      let cloudOk = false;

      const localProgress = wx.getStorageSync("localAchievementProgress");

      try {
        const res = await wx.cloud.callFunction({ name: "achievements", data: { action: "get" } });
        if (res.result && res.result.success) {
          cloudOk = true;
          progressData = res.result.data;
        }
      } catch (err) {
        console.log("云端成就读取失败，仅用本地", err);
      }

      // 本地为基底：本地记录优先体现
      let base = null;
      if (localProgress && typeof localProgress === "object") {
        base = {
          inProgress: localProgress.inProgress || {},
          unlockedAchievements:
            Array.isArray(localProgress.unlockedAchievements)
              ? localProgress.unlockedAchievements
              : []
        };
      }

      // 云端补充：云端有而本地没有的解锁成就/进度合并进来
      if (cloudOk && progressData) {
        if (!base) {
          base = {
            inProgress: progressData.inProgress || {},
            unlockedAchievements: progressData.unlockedAchievements || []
          };
        } else {
          const localIds = (base.unlockedAchievements || [])
            .map(item => typeof item === "string" ? item : item.id);
          (progressData.unlockedAchievements || []).forEach(item => {
            const id = typeof item === "string" ? item : item.id;
            if (!localIds.includes(id)) {
              base.unlockedAchievements.push({ id, achievedAt: new Date() });
            }
          });
          // 进度数值取较大值（本地即时 + 云端累计）
          const lp = base.inProgress;
          const cp = progressData.inProgress || {};
          Object.keys(cp).forEach(k => {
            if (typeof cp[k] === "number") {
              lp[k] = Math.max(Number(lp[k]) || 0, cp[k]);
            }
          });
        }
      }

      // 完全无数据时的空壳
      if (!base) {
        base = { inProgress: {}, unlockedAchievements: [] };
      }

      const achievements = getAchievementList(base);
      this.setData({
        normalAchievements: achievements.filter(item => item.type === "normal"),
        hiddenAchievements: achievements.filter(item => item.type === "hidden" && item.unlocked)
      });

      // 本地即时成就同步到云端（登录后打开成就页即持久化）
      if (
        base &&
        (base.unlockedAchievements.length > 0 ||
          Object.keys(base.inProgress).length > 0)
      ) {
        wx.cloud.callFunction({
          name: "achievements",
          data: {
            action: "syncLocal",
            unlockedAchievements: base.unlockedAchievements,
            inProgress: base.inProgress
          }
        }).then(res => {
          console.log("[成就] 同步云端完成", JSON.stringify(res.result && res.result.data));
        }).catch(err => {
          console.log("[成就] 同步云端失败(不影响显示)", err);
        });
      }
    } catch (err) {
      console.log("成就读取失败", err);
      wx.showToast({ title: "成就读取失败", icon: "none" });
    }
  }
});