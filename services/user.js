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
    const res = await wx.cloud.callFunction({
      name: "checkRole"
    });

    if (res.result && res.result.success) {
      const role = res.result.role || "visitor";
      const isRegister = res.result.isRegister || false;
    
      page.setData({
        role: role,
        isRegister: isRegister
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