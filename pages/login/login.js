Page({
  data: {
    userInfo: null,
    loading: false
  },

  login() {
    wx.getUserProfile({
      desc: "用于创建账号和展示用户信息",
      success: res => {
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

        setTimeout(() => {
          const pages = getCurrentPages();
          const prevPage = pages[pages.length - 2];
          if (prevPage && prevPage.checkRole) {
            prevPage.checkRole();
            prevPage.loadFavorites();
          }

          wx.navigateBack();

        }, 1000);
      }

    } catch (e) {
      console.log(e);
    }

    this.setData({
      loading: false
    });
  }
})