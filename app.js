// app.js

const localOfficialEntries = require("./utils/entries.js");
const localUserEntries = require("./utils/user_entries.js");
const versions = require("./utils/version.js");

App({
  globalData: {
    // =====================
    // 用户
    // =====================
    user: null,
    role: "visitor",
    isRegister: false,

    // =====================
    // 官方词库
    // 离线使用
    // =====================
    localOfficialEntries: [],

    // =====================
    // 用户词库
    // 离线使用
    // =====================
    localUserEntries: [],

    // =====================
    // 云端词库
    // 在线使用
    // =====================
    cloudOfficialEntries: [],
    cloudUserEntries: [],

    // 官方词库版本
officialVersion:"1.00.000",

// 用户词库版本
userVersion:"1.00.000",

    // 网络
    online: false
  },

  onLaunch() {
    wx.cloud.init({
      env: "cloud1-d7go4jnlae0f8acc5",
      traceUser: true
    });

    console.log("云开发初始化成功");

    this.detectCrash();
    this.cleanLegacyStorage();
    this.initLocalEntries();
    this.checkNetwork();
  },

  // =====================
  // 崩溃检测（成就"门不能从这一侧打开"）：
  // 判定规则：上次启动后，从未退过后台/正常退出过 → 判为崩溃。
  //  - onLaunch 记录 appLastLaunch（本次启动时间）
  //  - onHide 记录 appLastHide（最近一次退后台时间）
  //  - App.onShow（回到前台）清除 appLastHide=0：
  //    切后台再回前台不算崩溃，清除后前台运行中被杀才能被下次启动判出
  //  - 本次启动若 lastHide < lastLaunch（上次启动后没有任何 onHide）→ 崩溃
  // 首次安装启动（lastLaunch=0）不判定。每次前台崩溃都能判出。
  // =====================
  detectCrash() {
    try {
      const lastLaunch = Number(wx.getStorageSync("appLastLaunch")) || 0;
      const lastHide = Number(wx.getStorageSync("appLastHide")) || 0;

      if (lastLaunch > 0 && lastHide < lastLaunch) {
        const count = Number(wx.getStorageSync("crashCount")) || 0;
        wx.setStorageSync("crashCount", count + 1);
        // 崩溃成就已解锁过就不再设 crashPending，后续崩溃不触发成就
        if (!wx.getStorageSync("crashAchievementUnlocked")) {
          wx.setStorageSync("crashPending", true);
        }
      }

      wx.setStorageSync("appLastLaunch", Date.now());
    } catch (err) {
      console.log("[崩溃检测] 失败", err);
    }
  },

  // 回到前台（含冷启动后）：清除"曾退后台"记录，
  // 保证崩溃判定只针对"前台运行中被杀"，且每次前台崩溃都能判出
  onShow() {
    try {
      wx.setStorageSync("appLastHide", 0);
    } catch (err) {
      console.log("[崩溃检测] 清除退后台记录失败", err);
    }
  },

  onHide() {
    try {
      // 退后台/正常关闭：记录时间（下次启动据此判断不是前台崩溃）
      wx.setStorageSync("appLastHide", Date.now());
    } catch (err) {
      console.log("[崩溃检测] 记录退后台失败", err);
    }
  },

  // =====================
  // 成就/登录标记版本清理：
  // 旧版本曾把成就入口解锁标记长期残留本地，导致游客进入也显示成就按钮。
  // 每次版本号变更清一次旧标记；登录用户由云端恢复，游客重新抽卡解锁。
  // =====================
  cleanLegacyStorage() {
    const ACH_STORAGE_VERSION = "4";
    if (wx.getStorageSync("achStorageVersion") === ACH_STORAGE_VERSION) {
      return;
    }
    try {
      wx.removeStorageSync("firstDrawAchieved");
      wx.removeStorageSync("achievementEntryUnlocked");
      wx.removeStorageSync("achievementFlyPlayed");
      wx.removeStorageSync("firstDrawLoginTipShown");
      wx.removeStorageSync("localLoggedIn");
      wx.setStorageSync("achStorageVersion", ACH_STORAGE_VERSION);
      console.log("[版本清理] 已清除旧版成就/登录残留标记");
    } catch (err) {
      console.log("[版本清理] 失败", err);
    }
  },

  // =====================
  // 初始化本地缓存
  // =====================
  initLocalEntries() {
    // 官方缓存
    let official = wx.getStorageSync("localOfficialEntries");

    if (Array.isArray(official) && official.length) {
      this.globalData.localOfficialEntries = official;

      console.log("读取官方缓存:", official.length);
    } else {
      this.globalData.localOfficialEntries = localOfficialEntries;

      wx.setStorageSync("localOfficialEntries", localOfficialEntries);

      console.log("初始化官方词库:", localOfficialEntries.length);
    }

    // 用户缓存
    let users = wx.getStorageSync("localUserEntries");

    if (Array.isArray(users)) {
      this.globalData.localUserEntries = users;

      console.log("读取用户缓存:", users.length);
    } else {
      const defaultUserEntries = Array.isArray(localUserEntries)
        ? localUserEntries
        : [];
    
      this.globalData.localUserEntries = defaultUserEntries;
    
      wx.setStorageSync(
        "localUserEntries",
        defaultUserEntries
      );
    
      console.log(
        "初始化用户词库:",
        defaultUserEntries.length
      );
    }

    this.globalData.officialVersion =
wx.getStorageSync("officialVersion")
||
versions.officialVersion;


this.globalData.userVersion =
wx.getStorageSync("userVersion")
||
versions.userVersion;
  },

  // =====================
  // 网络检测
  // =====================
  checkNetwork() {
    wx.getNetworkType({
      success: (res) => {
        this.globalData.online = res.networkType !== "none";

        console.log(
          this.globalData.online ? "当前在线" : "当前离线"
        );
      },

      fail: () => {
        this.globalData.online = false;
      }
    });
  },

// =====================
// 更新词库缓存
// =====================
updateLocalEntries(data) {
  if (!data) {
    return;
  }

  // 官方词库
  if (Array.isArray(data.officialEntries)) {
    wx.setStorageSync("localOfficialEntries", data.officialEntries);
    this.globalData.localOfficialEntries = data.officialEntries;
  }

  // 用户词库
  if (Array.isArray(data.userEntries)) {
    wx.setStorageSync("localUserEntries", data.userEntries);
    this.globalData.localUserEntries = data.userEntries;
  }

  // 官方版本
  if (data.officialVersion) {
    wx.setStorageSync("officialVersion", data.officialVersion);
    this.globalData.officialVersion = data.officialVersion;
  }

  // 用户版本
  if (data.userVersion) {
    wx.setStorageSync("userVersion", data.userVersion);
    this.globalData.userVersion = data.userVersion;
  }

  console.log(
    "词库缓存更新",
    "官方:",
    this.globalData.localOfficialEntries.length,
    "用户:",
    this.globalData.localUserEntries.length,
    "版本:",
    this.globalData.officialVersion,
    this.globalData.userVersion
  );
},

  updateUserStatus(data = {}) {
    this.globalData.role = data.role || "visitor";
    this.globalData.isRegister = data.isRegister || false;
    this.globalData.user = data.user || null;
  }
});