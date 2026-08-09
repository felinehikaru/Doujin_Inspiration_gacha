// pages/prompt/prompt.js

Page({
  data: {
    results: [],
    prompt: ""
  },

  onLoad() {
    this.loadResults();
  },

  onShow() {
    this.loadResults();
  },

  //读取当前抽卡结果
  loadResults() {
    const app = getApp();
    const results = (app.globalData && app.globalData.currentResults) || [];

    this.setData({
      results
    });

    this.generatePrompt();
  },

  //生成默认模板
  generatePrompt() {
    const results = this.data.results || [];
    let text = "";
  
    if (results.length) {
      text =
        `用以下三个灵感词作为关键词，生成一份文本大纲或简单剧情：
  
  `;
  
      results.forEach((item, index) => {
        text +=
          `灵感词${index + 1}：
  名称：${item.text || ""}
  
  描述：
  ${item.desc || ""}
  
  `;
      });
    }
  
    this.setData({
      prompt: text
    });
  },

  //直接编辑全文
  onPromptInput(e) {
    this.setData({
      prompt: e.detail.value
    });
  },

  //保存修改
  savePrompt() {
    wx.setStorageSync("currentPrompt", this.data.prompt);

    wx.showToast({
      title: "已保存",
      icon: "success"
    });
  },

  //复制
  copyPrompt() {
    if (!this.data.prompt) {
      wx.showToast({
        title: "暂无内容",
        icon: "none"
      });

      return;
    }

    wx.setClipboardData({
      data: this.data.prompt,

      success() {
        wx.showToast({
          title: "已复制",
          icon: "success"
        });
      }
    });
  },

  goBack() {
    wx.navigateBack();
  }
});