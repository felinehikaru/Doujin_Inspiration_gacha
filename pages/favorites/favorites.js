Page({
  data: {
    favorites: [],
    role: "visitor"
  },

  onLoad() {
    this.checkRole();
  },

  // =====================
  // 获取身份
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
      console.log("身份获取失败", err);
    }
  },

  // =====================
  // 获取收藏
  //
  // user:
  // 云端favorites
  //
  // visitor:
  // 无收藏
  // =====================
  async loadFavorites() {
    if (this.data.role === "visitor") {
      this.setData({
        favorites: []
      });
      return;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: "getFavorites"
      });

      if (res.result && res.result.success) {
        this.setData({
          favorites: res.result.data || []
        });
      }
    } catch (err) {
      console.log("读取收藏失败", err);
    }
  },

  // =====================
  // 删除收藏
  // 云端删除
  // =====================
  async deleteFavorite(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.favorites[index];

    if (!item) {
      return;
    }

    // 云端收藏
    if (item._id) {
      try {
        await wx.cloud.callFunction({
          name: "deleteFavorite",
          data: {
            id: item._id
          }
        });

        wx.showToast({
          title: "已删除",
          icon: "success"
        });

        this.loadFavorites();
      } catch (err) {
        console.log("删除失败", err);
      }
      return;
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
  // 提示词模板
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