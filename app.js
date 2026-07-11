// app.js
App({
  globalData: {
    cloudEntries: []
  },
  onLaunch() {
    // 初始化云开发
    wx.cloud.init({
      env: 'cloud1-d7go4jnlae0f8acc5',  // 替换为实际环境ID
      traceUser: true
    });
    console.log('云开发初始化成功');
  }
});