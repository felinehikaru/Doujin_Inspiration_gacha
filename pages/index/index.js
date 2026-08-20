const app = getApp();

const localEntries = require("../../utils/entries.js");
const userService = require("../../services/user.js");
const entrySync = require("../../services/entrySync.js");
const gachaService = require("../../services/gacha.js");
const historyService = require("../../services/history.js");
const favoriteService = require("../../services/favorite.js");
const achievementService = require("../../services/achievement.js");
const shareService = require("../../services/share.js");

Page({
  data: {
    role: "visitor",
    isRegister: false,

    results: [],

    history: [],

    totalCount: localEntries.length,

    balls: [],

    isShaking: false,

    // 帮助
    showHelpModal: false,

    favorites: [],

    // 分享
    showSharePanel: false,

    // 成就
    showAchievementModal: false,
    unlockedAchievement: null,

    // 自由模式
    showFreeMode: false,

    freeCategories: [
      {
        value: "world",
        title: "世界背景",
        checked: false
      },
      {
        value: "relationship",
        title: "关系设定",
        checked: false
      },
      {
        value: "character",
        title: "角色身份",
        checked: false
      },
      {
        value: "conflict",
        title: "冲突矛盾",
        checked: false
      },
      {
        value: "scene",
        title: "特殊场景",
        checked: false
      },
      {
        value: "theme",
        title: "主题氛围",
        checked: false
      }
    ]
  },

  // =====================
  // 初始化
  // =====================
  async onLoad(){
    this.initBalls();
    await entrySync.update(this);
    this.checkRole();
    historyService.loadHistory(this);
    this.loadFavorites();
    },

  // =====================
  // 用户
  // =====================
  async checkRole() {
    await userService.checkRole(this);
  },

  goLogin() {
    userService.goLogin();
  },

  // =====================
  // 帮助
  // =====================
  openHelp() {
    this.setData({
      showHelpModal: true
    });
  },

  closeHelp() {
    this.setData({
      showHelpModal: false
    });
  },

  // =====================
  // 词条中心
  // =====================
  openEntries() {
    wx.navigateTo({
      url: "/pages/entries/entries"
    });
  },

  // =====================
  // 扭蛋动画
  // =====================
  initBalls() {
    const balls = [];

    for (let i = 0; i < 12; i++) {
      balls.push({
        id: i,
        left: Math.random() * 80,
        top: Math.random() * 60,
        size: 50 + Math.random() * 30
      });
    }

    this.setData({
      balls
    });
  },

  // =====================
  // 抽卡
  // =====================
  draw() {
    gachaService.draw(this);
  },

  // 兼容 WXML
  spinRandom() {
    gachaService.spinRandom(this);
  },

  spinBalanced() {
    gachaService.spinBalanced(this);
  },

  // =====================
  // 自由模式
  // =====================
  openFreeMode() {
    this.setData({
      showFreeMode: true
    });
  },

  closeFreeMode() {
    this.setData({
      showFreeMode: false
    });
  },

  changeFreeCategory(e) {
    gachaService.changeFreeCategory(this, e);
  },

  spinFree() {
    gachaService.spinFree(this);
  },

  // =====================
  // 显示结果
  // =====================
  showResult(result) {
    this.setData({
      isShaking: true
    });

    setTimeout(() => {
      this.setData({
        isShaking: false,
        results: result
      });

      app.globalData.currentResults = result;

      historyService.saveHistory(this, result);

      this.checkAchievements(result);
    }, 800);
  },

  // =====================
  // 成就
  // =====================
  checkAchievements(result) {
    achievementService.checkAchievements(this, result);
  },

  closeAchievementModal() {
    achievementService.closeAchievementModal(this);
  },

  noop() {},

  openAchievements() {
    achievementService.openAchievements(this);
  },

  // =====================
  // 历史
  // =====================
  openHistory() {
    wx.navigateTo({
      url: "/pages/history/history"
    });
  },

  clearCurrentResult() {
    this.setData({
      results: []
    });
    app.globalData.currentResults = [];
  },

  // =====================
  // 收藏
  // =====================
  collectCurrent() {
    favoriteService.collectCurrent(this);
  },

  openFavorites() {
    favoriteService.openFavorites();
  },

  loadFavorites() {
    favoriteService.loadFavorites(this);
  },

  showFavorites() {
    this.openFavorites();
  },

  // =====================
  // 提示词
  // =====================
  goToPrompt() {
    wx.navigateTo({
      url: "/pages/prompt/prompt"
    });
  },

  // =====================
  // 分享
  // =====================
  copyCurrentResult() {
    shareService.copyCurrentResult(this);
  },

  onShareAppMessage() {
    return shareService.onShareAppMessage(this);
  },

  openSharePanel() {
    shareService.openSharePanel(this);
  },

  closeSharePanel() {
    shareService.closeSharePanel(this);
  },

  copyShareText() {
    shareService.copyShareText(this);
  },

  createShareImage() {
    shareService.createShareImage(this);
  }
});