// pages/prompt/prompt.js
Page({
  data: {
    results: [],
    prompt: '',
    showTemplateEditor: false,
    promptTemplate: ''
  },

  onLoad() {
    this.loadPromptTemplate();
    this.loadResultsAndGenerate();
  },

  // 页面显示时重新加载（如果从主页返回，可能结果已更新）
  onShow() {
    this.loadResultsAndGenerate();
  },

  // ===== 加载词条结果 =====
  loadResultsAndGenerate() {
    const app = getApp();
    const results = (app.globalData && app.globalData.currentResults) || [];
    this.setData({ results });
    if (results.length) {
      this.generatePrompt();
    } else {
      this.setData({ prompt: '' });
    }
  },

  // ===== 生成提示词 =====
  generatePrompt() {
    const results = this.data.results;
    if (!results.length) {
      this.setData({ prompt: '' });
      return;
    }
    const lines = results.map((item, idx) => `${idx+1}. ${item.text}：${item.desc}`).join('\n');
    const template = this.data.promptTemplate || this.getDefaultTemplate();
    const prompt = template.replace(/\{results\}/g, lines);
    this.setData({ prompt });
  },

  // ===== 重新生成 =====
  regenerate() {
    if (this.data.results.length) {
      this.generatePrompt();
      wx.showToast({ title: '已重新生成', icon: 'success' });
    } else {
      wx.showToast({ title: '请先抽卡', icon: 'none' });
    }
  },

  // ===== 复制提示词 =====
  copyPrompt() {
    if (!this.data.prompt) {
      wx.showToast({ title: '没有可复制的内容', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: this.data.prompt,
      success: () => wx.showToast({ title: '已复制', icon: 'success' }),
      fail: () => wx.showToast({ title: '复制失败', icon: 'none' })
    });
  },

  // ===== 返回主页 =====
  goBack() {
    wx.navigateBack();
  },

  // ===== 模板管理 =====
  getDefaultTemplate() {
    return `你是一个中文同人故事大纲助手。请根据下面抽到的 CP 梗词条生成大纲。
要求：
1. 输出中文。
2. 生成可扩写成约6000字中篇的详细大纲。
3. 包含：标题方向、核心设定、主角关系、开端、发展、高潮、结局、可写名场面。
4. 可以补充原创细节，但必须围绕抽到的词条展开。

抽到的词条：
{results}

请直接输出大纲内容，不要额外解释。`;
  },

  loadPromptTemplate() {
    try {
      const template = wx.getStorageSync('promptTemplate');
      if (template) {
        this.setData({ promptTemplate: template });
      } else {
        this.setData({ promptTemplate: this.getDefaultTemplate() });
      }
    } catch (e) {
      this.setData({ promptTemplate: this.getDefaultTemplate() });
    }
  },

  toggleTemplateEditor() {
    this.setData({ showTemplateEditor: !this.data.showTemplateEditor });
  },

  onTemplateInput(e) {
    this.setData({ promptTemplate: e.detail.value });
  },

  saveTemplate() {
    try {
      wx.setStorageSync('promptTemplate', this.data.promptTemplate);
      wx.showToast({ title: '模板已保存', icon: 'success' });
      this.setData({ showTemplateEditor: false });
      // 重新生成提示词
      if (this.data.results.length) {
        this.generatePrompt();
      }
    } catch (e) {
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  },

  resetTemplate() {
    const template = this.getDefaultTemplate();
    this.setData({ promptTemplate: template });
    try {
      wx.setStorageSync('promptTemplate', template);
      wx.showToast({ title: '已恢复默认', icon: 'success' });
      // 重新生成提示词
      if (this.data.results.length) {
        this.generatePrompt();
      }
    } catch (e) {
      wx.showToast({ title: '恢复失败', icon: 'none' });
    }
  }
});