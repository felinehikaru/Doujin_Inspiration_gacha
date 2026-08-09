// app.js

const localOfficialEntries = require("./utils/entries.js");
const localUserEntries = require("./utils/user_entries.js");

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

    // =====================
    // 版本
    // =====================
    entryVersion: 0,

    // 网络
    online: false
  },

  onLaunch() {
    wx.cloud.init({
      env: "cloud1-d7go4jnlae0f8acc5",
      traceUser: true
    });

    console.log("云开发初始化成功");

    this.initLocalEntries();
    this.checkNetwork();
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
      this.globalData.localUserEntries = localUserEntries;

      wx.setStorageSync("localUserEntries", localUserEntries);

      console.log("初始化用户词库:", localUserEntries.length);
    }

    this.globalData.entryVersion = wx.getStorageSync("entryVersion") || 0;
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

    if (Array.isArray(data.officialEntries)) {
      wx.setStorageSync("localOfficialEntries", data.officialEntries);

      this.globalData.localOfficialEntries = data.officialEntries;
    }

    if (Array.isArray(data.userEntries)) {
      wx.setStorageSync("localUserEntries", data.userEntries);

      this.globalData.localUserEntries = data.userEntries;
    }

    if (data.version !== undefined) {
      wx.setStorageSync("entryVersion", data.version);

      this.globalData.entryVersion = data.version;
    }

    console.log(
      "词库缓存更新",
      "官方:",
      this.globalData.localOfficialEntries.length,
      "用户:",
      this.globalData.localUserEntries.length
    );
  },

  updateUserStatus(data = {}) {
    this.globalData.role = data.role || "visitor";
    this.globalData.isRegister = data.isRegister || false;
    this.globalData.user = data.user || null;
  }
});