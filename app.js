// app.js

const localEntries = require("./utils/entries.js");

App({
  globalData: {
    // =========================
    // 本地词库
    //
    // 离线模式使用
    // 来源:
    // 1. wxStorage缓存
    // 2. 初始entries.js
    // =========================
    localEntries: [],

    // =========================
    // 云端词库
    //
    // 在线抽卡使用
    //
    // entries
    // +
    // user_entries
    // =========================
    cloudEntries: [],

    // =========================
    // 词库版本
    // =========================
    entryVersion: 0,

    // =========================
    // 网络状态
    // =========================
    online: false
  },

  onLaunch() {
    // =========================
    // 初始化云开发
    // =========================
    wx.cloud.init({
      env: "cloud1-d7go4jnlae0f8acc5",
      traceUser: true
    });

    console.log("云开发初始化成功");

    // =========================
    // 初始化本地词库
    // =========================
    this.initLocalEntries();

    // =========================
    // 网络检测
    // =========================
    this.checkNetwork();
  },

  // =========================
  // 初始化本地词库
  //
  // 优先读取缓存
  // 没有则使用entries.js
  // =========================
  initLocalEntries() {
    const cache = wx.getStorageSync("localEntries");

    if (Array.isArray(cache) && cache.length) {
      this.globalData.localEntries = cache;
      console.log("读取本地缓存词库:", cache.length);
    } else {
      this.globalData.localEntries = localEntries;
      wx.setStorageSync("localEntries", localEntries);
      console.log("初始化本地词库:", localEntries.length);
    }

    // 本地版本
    const version = wx.getStorageSync("entryVersion") || 0;
    this.globalData.entryVersion = version;
  },

  // =========================
  // 网络检测
  // =========================
  checkNetwork() {
    wx.getNetworkType({
      success: res => {
        const online = res.networkType !== "none";
        this.globalData.online = online;
        console.log(online ? "当前在线" : "当前离线");
      },
      fail: () => {
        this.globalData.online = false;
        console.log("网络检测失败，进入离线模式");
      }
    });
  },

  // =========================
  // 更新本地词库缓存
  //
  // 在线同步成功后调用
  // =========================
  updateLocalEntries(entries, version) {
    if (!Array.isArray(entries) || !entries.length) {
      return;
    }

    wx.setStorageSync("localEntries", entries);

    if (version !== undefined) {
      wx.setStorageSync("entryVersion", version);
    }

    this.globalData.localEntries = entries;
    this.globalData.entryVersion = version || this.globalData.entryVersion;

    console.log("本地词库已更新:", entries.length, "版本:", this.globalData.entryVersion);
  }
});