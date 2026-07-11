// pages/index/index.js

const localEntries = require('../../utils/entries.js');

Page({
  data: {
    // ----- 抽卡相关 -----
    results: [],
    history: [],
    mode: 'balanced',
    modeName: '类型均衡',
    modeBadge: '各类型各抽一条',
    totalCount: localEntries.length,
    balls: [],
    showContent: false,
    isShaking: false,

    // ----- 使用说明弹窗 -----
    showHelpModal: false,

    // ----- 查看所有词条（含搜索+筛选） -----
    showEntriesModal: false,
    allEntries: [],
    searchKeyword: '',
    filterType: 'all',
    displayEntries: [],
    filteredEntriesCount: 0,

    // ----- 收藏 -----
    favorites: [],
    showFavoritesModal: false,

    // ----- 上传词条 -----
    showUploadModal: false,
    uploadText: '',
    uploadType: '',
    uploadTypeLabel: '',
    uploadDesc: '',
    typeOptions: [
      { value: 'bg', label: '背景类' },
      { value: 'rel', label: '关系类' },
      { value: 'plot', label: '情节类' }
    ],
    isUploading: false
  },

  onLoad() {
    this.showStartModal();
    this.syncEntriesFromCloud();
    this.loadFavorites();
  },

  // ===== 开局弹窗 =====
  showStartModal() {
    wx.showModal({
      title: '欢迎使用',
      content: '💡扭蛋机提供最简单的AI大纲生成提示词功能,\n\n并非鼓励认同AI写作，\n\n仅作为个人娱乐和灵感碰撞的辅助功能，\n\n请各位同人创作者秉持初心，享受创作',
      confirmText: '接受',
      cancelText: '不接受',
      success: (res) => {
        if (res.confirm) {
          this.setData({ showContent: true });
          this.initBalls();
        } else if (res.cancel) {
          wx.exitMiniProgram();
        }
      },
      fail: () => {
        this.setData({ showContent: true });
        this.initBalls();
      }
    });
  },

  // ===== 彩球初始化 =====
  initBalls() {
    const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#ffe66d','#9b5de5','#f15bb5','#00bbf9','#00f5d4','#ff9f1c','#7bdff2'];
    let balls = [];
    for (let i = 0; i < 20; i++) {
      const size = 20 + Math.random() * 30;
      balls.push({
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 70,
        size: size,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    this.setData({ balls });
  },

  // ===== 云端词条同步 =====
async syncEntriesFromCloud() {
  if (!wx.cloud) {
    console.warn('云开发未初始化，使用本地词条');
    return;
  }
  try {
    wx.showLoading({ title: '同步词条中...' });
    const res = await wx.cloud.callFunction({
      name: 'syncEntries'
    });
    wx.hideLoading();
    if (res.result && res.result.success && res.result.data.length > 0) {
      const app = getApp();
      if (!app.globalData) app.globalData = {};
      app.globalData.cloudEntries = res.result.data;
      this.setData({ totalCount: res.result.data.length });
      wx.showToast({ title: '词条已同步', icon: 'success' });
      console.log('云端词条同步成功，共 ' + res.result.data.length + ' 条');
    } else {
      console.log('云端暂无数据，使用本地词条');
    }
  } catch (err) {
    wx.hideLoading();
    console.warn('云端同步失败，使用本地词条', err);
  }
},

  // ===== 获取词条库 =====
  getEntries() {
    const app = getApp();
    const cloudEntries = (app.globalData && app.globalData.cloudEntries) || [];
    return cloudEntries.length > 0 ? cloudEntries : localEntries;
  },

  // ===== 抽卡核心 =====
  draw(mode) {
    const entries = this.getEntries();
    let picked = [];
    const pool = entries.slice();

    if (mode === 'random') {
      for (let i = 0; i < 3; i++) {
        if (!pool.length) break;
        const idx = Math.floor(Math.random() * pool.length);
        picked.push(pool.splice(idx, 1)[0]);
      }
    } else {
      const types = ['bg','rel','plot'];
      types.forEach(type => {
        const candidates = pool.filter(item => item.type === type && !picked.includes(item));
        if (candidates.length) {
          const idx = Math.floor(Math.random() * candidates.length);
          picked.push(candidates[idx]);
          const realIdx = pool.indexOf(candidates[idx]);
          if (realIdx > -1) pool.splice(realIdx, 1);
        }
      });
      while (picked.length < 3 && pool.length) {
        const idx = Math.floor(Math.random() * pool.length);
        picked.push(pool.splice(idx, 1)[0]);
      }
    }
    return picked.slice(0, 3);
  },

  // ===== 执行抽卡 =====
  async spin(mode) {
    if (this.data.isShaking) return;

    this.setData({ results: [] });
    wx.showLoading({ title: '扭蛋中...' });

    this.setData({ isShaking: true });

    await new Promise(resolve => setTimeout(resolve, 800));

    const results = this.draw(mode);
    if (!results.length) {
      wx.hideLoading();
      this.setData({ isShaking: false });
      wx.showToast({ title: '词条不足', icon: 'none' });
      return;
    }

    this.setData({ results, isShaking: false });

    // 更新历史
    let history = this.data.history;
    history.unshift(results.map(item => item.text).join(' + '));
    if (history.length > 10) history = history.slice(0, 10);
    this.setData({ history });

    // 存储结果到全局数据，供提示词页面使用
    const app = getApp();
    if (!app.globalData) app.globalData = {};
    app.globalData.currentResults = results;

    wx.hideLoading();
    wx.showToast({ title: '抽取成功！', icon: 'success' });
  },

  spinRandom() { this.spin('random'); },
  spinBalanced() { this.spin('balanced'); },

  // ===== 跳转到提示词页面 =====
  goToPrompt() {
    const results = this.data.results;
    if (!results.length) {
      wx.showToast({ title: '请先抽卡', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/pages/prompt/prompt'
    });
  },

  // ===== 清空历史 =====
  clearHistory() {
    this.setData({ history: [] });
    wx.showToast({ title: '已清空', icon: 'success' });
  },

  // ===== 使用说明 =====
  showHelp() {
    this.setData({ showHelpModal: true });
  },
  closeHelpModal() {
    this.setData({ showHelpModal: false });
  },

  // ===== 词条搜索与筛选 =====
  onSearchInput(e) {
    const keyword = e.detail.value.trim().toLowerCase();
    this.setData({ searchKeyword: keyword });
    this.filterEntries();
  },
  setFilter(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ filterType: type });
    this.filterEntries();
  },
  filterEntries() {
    const entries = this.getEntries();
    const keyword = this.data.searchKeyword.toLowerCase();
    const filterType = this.data.filterType;
    let filtered = entries;
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }
    if (keyword) {
      filtered = filtered.filter(item =>
        item.text.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword)
      );
    }
    this.setData({
      displayEntries: filtered,
      filteredEntriesCount: filtered.length
    });
  },
  showEntriesList() {
    const entries = this.getEntries();
    this.setData({
      allEntries: entries,
      showEntriesModal: true,
      searchKeyword: '',
      filterType: 'all'
    });
    this.filterEntries();
  },
  closeEntriesModal() {
    this.setData({ showEntriesModal: false });
  },

  // ===== 收藏 =====
  loadFavorites() {
    try {
      const favorites = wx.getStorageSync('favorites') || [];
      this.setData({ favorites });
    } catch (e) {
      this.setData({ favorites: [] });
    }
  },
  saveFavorites() {
    try {
      wx.setStorageSync('favorites', this.data.favorites);
    } catch (e) {
      console.warn('保存收藏失败', e);
    }
  },
  collectCurrent() {
    if (!this.data.results.length) {
      wx.showToast({ title: '请先抽卡', icon: 'none' });
      return;
    }
    const combination = this.data.results.map(item => item.text).join(' + ');
    const favorites = this.data.favorites;
    if (favorites.includes(combination)) {
      wx.showToast({ title: '已收藏过', icon: 'none' });
      return;
    }
    favorites.push(combination);
    this.setData({ favorites });
    this.saveFavorites();
    wx.showToast({ title: '收藏成功！', icon: 'success' });
  },
  showFavorites() {
    this.setData({ showFavoritesModal: true });
  },
  closeFavoritesModal() {
    this.setData({ showFavoritesModal: false });
  },
  useFavorite(e) {
    const index = e.currentTarget.dataset.index;
    const combination = this.data.favorites[index];
    const names = combination.split(' + ');
    const entries = this.getEntries();
    const results = names.map(name => {
      const found = entries.find(item => item.text === name);
      return found || { text: name, type: 'unknown', desc: '词条已不存在' };
    });
    this.setData({ results });
    const app = getApp();
    if (!app.globalData) app.globalData = {};
    app.globalData.currentResults = results;
    let history = this.data.history;
    history.unshift(combination);
    if (history.length > 10) history = history.slice(0, 10);
    this.setData({ history });
    this.closeFavoritesModal();
    wx.showToast({ title: '已加载收藏组合', icon: 'success' });
  },
  deleteFavorite(e) {
    const index = e.currentTarget.dataset.index;
    const favorites = this.data.favorites;
    favorites.splice(index, 1);
    this.setData({ favorites });
    this.saveFavorites();
    wx.showToast({ title: '已删除', icon: 'success' });
  },

  // ===== 分享 =====
  onShareAppMessage() {
    const results = this.data.results;
    if (!results.length) {
      return {
        title: '🎰 同人梗扭蛋机 - 来抽个灵感吧！',
        path: '/pages/index/index'
      };
    }
    const title = results.map(item => item.text).join(' + ');
    return {
      title: `🎰 我抽到了：${title}`,
      path: '/pages/index/index'
    };
  },

  // ===== 上传词条 =====
  showUploadModal() {
    this.setData({
      showUploadModal: true,
      uploadText: '',
      uploadType: '',
      uploadTypeLabel: '',
      uploadDesc: ''
    });
  },
  closeUploadModal() {
    this.setData({ showUploadModal: false });
  },
  onTextInput(e) {
    this.setData({ uploadText: e.detail.value });
  },
  onDescInput(e) {
    this.setData({ uploadDesc: e.detail.value });
  },
  onTypeChange(e) {
    const idx = e.detail.value;
    const option = this.data.typeOptions[idx];
    this.setData({
      uploadType: option.value,
      uploadTypeLabel: option.label
    });
  },
  async submitEntry() {
    const { uploadText, uploadType, uploadDesc } = this.data;
    console.log('准备调用 submitEntry 云函数');
  
    if (!uploadText.trim()) {
      wx.showToast({ title: '请输入词条名', icon: 'none' });
      return;
    }
    if (!uploadType) {
      wx.showToast({ title: '请选择类型', icon: 'none' });
      return;
    }
    if (!uploadDesc.trim()) {
      wx.showToast({ title: '请输入描述', icon: 'none' });
      return;
    }
  
    this.setData({ isUploading: true });
    wx.showLoading({ title: '提交中...' });
  
    try {
      const res = await wx.cloud.callFunction({
        name: 'submitEntry',
        data: {
          text: uploadText.trim(),
          type: uploadType,
          desc: uploadDesc.trim()
        }
      });
  
      console.log('云函数调用成功，返回结果：', res);  // ← 新增：打印成功结果
  
      wx.hideLoading();
      this.setData({ isUploading: false });
  
      if (res.result.success) {
        wx.showModal({
          title: '提交成功',
          content: '词条已提交，等待管理员审核。\n审核通过后会自动加入词条库。',
          showCancel: false,
          confirmText: '知道了'
        });
        this.closeUploadModal();
      } else {
        wx.showToast({ title: res.result.message || '提交失败', icon: 'none' });
      }
    } catch (err) {
      console.error('云函数调用失败：', err);  // 已存在，保持
      wx.hideLoading();
      this.setData({ isUploading: false });
      wx.showToast({ title: '提交失败：' + (err.errMsg || err.message || '未知错误'), icon: 'none' });
    }
  }
});