// pages/history/history.js
const categoryConfig = require("../../utils/category.js");
const entryLib = require("../../utils/entries.js");

// 按词条名建索引，补全旧历史记录缺失的 desc/category
const entryMap = {};
(entryLib || []).forEach(e => {
  if (e && e.text) {
    entryMap[e.text] = e;
  }
});

const { generateSparkles, THEME_COLORS, randInt } = require("../../beautify/sparkleGen.js");

Page({
  data:{
    sparkles: [],
    history:[],
    showDetail: false,
    order: "desc"
  },

  onLoad(){
    this.loadHistory();
  this.setData({
    sparkles: [
      // 标题/副标题区域：至少 3 颗
      ...generateSparkles({ colors: THEME_COLORS.history, count: 3, xRange: [[70, 165], [680, 715]], yRange: [15, 100] }),
      // 页面其他区域：3~5 颗
      ...generateSparkles({ colors: THEME_COLORS.history, count: randInt(3, 5), xRange: [[60, 120], [635, 685]], yRange: [360, 760] })
    ]
  });
  
  },

  onShow(){
    this.loadHistory();
  },

  loadHistory() {
    let history = wx.getStorageSync('history') || [];

    // 时间序号：最旧=1，最新=N，固定编号（不随排列顺序变化）
    const total = history.length;
    history = history.map((item, i) => ({
      ...item,
      timeIndex: total - i   // i=0 是最新，timeIndex=total；最后一条最旧=1
    }));

    // 排序：desc=逆序(新->旧，默认)，asc=正序(旧->新)
    const isAsc = this.data.order === "asc";
    if (isAsc) {
      history = history.slice().reverse();
    }

    history = history.map(item => {
      // 兼容旧数据：如果没有 entries，从 text 按 " + " 拆分
      let entries = item.entries;
      if (!entries || !entries.length) {
        const texts = (item.text || "").split(" + ");
        entries = texts.map(t => ({
          text: t,
          desc: "",
          category: ""
        }));
      }

      // 补全旧数据缺失的 desc/category（从词库按词条名匹配）
      entries = entries.map(entry => {
        let desc = entry.desc || "";
        let category = entry.category || "";
        if (!desc || !category) {
          const found = entryMap[entry.text];
          if (found) {
            desc = desc || found.desc || "";
            category = category || found.category || "";
          }
        }
        // 分类用 utils/category.js 统一转换（不自己写分类映射）
        return {
          ...entry,
          desc: desc,
          category: category,
          categoryName: categoryConfig.getName(category) || ""
        };
      });

      return {
        ...item,
        entries: entries,
        timeText: this.formatTime(item.time)
      };
    });

    this.setData({
      history
    });
  },

  formatTime(time) {
    const date = new Date(time);

    return (
      date.getFullYear() + "-" +
      String(date.getMonth() + 1).padStart(2, "0") + "-" +
      String(date.getDate()).padStart(2, "0") + " " +
      String(date.getHours()).padStart(2, "0") + ":" +
      String(date.getMinutes()).padStart(2, "0")
    );
  },

  toggleDetail() {
    this.setData({
      showDetail: !this.data.showDetail
    });
  },

  toggleOrder() {
    this.setData({
      order: this.data.order === "desc" ? "asc" : "desc"
    }, () => {
      this.loadHistory();
    });
  },

  clearHistory(){
    wx.showModal({
      title:'确认删除',
      content:'历史记录仅记录在本地，确认删除无法找回',
      confirmText:'确认删除',
      cancelText:'取消',
      success:res=>{
        if(res.confirm){
          wx.removeStorageSync(
            'history'
          );
          this.setData({
            history:[]
          });
          wx.showToast({
            title:'已清空历史',
            icon:'success'
          });
        }
      }
    });
  },

  goBack(){
    wx.navigateBack();
  },

  copyHistory(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.history[index];

    // 复制完整词条（词条名 + 描述）
    const text = item.entries
      .map((entry, i) => {
        let line = (i + 1) + ". " + entry.text;
        if (entry.desc) {
          line += "\n" + entry.desc;
        }
        return line;
      })
      .join("\n\n");

    wx.setClipboardData({
      data: text,

      success() {
        wx.showToast({
          title: "已复制",
          icon: "success"
        });
      }
    });
  },
});
