Page({
  data: {
    role: "visitor",
    userInfo: null,
    loading: false
  },

  onLoad() {
    this.checkRole();
  },

  onShow() {
    this.checkRole();
  },

  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "checkRole"
      });

      if (res.result && res.result.success) {
        this.setData({
          role: res.result.role || "visitor"
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  // 微信登录
  login() {
    wx.getUserProfile({
      desc: "用于创建账号和展示用户信息",

      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        });

        this.registerUser(res.userInfo);
      }
    });
  },

  async registerUser(userInfo) {
    this.setData({
      loading: true
    });

    try {
      const res = await wx.cloud.callFunction({
        name: "registerUser",
        data: {
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl
        }
      });

      if (res.result.success) {
        wx.showToast({
          title: "登录成功",
          icon: "success"
        });

        this.checkRole();
      }
    } catch (e) {
      console.log(e);
    }

    this.setData({
      loading: false
    });
  },

  // 登出
  logout() {
    wx.showModal({
      title: "退出登录",
      content: "确定退出当前账号？",

      success: (res) => {
        if (res.confirm) {
          this.setData({
            role: "visitor",
            userInfo: null
          });

          wx.showToast({
            title: "已退出",
            icon: "success"
          });
        }
      }
    });
  },

  // 注销账号
  deleteAccount() {
    wx.showModal({
      title: "账户注销",
      content: "注销后账号数据将删除，确定继续？",

      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "deleteUser"
          });

          this.setData({
            role: "visitor",
            userInfo: null
          });

          wx.showToast({
            title: "注销完成",
            icon: "success"
          });
        }
      }
    });
  }
});