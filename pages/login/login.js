Page({
  data: {
    role: "visitor",
    userInfo: null,
    loading: false,
    cloudNickname: "",
    showNickModal: false,
    nickFocus: false
  },

  noop() {},

  // 关闭昵称确认面板
  closeNickModal() {
    this.setData({ showNickModal: false, nickFocus: false });
  },

  onLoad() {
    this.checkRole();
  },

  onShow() {
    this.checkRole();
  },

  async checkRole() {
    // 与首页身份判断保持一致：本地未登录（清缓存/新装/登出）→ 显示"未登录"，让用户主动走微信登录
    // 否则：删除小程序/清缓存后本地标记没了，但云端登录态还在，login 页会误显示"已登录"，
    //      导致用户无法重新选择微信名，返回首页又因本地标记缺失不显示昵称
    if (!wx.getStorageSync("localLoggedIn") || wx.getStorageSync("localLoggedOut")) {
      this.setData({ role: "visitor", cloudNickname: "" });
      return;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: "user", data: { action: "checkRole" }
      });

      if (res.result && res.result.success) {
        const user = res.result.data.user || null;
        this.setData({
          role: res.result.data.role || "visitor",
          cloudNickname: user && user.nickname ? user.nickname : ""
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  // 微信登录
  login() {
    const nick = this.data.cloudNickname;
    if (nick && nick !== "微信用户") {
      // 云端已有真实昵称：直接登录，不再弹选择器
      this.registerUser({
        nickName: nick,
        avatarUrl: ""
      });
      return;
    }

    // 首次登录：弹出居中确认面板，同时自动聚焦唤起底部微信昵称面板
    this.setData({
      showNickModal: true,
      nickFocus: true
    });
  },

  // 微信昵称选择器确认后：自动登录
  onNicknameConfirm(e) {
    const val = (e.detail.value || "").trim();
    if (!val || val === "微信用户") {
      wx.showToast({
        title: "未获取到昵称，请重试",
        icon: "none"
      });
      return;
    }

    wx.setStorageSync("userNick", val);
    this.setData({ showNickModal: false, nickFocus: false });
    this.registerUser({
      nickName: val,
      avatarUrl: ""
    });
  },

  async registerUser(userInfo) {
    this.setData({
      loading: true
    });

    try {
      const res = await wx.cloud.callFunction({
        name: "user",
        data: {
          action: "register",
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl
        }
      });

      if (res.result.success) {
        wx.showToast({
          title: "登录成功",
          icon: "success"
        });

        // 登录成功：写入本地登录标记（清缓存后=游客），解除登出标记
        wx.setStorageSync("localLoggedIn", true);
        wx.removeStorageSync("localLoggedOut");

        // 登录后：把本地首个成就上传到云端成就集合
        if (wx.getStorageSync("firstDrawAchieved")) {
          wx.cloud.callFunction({
            name: "achievements",
            data: { action: "syncFirstDraw" }
          }).catch(() => {});
        }

        // 登录后：本地全部成就进度（含分享成就等）同步上传云端，避免清本地缓存后丢失
        try {
          const localProg = wx.getStorageSync("localAchievementProgress");
          if (localProg && typeof localProg === "object") {
            wx.cloud.callFunction({
              name: "achievements",
              data: {
                action: "syncLocal",
                unlockedAchievements: localProg.unlockedAchievements || [],
                inProgress: localProg.inProgress || {}
              }
            }).catch(() => {});
          }
        } catch (e) {
          console.log("本地成就同步失败", e);
        }

        this.checkRole();
      } else {
        wx.showToast({
          title: res.result.message || "登录失败，请重试",
          icon: "none"
        });
      }
    } catch (e) {
      console.log("登录失败", e);
      wx.showToast({
        title: "登录失败，请检查网络",
        icon: "none"
      });
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

      success: async (res) => {
        if (!res.confirm) return;

        wx.showLoading({
          title: "退出中",
          mask: true
        });

        try {
          // 云端标记登出，checkRole 会返回 visitor
          await wx.cloud.callFunction({
            name: "user", data: { action: "logout" }
          });
        } catch (e) {
          console.log("登出云函数失败", e);
        }

        // 登出 = 回到全新游客状态：清除"首次抽卡解锁"相关本地标记，
        // 使游客下一次抽卡重新触发 first_draw（本地成就恭喜窗）。
        // 保留 localAchievementProgress（游客分享等本地记录），登录后由 syncLocal 上传云端不丢失
        wx.setStorageSync("localLoggedIn", false);
        wx.setStorageSync("localLoggedOut", true);
        wx.removeStorageSync("firstDrawAchieved");
        wx.removeStorageSync("achievementEntryUnlocked");
        wx.removeStorageSync("achievementFlyPlayed");
        wx.removeStorageSync("firstDrawLoginTipShown");

        // 同步全局状态（主界面立即生效）
        const app = getApp();
        if (app.updateUserStatus) {
          app.updateUserStatus({
            role: "visitor",
            isRegister: true,
            user: null
          });
        }

        this.setData({
          role: "visitor",
          userInfo: null
        });

        wx.hideLoading();
        wx.showToast({
          title: "已退出",
          icon: "success"
        });
      }
    });
  },

  // 注销账号
  deleteAccount() {
    wx.showModal({
      title: "账户注销",
      content: "注销后账号数据将删除，确定继续？",

      success: async (res) => {
        if (!res.confirm) return;

        wx.showLoading({
          title: "注销中",
          mask: true
        });

        try {
          const delRes = await wx.cloud.callFunction({
            name: "user", data: { action: "deleteAccount" }
          });

          if (!delRes.result || !delRes.result.success) {
            wx.hideLoading();
            wx.showToast({
              title: (delRes.result && delRes.result.message) || "注销失败，请重试",
              icon: "none"
            });
            return;
          }

          // 云端删除成功，清理本地账户相关缓存
          wx.removeStorageSync("favorites");          // 收藏本地缓存
          wx.removeStorageSync("localUserEntries");   // 用户词库缓存（投稿镜像）

          // 重置全局用户状态（主界面/其他页面立即生效）
          const app = getApp();
          if (app.updateUserStatus) {
            app.updateUserStatus({
              role: "visitor",
              isRegister: false,
              user: null
            });
          }

          this.setData({
            role: "visitor",
            userInfo: null
          });

          wx.hideLoading();
          wx.showToast({
            title: "注销完成",
            icon: "success"
          });
        } catch (err) {
          console.log("注销失败", err);
          wx.hideLoading();
          wx.showToast({
            title: "注销失败，请重试",
            icon: "none"
          });
        }
      }
    });
  }
});