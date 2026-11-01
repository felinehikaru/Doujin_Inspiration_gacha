// services/user.js

/**
 * 用户相关业务
 *
 * 包含：
 * checkRole
 * login跳转
 */

// =====================
// 检查用户身份
// =====================
async function checkRole(page) {
  try {
    // 本地登录标记：未登录（清缓存/新装/从未登录）或已登出 → 强制游客，
    // 不依赖云端 users 残留记录；登录成功时写入 localLoggedIn
    if (!wx.getStorageSync("localLoggedIn") || wx.getStorageSync("localLoggedOut")) {
      const app = getApp();
      page.setData({
        role: "visitor",
        isRegister: true,
<<<<<<< HEAD
        userNick: "",
        userAvatar: ""
=======
        userNick: ""
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
      });
      if (app.updateUserStatus) {
        app.updateUserStatus({
          role: "visitor",
          isRegister: true
        });
      }
      return {
        success: true,
        data: { role: "visitor", isRegister: true, user: null }
      };
    }

    const res = await wx.cloud.callFunction({
      name: "user", data: { action: "checkRole" }
    });

    if (res.result && res.result.success) {
      const role = res.result.data.role || "visitor";
      const isRegister = res.result.data.isRegister || false;
      const user = res.result.data.user || null;
      const loggedIn = role !== "visitor";
      const userNick = loggedIn && user && user.nickname ? user.nickname : "";
<<<<<<< HEAD
      const userAvatar = loggedIn && user && user.avatar ? user.avatar : "";
=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e

      page.setData({
        role: role,
        isRegister: isRegister,
<<<<<<< HEAD
        userNick: userNick,
        userAvatar: userAvatar
=======
        userNick: userNick
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
      });
    
      const app = getApp();
    
      if (app.updateUserStatus) {
        app.updateUserStatus({
          role: role,
          isRegister: isRegister
        });
      }
    }
    return res.result;
  } catch (err) {
    console.log("身份检测失败", err);

    return {
      success: false,
      role: "visitor",
      isRegister: false
    };
  }
}

// =====================
// 登录页面跳转
// =====================
function goLogin() {
  wx.navigateTo({
    url: "/pages/login/login"
  });
}

module.exports = {
  checkRole,
  goLogin
};