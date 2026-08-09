// pages/favorites/favorites.js

Page({
  data: {
    favorites: [],
    role: "visitor"
  },

  onLoad() {
    this.checkRole();
  },

  onShow() {
    this.checkRole();
  },

  // =====================
  // 获取用户身份
  // =====================
  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "checkRole"
      });

      if (res.result && res.result.success) {
        this.setData({
          role: res.result.role
        });

        this.loadFavorites();
      }
    } catch (err) {
      console.log("身份检测失败", err);
    }
  },

  // =====================
  // 获取收藏
  //
  // visitor:
  // 本地Storage
  //
  // user:
  // favorite云函数
  // =====================
  async loadFavorites() {
    if (this.data.role === "visitor") {
      const list = wx.getStorageSync("favorites") || [];

      this.setData({
        favorites: list
      });

      return;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: "favorite",
        data: {
          action: "get"
        }
      });

      if (res.result && res.result.success) {
        this.setData({
          favorites: res.result.data || []
        });
      }
    } catch (err) {
      console.log("收藏读取失败", err);
    }
  },

  // =====================
  // 删除收藏
  //
  // visitor:
  // 删除本地
  //
  // user:
  // favorite云函数
  // =====================
  async deleteFavorite(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.favorites[index];

    if (!item) {
      return;
    }

    // 游客本地删除
    if (this.data.role === "visitor") {
      let list = wx.getStorageSync("favorites") || [];

      list.splice(index, 1);

      wx.setStorageSync("favorites", list);

      this.setData({
        favorites: list
      });

      return;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: "favorite",
        data: {
          action: "delete",
          id: item._id
        }
      });

      if (res.result && res.result.success) {
        wx.showToast({
          title: "已删除",
          icon: "success"
        });

        this.loadFavorites();
      }
    } catch (err) {
      console.log("删除失败", err);
    }
  },

  // =====================
  // 复制收藏
  // =====================
  copyFavorite(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.favorites[index];
    const text = item.text || item;

    wx.setClipboardData({
      data: text,

      success() {
        wx.showToast({
          title: "复制成功",
          icon: "success"
        });
      }
    });
  },

  // =====================
  // 生成提示词
  // =====================
  createPrompt(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.favorites[index];
    const text = item.text || item;

    wx.navigateTo({
      url: "/pages/prompt/prompt?text=" + encodeURIComponent(text)
    });
  }
});