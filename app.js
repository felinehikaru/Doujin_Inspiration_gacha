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