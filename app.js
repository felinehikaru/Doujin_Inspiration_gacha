// app.js

const localEntries = require("./utils/entries.js");

App({
  globalData: {
    // 本地词库
    // 离线模式使用
    localEntries: localEntries,

    // 云端词库
    // 在线模式使用
    cloudEntries: [],

    // 网络状态
    online: false
  },

  onLaunch() {
    // 初始化云开发
    wx.cloud.init({
      env: "cloud1-d7go4jnlae0f8acc5",
      traceUser: true
    });

    console.log("云开发初始化成功");

    // 检查网络
    this.checkNetwork();
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
  }
});