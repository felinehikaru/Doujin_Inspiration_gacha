// pages/index/index.js

// ========== 导入本地词条库（备用） ==========
const localEntries = require('../../utils/entries.js');

Page({
  data: {
    // ----- 抽卡相关 -----
    results: [],
    prompt: '',
    history: [],
    mode: 'balanced',
    modeName: '类型均衡',
    modeBadge: '各类型各抽一条',
    totalCount: localEntries.length,
    balls: [],
    showContent: false,        // 开局弹窗确认后显示内容

    // ----- 使用说明弹窗 -----
    showHelpModal: false,

    // ----- 查看所有词条 -----
    showEntriesModal: false,
    allEntries: [],

    // ----- 上传词条弹窗 -----
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
    isUploading: false,   // ✅ 这里加了逗号
    isShaking: false
  },

  onLoad() {
    this.showStartModal();
    this.syncEntriesFromCloud();
  },

  // ================================================================
  //  开局弹窗
  // ================================================================
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

  // ================================================================
  //  彩球初始化
  // ================================================================
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

  // ================================================================
  //  云端词条同步
  // ================================================================
  async syncEntriesFromCloud() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'syncEntries'
      });
      if (res.result && res.result.success && res.result.data.length > 0) {
        const app = getApp();
        app.globalData = app.globalData || {};
        app.globalData.cloudEntries = res.result.data;
        this.setData({ totalCount: res.result.data.length });
        console.log('云端词条同步成功，共 ' + res.result.data.length + ' 条');
      } else {
        console.log('云端暂无数据，使用本地词条');
      }
    } catch (err) {
      console.warn('云端同步失败，使用本地词条', err);
    }
  },

  // ================================================================
  //  获取当前使用的词条库（优先云端）
  // ================================================================
  getEntries() {
    const app = getApp();
    const cloudEntries = app.globalData?.cloudEntries || [];
    return cloudEntries.length > 0 ? cloudEntries : localEntries;
  },

  // ================================================================
  //  抽卡核心
  // ================================================================
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

  // ================================================================
  //  执行抽卡（含摇晃动画）
  // ================================================================
  async spin(mode) {
    // 1. 清空结果，显示加载状态
    this.setData({ results: [] });
    wx.showLoading({ title: '扭蛋中...' });

    // 2. 添加摇晃动画
    this.setData({ isShaking: true });

    // 3. 等待动画时间（0.8秒）
    await new Promise(resolve => setTimeout(resolve, 800));

    // 4. 获取结果
    const results = this.draw(mode);
    if (!results.length) {
      wx.hideLoading();
      this.setData({ isShaking: false });
      wx.showToast({ title: '词条不足', icon: 'none' });
      return;
    }

    // 5. 更新数据，触发胶囊渲染，关闭摇晃
    this.setData({ results, isShaking: false });

    // 6. 更新历史
    let history = this.data.history;
    history.unshift(results.map(item => item.text).join(' + '));
    if (history.length > 10) history = history.slice(0, 10);
    this.setData({ history });

    // 7. 生成提示词
    const prompt = this.buildPrompt(results);
    this.setData({ prompt });

    wx.hideLoading();
    wx.showToast({ title: '抽取成功！', icon: 'success' });
  },

  spinRandom() { this.spin('random'); },
  spinBalanced() { this.spin('balanced'); },

  // ================================================================
  //  生成提示词
  // ================================================================
  buildPrompt(results) {
    const lines = results.map((item, idx) => `${idx+1}. ${item.text}：${item.desc}`).join('\n');
    return `你是一个中文同人故事大纲助手。请根据下面抽到的 CP 梗词条生成大纲。\n要求：\n1. 输出中文。\n2. 生成可扩写成约6000字中篇的详细大纲。\n3. 包含：标题方向、核心设定、主角关系、开端、发展、高潮、结局、可写名场面。\n4. 可以补充原创细节，但必须围绕抽到的词条展开。\n\n抽到的词条：\n${lines}\n\n请直接输出大纲内容，不要额外解释。`;
  },

  // ================================================================
  //  复制提示词
  // ================================================================
  copyPrompt() {
    wx.setClipboardData({
      data: this.data.prompt,
      success: () => wx.showToast({ title: '已复制', icon: 'success' }),
      fail: () => wx.showToast({ title: '复制失败', icon: 'none' })
    });
  },

  // ================================================================
  //  重新生成
  // ================================================================
  regenerate() {
    if (this.data.results.length) {
      const prompt = this.buildPrompt(this.data.results);
      this.setData({ prompt });
      wx.showToast({ title: '已重新生成', icon: 'success' });
    }
  },

  // ================================================================
  //  清空历史
  // ================================================================
  clearHistory() {
    this.setData({ history: [] });
    wx.showToast({ title: '已清空', icon: 'success' });
  },

  // ================================================================
  //  使用说明（自定义弹窗）
  // ================================================================
  showHelp() {
    this.setData({ showHelpModal: true });
  },

  closeHelpModal() {
    this.setData({ showHelpModal: false });
  },

  // ================================================================
  //  查看所有词条
  // ================================================================
  showEntriesList() {
    const entries = this.getEntries();
    this.setData({
      allEntries: entries,
      showEntriesModal: true
    });
  },

  closeEntriesModal() {
    this.setData({ showEntriesModal: false });
  },

  // ================================================================
  //  上传词条
  // ================================================================
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

  stopPropagation() {},

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
      wx.hideLoading();
      this.setData({ isUploading: false });
      wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
      console.error('提交词条失败:', err);
    }
  }
});