const app = getApp();

const localEntries = require("../../utils/entries.js");
const userService = require("../../services/user.js");
const entrySync = require("../../services/entrySync.js");
const gachaService = require("../../services/gacha.js");
const historyService = require("../../services/history.js");
const favoriteService = require("../../services/favorite.js");
const achievementService = require("../../services/achievement.js");
const shareService = require("../../services/share.js");
const categoryConfig = require("../../utils/category.js");
const GachaFx = require("../../beautify/gachaFx.js");
const { generateClouds } = require("../../beautify/cloudGen.js");
const { generateHomeSparkles } = require("../../beautify/sparkleGen.js");
const { generateBalls } = require("../../beautify/ballGenerator.js");
const { startGachaAnimation } = require("../../beautify/gachaAnimation.js");

Page({
  data: {
    role: "visitor",
    isRegister: false,
    userNick: "",
    userAvatar: "",
    showAchievementEntry: false,

    // =========抽卡结果============
    results: [],
    history: [],
    totalCount: localEntries.length,

    // 摇动状态
    isShaking: false,
    // 动画状态
    gachaState: "idle",

    // 出口掉落球
    dropBall: false,

    // 当前按钮
    activeMode: "random",
    
    // 帮助
    showHelpModal: false,
    
    // 收藏
    favorites: [],
    
    // 分享
    showSharePanel: false,

    // 成就
    showAchievementModal: false,
    unlockedAchievement: null,
    // 成就入口解锁飞行动画
    showAchievementFly: false,   // 是否播放成就图标飞入动画
    achFlyLock: false,           // 动画期间底部成就入口隐藏（落座后解除）
    achFlyX: 265,                // 飞行动画终点位移 x（rpx，JS 实测后覆盖）
    achFlyY: 900,                // 飞行动画终点位移 y（rpx，JS 实测后覆盖）
    
    // 自由模式
    showFreeMode: false,
    freeClosing: false,

    // =====扭蛋群数据 =====
    balls: [], // 存储每个扭蛋的位置、颜色、大小
    ballSize:80, // 单个扭蛋直径（rpx），可调

    // =====背景云朵（随机生成）=====
    clouds: [],

    // =====四角星装饰（随机生成）=====
    sparkles: [],

    // =====欢迎弹窗=====
    showWelcomeModal: false,
    welcomeDontShow: false,

    // =====新手指引（仅首次）=====
    showHomeGuide: false,

    // =====帮助弹窗关闭动画=====
    helpClosing: false,

    freeCategories: categoryConfig.list.map(item => {
      return {
        value: item.value,
        title: item.name,
        checked: false
      };
    })
  },

  // =====================
  // 页面加载
  // =====================
  async onShow() {
    await this.checkRole();
    this.checkCrashAchievement(); // 必须在 checkRole 之后，游客不触发崩溃成就
    this.refreshAchievementEntry();
  },

  async onLoad() {
    // 欢迎弹窗：检查是否已勾选不再显示
    if (!wx.getStorageSync("welcomeDontShow")) {
      this.setData({ showWelcomeModal: true });
    }

    await entrySync.update(this);
    // 身份检查统一在 onShow（await this.checkRole()）完成，此处不重复调用
    historyService.loadHistory(this);
    this.loadFavorites();
    this.initBalls();  // 初始化扭蛋群 
    this._gachaFx = new GachaFx(this);  // 初始化光效系统
    this.setData({
      clouds: generateClouds(),      // 随机生成背景云朵
      sparkles: generateHomeSparkles()  // 主页星星（beautify/sparkleGen.js）
    });
    this.initAchievementEntry();  // 恢复成就入口显示状态

    // 如果欢迎弹窗不显示但已看过帮助，且指引没看过，直接显示指引
    if (wx.getStorageSync('welcomeDontShow') && !wx.getStorageSync('homeGuideV2')) {
      this.setData({ showHomeGuide: true });
    }
  },

  // =====================
  // 崩溃重载成就（"门不能从这一侧打开"）：
  // app.js detectCrash 检测到上次非正常退出后置 crashPending，
  // 这里本地记录达成（隐藏成就达成后可见）并弹恭喜窗。
  // 游客也本地记录；登录后打开成就页会 syncLocal 同步云端。
  // =====================
  checkCrashAchievement() {
    // 游客不参与除 first_draw 外的任何成就：崩溃成就在游客状态下直接吞掉
    if (this.data.role === "visitor") {
      wx.removeStorageSync("crashPending");
      return;
    }
    if (!wx.getStorageSync("crashPending")) return;
    wx.removeStorageSync("crashPending");

    // 成就一次性：已解锁过"门不能从这一侧打开"，后续崩溃不再重复弹恭喜
    if (wx.getStorageSync("crashAchievementUnlocked")) {
      return;
    }

    // 本地成就进度：合并 crash_recovery 解锁 + crashCount 计数
    let progress = wx.getStorageSync("localAchievementProgress");
    if (!progress || typeof progress !== "object") {
      progress = { inProgress: {}, unlockedAchievements: [] };
    }
    if (!progress.inProgress || typeof progress.inProgress !== "object") {
      progress.inProgress = {};
    }
    if (!Array.isArray(progress.unlockedAchievements)) {
      progress.unlockedAchievements = [];
    }

    progress.inProgress.crashCount = Number(wx.getStorageSync("crashCount")) || 1;
    const hasUnlocked = progress.unlockedAchievements.some(
      item => (typeof item === "string" ? item : item.id) === "crash_recovery"
    );
    if (hasUnlocked) {
      wx.setStorageSync("crashAchievementUnlocked", true);
      return;
    }
    progress.unlockedAchievements.push({
      id: "crash_recovery",
      achievedAt: new Date()
    });
    wx.setStorageSync("localAchievementProgress", progress);
    wx.setStorageSync("crashAchievementUnlocked", true);

    // 弹恭喜窗
    const { getAchievementList } = require("../../utils/achievements.js");
    const achievement = getAchievementList(progress)
      .find(item => item.id === "crash_recovery");
    if (achievement) {
      this.setData({
        showAchievementModal: true,
        unlockedAchievement: achievement
      });
    }
  },

  // =====================
  // 页面渲染完成：提前绑定光效 canvas（Canvas 2D 的 node 必须页面 ready 后才能拿到；
  // 真机上延迟到抽卡时才初始化可能失败，导致金球/光效不显示）
  // =====================
  onReady() {
    if (this._gachaFx) {
      this._gachaFx.init("#gachaFx");
    }
  },

  // =====================
  // 成就入口：新用户隐藏，首次抽卡解锁后显示
  // 只读本地标记：清缓存后回到隐藏状态，等本次抽卡再解锁
  // =====================
  initAchievementEntry() {
    // 按本地解锁标记恢复显示；onShow 的 refreshAchievementEntry 会再按身份校准
    if (wx.getStorageSync("achievementEntryUnlocked")) {
      this.setData({ showAchievementEntry: true });
    }
  },

  // 登录后从云端读取成就状态，判断成就入口是否显示
  async refreshAchievementEntry() {
    if (this.data.role === "visitor") {
      // 游客：抽卡解锁过成就入口就显示（点击提示登录）；新用户/登出后未解锁则隐藏
      // 不在此清除解锁标记（登出时已清；这里清会导致游客重复触发首次抽卡成就）
      this.setData({
        showAchievementEntry: !!wx.getStorageSync("achievementEntryUnlocked")
      });
      return;
    }
    try {
      const res = await wx.cloud.callFunction({
        name: "achievements",
        data: { action: "get" }
      });
      const data = res.result && res.result.data;
      const unlocked = (data && data.unlockedAchievements) || [];
      const hasFirstDraw = unlocked.some(a =>
        (typeof a === "string" ? a : a.id) === "first_draw"
      );
      // 云端有 first_draw 或本地已有解锁标记（云端同步可能失败/游客未传）都显示，
      // 避免云端空数据覆盖本地已解锁状态
      if (hasFirstDraw || wx.getStorageSync("achievementEntryUnlocked")) {
        wx.setStorageSync("firstDrawAchieved", true);
        wx.setStorageSync("achievementEntryUnlocked", true);
        // 入口落座动画只属于"首次抽卡解锁 first_draw"那一次；
        // 云端恢复场景 = 该账号早已解锁过，直接标记已播放，避免分享等其他成就弹窗误触发
        wx.setStorageSync("achievementFlyPlayed", true);
        this.setData({ showAchievementEntry: true });
      } else {
        this.setData({ showAchievementEntry: false });
      }
    } catch (err) {
      console.log("成就状态读取失败", err);
    }
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
    if (this.data.helpClosing) return;
    // 播放缩回动画，结束后再移除
    this.setData({ helpClosing: true });
    setTimeout(() => {
      this.setData({
        showHelpModal: false,
        helpClosing: false
      });
      // 帮助关闭后，如果是首次使用，显示首页操作指引
      if (!wx.getStorageSync('homeGuideV2')) {
        setTimeout(() => {
          this.setData({ showHomeGuide: true });
        }, 300);
      }
    }, 250);
  },

  // =====================
  // 欢迎弹窗
  // =====================
  toggleWelcomeDontShow() {
    this.setData({
      welcomeDontShow: !this.data.welcomeDontShow
    });
  },

  confirmWelcome() {
    if (this.data.welcomeDontShow) {
      wx.setStorageSync("welcomeDontShow", true);
    }
    this.setData({
      showWelcomeModal: false
    });

    // 第一次进入：欢迎弹窗确认后自动弹出帮助说明
    if (!wx.getStorageSync("helpShown")) {
      wx.setStorageSync("helpShown", true);
      setTimeout(() => {
        this.openHelp();
      }, 350);
    }
  },

  // =====================
  // 词条中心
  // =====================
  openEntries() {
    wx.navigateTo({
      url: "/pages/entries/entries"
    });
  },

  // ===== 生成扭蛋群（调用独立模块 ballGenerator）=====
  initBalls() {
    const balls = generateBalls(this.data.ballSize);
    this.setData({ balls });
  },

  // =====================
  // 扭蛋动画（调用独立模块 gachaAnimation）
  // =====================
  startGachaAnimation(result) {
    startGachaAnimation(this, result);
  },


  // =====================
  // 完全随机
  // =====================
  spinRandom() {
    this.setData({
      activeMode: "random"
    });

    gachaService.spinRandom(this);
  },

  // =====================
  // 平衡模式
  // =====================
  spinBalanced() {
    this.setData({
      activeMode: "balanced"
    });

    gachaService.spinBalanced(this);
  },

  // =====================
  // 自由模式
  // =====================
  openFreeMode() {
    if (this._gachaFx) this._gachaFx.stop();
    this.setData({
      activeMode: "free",
      showFreeMode: true
    });
  },

  closeFreeMode() {
    this.setData({
      freeClosing: true
    });
    setTimeout(() => {
      this.setData({
        showFreeMode: false,
        freeClosing: false
      });
    }, 250);
  },

  changeFreeCategory(e) {
    gachaService.changeFreeCategory(
      this,
      e
    );
  },

  spinFree() {
    gachaService.spinFree(this);
  },

  // 白色圆盘：随机选一个模式抽卡

  closeHomeGuide() {
    wx.setStorageSync('homeGuideV2', 1);
    this.setData({ showHomeGuide: false });
  },

  // =====================
  // 显示结果
  // =====================
  showResult(result) {
    // 用 category 配置补全分类名称（不修改原数据）
    const resultsWithCategory = result.map(item => ({
      ...item,
      categoryName: categoryConfig.getName(item.category),
      mode: this.data.activeMode
    }));

    this.setData({
      results: resultsWithCategory
    });

    app.globalData.currentResults = result;

    historyService.saveHistory(
      this,
      result
    );

    this.checkAchievements(result);
  },

  // =====================
  // 成就
  // =====================
  checkAchievements(result) {
    achievementService.checkAchievements(
      this,
      result
    );
  },

  closeAchievementModal() {
    achievementService.closeAchievementModal(
      this
    );
    this.maybePlayAchievementFly();
  },

  // 首个成就恭喜窗被点掉后：成就图标在主视角浮现（闪光+彩带），
  // 引导视线飞向底部第 4 个入口位并落座，此后入口固定在主页
  maybePlayAchievementFly() {
    // 游客/登录用户首次抽卡解锁 first_draw 后都播入口飞行动画；
    // 游客动画播完后入口保持隐藏（见下方 setTimeout 游客分支）
    if (!wx.getStorageSync("achievementEntryUnlocked")) return;
    if (wx.getStorageSync("achievementFlyPlayed")) return;
    wx.setStorageSync("achievementFlyPlayed", true);

    // 1) 成就入口先渲染但隐藏（用于测量落点）；浮层从屏幕中间开始（0/0 起点，transition 飞到目标位）
    this.setData({
      showAchievementEntry: true,
      achFlyLock: true,
      showAchievementFly: true,
      achFlyX: 0,
      achFlyY: 0
    });

    // 2) 实测底部成就入口位置，换算成 rpx 位移（相对浮层起点：50%宽 / 36%高）
    try {
      const sys = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
      wx.createSelectorQuery()
        .select(".nav-achievement")
        .boundingClientRect(rect => {
          if (!rect) return;
          const sx = sys.windowWidth * 0.5;
          const sy = sys.windowHeight * 0.36;
          const dx = (rect.left + rect.width / 2 - sx) * 750 / sys.windowWidth;
          const dy = (rect.top + rect.height / 2 - sy) * 750 / sys.windowWidth;
          this.setData({
            achFlyX: Math.round(dx),
            achFlyY: Math.round(dy)
          });
        })
        .exec();
    } catch (err) {
      console.log("成就飞行落点测量失败", err);
    }

    // 3) 动画结束：移除浮层；成就入口落座固定显示（游客也显示，点击提示登录）
    setTimeout(() => {
      this.setData({
        showAchievementFly: false,
        achFlyLock: false,
        showAchievementEntry: true
      });
    }, 3150);
  },

  // 分享等非抽卡途径解锁成就时：弹出恭喜窗
  checkAchievementsNotify(achievementId) {
    const { getAchievementList } =
      require("../../utils/achievements.js");

    const achievement = getAchievementList({
      unlockedAchievements: [{ id: achievementId }]
    }).find(item => item.id === achievementId);

    if (!achievement) {
      return;
    }

    this.setData({
      showAchievementModal: true,
      unlockedAchievement: achievement
    });
  },

  noop() {},

  openAchievements() {
    achievementService.openAchievements(
      this
    );
  },

  // =====================
  // 历史
  // =====================
  openHistory() {
    wx.navigateTo({
      url: "/pages/history/history"
    });
  },

  // =====================
  // 收藏
  // =====================
  collectCurrent() {
    favoriteService.collectCurrent(
      this
    );
  },

  openFavorites() {
    favoriteService.openFavorites();
  },

  loadFavorites() {
    favoriteService.loadFavorites(
      this
    );
  },

  // =====================
  // 提示词模板
  // =====================
  goToPrompt() {
    wx.navigateTo({
      url: "/pages/prompt/prompt"
    });
  },

  // =====================
  // 分享
  // =====================
  onShareAppMessage() {
    return shareService.onShareAppMessage(
      this
    );
  },

  openSharePanel() {
    shareService.openSharePanel(
      this
    );
  },

  closeSharePanel() {
    shareService.closeSharePanel(
      this
    );
  },

  copyShareText() {
    shareService.copyShareText(
      this
    );
  },

  createShareImage() {
    shareService.createShareImage(
      this
    );
  }
});