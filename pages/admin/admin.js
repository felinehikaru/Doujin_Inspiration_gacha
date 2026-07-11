Page({
  data: {
    pendingList: [],
    isAdmin: false
  },

  onLoad() {
    this.checkAdmin();
  },

  async checkAdmin() {
    // 通过云函数验证是否为管理员
    try {
      const res = await wx.cloud.callFunction({
        name: 'getPendingEntries'
      });
      if (res.result.success) {
        this.setData({ isAdmin: true, pendingList: res.result.data });
      } else {
        this.setData({ isAdmin: false });
        wx.showToast({ title: '权限不足', icon: 'none' });
      }
    } catch (err) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  async approveEntry(e) {
    const id = e.currentTarget.dataset.id;
    const res = await wx.cloud.callFunction({
      name: 'approveEntry',
      data: { entryId: id, action: 'approve' }
    });
    if (res.result.success) {
      wx.showToast({ title: '已通过', icon: 'success' });
      this.checkAdmin(); // 刷新列表
    }
  },

  async rejectEntry(e) {
    const id = e.currentTarget.dataset.id;
    const res = await wx.cloud.callFunction({
      name: 'approveEntry',
      data: { entryId: id, action: 'reject' }
    });
    if (res.result.success) {
      wx.showToast({ title: '已拒绝', icon: 'success' });
      this.checkAdmin();
    }
  }
});