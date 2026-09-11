// pages/entries/entries.js

const app = getApp();
const categoryConfig = require("../../utils/category.js");


const { generateSparkles, THEME_COLORS, randInt } = require("../../beautify/sparkleGen.js");

Page({
  data: {
    sparkles: [],
    role: "visitor",
    showList: false,

    // =====================
    // 全部词条
    // =====================
    entries: [],
    allList: [],

    // 当前页面实际显示的词条
    displayList: [],

    // =====================
    // 六分类
    // =====================
    categoryList: categoryConfig.list.map(item => {
      return {
        category:item.value,
        title:item.name,
        list:[]
      };
    }),

    // 当前分类
    currentCategory: "all",
    currentList: [],

    // =====================
    // 搜索
    // =====================
    keyword: "",
    isSearching: false,
    searchGroups: [],

    // =====================
    // 投稿
    // =====================
    showUpload: false,
    uploadText: "",
    uploadDesc: "",
    uploadCategory: "",
    uploadCategoryLabel: "",
    uploadTags: "",

    // =====================
    // 相似检测
    // =====================
    similarEntries: [],
    showSimilar: false,

    // =====================
    // 标签推荐（相似 tag 筛选）
    // =====================
    tagList: [],
    tagSuggestions: [],

    categoryOptions:
    categoryConfig.list.map(item=>{
      return {
        value:item.value,
        label:item.name
      };
    }),

    // =====================
    // 分页
    // =====================
    pageSize: 30,
    currentPage: 1,
    hasMore: false
  },

  // =====================
  // 页面加载
  // =====================
  onLoad() {
    this.checkRole();
  this.setData({
    sparkles: [
      // 标题/副标题区域：至少 3 颗
      ...generateSparkles({ colors: THEME_COLORS.entries, count: 3, xRange: [[70, 165], [680, 715]], yRange: [15, 100] }),
      // 页面其他区域：3~5 颗
      ...generateSparkles({ colors: THEME_COLORS.entries, count: randInt(3, 5), xRange: [[60, 120], [635, 685]], yRange: [360, 760] })
    ]
  });
  
  },

  // =====================
  // 身份检测
  // =====================
  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "user", data: { action: "checkRole" }
      });

      if (res.result && res.result.success) {
        this.setData({
          role: res.result.data.role || "visitor"
        });
      }
    } catch (e) {
      console.log("身份检测失败", e);
    }
  },

  // =====================
  // 获取当前词库
  //
  // 在线：
  // 云端官方词库 + 云端用户词库
  //
  // 离线：
  // 本地官方词库 + 本地用户词库
  // =====================
  getEntrySource() {
    // 本地缓存词库为权威数据源（app 启动时加载/云端同步后写入缓存，与抽卡同源）
    // 云端字段(cloudOfficialEntries)只在投稿弹窗打开时临时填充，平时为空，不可依赖
    const official = app.globalData.localOfficialEntries || [];
    const user = app.globalData.localUserEntries || [];

    return [...official, ...user];
  },

  // =====================
  // 投稿打开
  // =====================
  async openUpload() {
    if (this.data.role === "visitor") {
      wx.showModal({
        title: "需要登录",
        content: "注册登录后才可以投稿词条",
        confirmText: "去登录",
  
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/login/login"
            });
          }
        }
      });
  
      return;
    }
  
    // 打开投稿窗口
    this.setData({
      showUpload: true
    });
  
    // =====================
    // 确保重复检测有词库
    // =====================
    let source = this.getEntrySource();
  
    // 如果当前没有云端词库
    // 主动同步一次
    if (!source.length) {
      try {
        const res = await wx.cloud.callFunction({
          name: "syncEntries"
        });
  
        if (res.result && res.result.success) {
          app.globalData.cloudOfficialEntries = res.result.officialEntries || [];
          app.globalData.cloudUserEntries = res.result.userEntries || [];
  
          source = [
            ...app.globalData.cloudOfficialEntries,
            ...app.globalData.cloudUserEntries
          ];
  
          console.log("投稿检测同步词库:", source.length);
        }
      } catch (e) {
        console.log("投稿检测同步失败", e);
      }
    }
  
    // 保存供检测使用
    this.setData({
      entries: source
    });

    // 构建现有 tag 列表（供相似 tag 推荐）
    this.buildTagList(source);
  },

  // =====================
  // 构建现有 tag 词频列表（去重、按出现次数排序）
  // =====================
  buildTagList(source) {
    const freq = {};
    const list = Array.isArray(source) ? source : [];

    list.forEach(item => {
      const tags = Array.isArray(item.tags) ? item.tags : [];
      tags.forEach(t => {
        if (t && typeof t === "string") {
          const key = t.trim();
          if (key) {
            freq[key] = (freq[key] || 0) + 1;
          }
        }
      });
    });

    const tagList = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);

    this.setData({ tagList });

    return tagList;
  },

  // =====================
  // 标签输入：检测相似 tag 并推荐
  // =====================
  onTagsInput(e) {
    const value = e.detail.value || "";
    const parts = value.split(/[,，]/);
    const keyword = (parts[parts.length - 1] || "").trim();

    // 兜底：tagList 为空（openUpload 构建失败）时即时从词库构建
    let tagList = this.data.tagList;
    if (!tagList || !tagList.length) {
      tagList = this.buildTagList(this.getEntrySource()) || [];
    }

    let suggestions = [];
    if (keyword) {
      const selected = parts.slice(0, -1)
        .map(s => s.trim())
        .filter(s => s);

      suggestions = tagList
        .filter(t => t.includes(keyword) && !selected.includes(t))
        .sort((a, b) => {
          // 前缀匹配优先
          const pa = a.startsWith(keyword) ? 0 : 1;
          const pb = b.startsWith(keyword) ? 0 : 1;
          return pa - pb;
        })
        .slice(0, 6);
    }

    this.setData({
      uploadTags: value,
      tagSuggestions: suggestions
    });
  },

  // =====================
  // 点击候选 tag：替换当前输入片段
  // =====================
  chooseTag(e) {
    const tag = e.currentTarget.dataset.tag;
    const value = this.data.uploadTags || "";
    const parts = value.split(/[,，]/);

    parts[parts.length - 1] = tag;

    this.setData({
      uploadTags: parts.join("，"),
      tagSuggestions: []
    });
  },

  // =====================
  // 关闭投稿
  // =====================
  closeUpload() {
    this.setData({
      showUpload: false,
      uploadText: "",
      uploadDesc: "",
      uploadCategory: "",
      uploadCategoryLabel: "",
      uploadTags: "",
      similarEntries: [],
      showSimilar: false
    });
  },

  // =====================
  // 投稿输入
  // =====================
  onTextInput(e) {
    const text = e.detail.value;

    this.setData({
      uploadText: text
    });

    this.checkSimilar(text);
  },

  onDescInput(e) {
    this.setData({
      uploadDesc: e.detail.value
    });
  },

  onCategoryChange(e) {
    const item = this.data.categoryOptions[e.detail.value];

    this.setData({
      uploadCategory: item.value,
      uploadCategoryLabel: item.label
    });
  },

  // =====================
  // 相似词条检测
  // =====================
  checkSimilar(text) {
    if (!text) {
      this.setData({
        similarEntries: [],
        showSimilar: false
      });

      return;
    }

    // 直接读取当前在线/离线词库
    // 不再依赖 entries 页面列表是否已经打开
    const source = this.getEntrySource();

    const key = text.trim().toLowerCase();

    if (!key) {
      this.setData({
        similarEntries: [],
        showSimilar: false
      });

      return;
    }

    const result = source
      .filter(item => {
        const name = (item.text || "").trim().toLowerCase();

        if (!name) {
          return false;
        }

        return name.includes(key) || key.includes(name);
      });

    this.setData({
      similarEntries: result,
      showSimilar: result.length > 0
    });
  },

  // =====================
  // 加载全部词条
  // =====================
  loadEntries() {
    const list = this.getEntrySource();

    const groups = this.formatEntries(list);

    // 第一页只显示30条
    const firstPage = list.slice(0, this.data.pageSize);

    this.setData({
      entries: list,
      allList: list,
      displayList: firstPage,

      categoryList: groups,

      // 默认进入"全部词条"
      currentList: firstPage,
      currentCategory: "all",

      showList: true,

      currentPage: 1,
      hasMore: list.length > this.data.pageSize
    });

    console.log("词条总数:", list.length);
    console.log("分类:", groups.map(item => ({
      category: item.category,
      count: item.list.length
    })));
    console.log("当前显示:", firstPage.length);
    console.log("是否还有更多:", list.length > this.data.pageSize);
  },

  // =====================
  // 分类整理
  // =====================
  formatEntries(list) {
    const result = categoryConfig.list.map(item => {
      return {
        category: item.value,
        title: item.name,
        list: []
      };
    });
  
    list.forEach(item => {
      const group = result.find(g => g.category === item.category);
  
      if (group) {
        group.list.push(item);
      }
    });
  
    return result;
  },

  // =====================
  // 分类切换
  // =====================
  changeCategory(e) {
    const category = e.currentTarget.dataset.category;
    const group = this.data.categoryList.find(item => item.category === category);

    const list = group ? group.list : [];

    // 切换分类时重新从第1页开始
    const firstPage = list.slice(0, this.data.pageSize);

    this.setData({
      currentCategory: category,
      currentList: firstPage,
      displayList: firstPage,
      currentPage: 1,
      hasMore: list.length > this.data.pageSize
    });
  },

  // =====================
  // 查看全部
  // =====================
  showAll() {
    const list = this.data.allList || [];

    const firstPage = list.slice(0, this.data.pageSize);

    this.setData({
      currentCategory: "all",
      currentList: firstPage,
      displayList: firstPage,
      currentPage: 1,
      hasMore: list.length > this.data.pageSize
    });
  },

  // =====================
  // 搜索
  // =====================
  onSearch(e) {
    const key = e.detail.value.trim();

    if (!key) {
      this.setData({
        keyword: "",
        isSearching: false,
        searchGroups: []
      });

      return;
    }

    const result = this.data.entries.filter(item => {
      const text = item.text || "";
      const desc = item.desc || "";

      return text.includes(key) || desc.includes(key);
    });

    this.setData({
      keyword: key,
      isSearching: true,
      searchGroups: this.formatEntries(result)
    });
  },

  // =====================
  // 投稿提交
  // =====================
  async submitEntry() {
    const d = this.data;

    if (!d.uploadText || !d.uploadDesc || !d.uploadCategory) {
      wx.showToast({
        title: "请填写完整",
        icon: "none"
      });

      return;
    }

    if (d.showSimilar) {
      wx.showModal({
        title: "存在相似词条",
        content: "请优先使用已有词条",
        showCancel: false
      });

      return;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: "entryAdmin",
        data: {
          action: "submit",
          text: d.uploadText,
          desc: d.uploadDesc,
          category: d.uploadCategory,
          tags: d.uploadTags ? d.uploadTags.split(/[,，]/) : []
        }
      });

      if (res.result && res.result.success) {
        wx.showToast({
          title: "提交成功",
          icon: "success"
        });

        this.closeUpload();
      }
    } catch (e) {
      console.log("投稿失败", e);
    }
  },

  // =====================
  // 选择相似词条
  // =====================
  chooseSimilar(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.similarEntries[index];

    if (!item) {
      return;
    }

    wx.showModal({
      title: "已有词条",
      content: item.text + "\n\n" + item.desc,
      confirmText: "确定"
    });
  },

  // =====================
  // 分页加载
  // =====================
  onReachBottom() {
    if (!this.data.showList) {
      return;
    }

    if (!this.data.hasMore) {
      return;
    }

    const page = this.data.currentPage + 1;
    const start = this.data.currentPage * this.data.pageSize;
    const end = page * this.data.pageSize;

    // 当前正在浏览哪个分类，
    // 就从哪个完整列表中继续取
    let sourceList = [];

    if (this.data.currentCategory === "all") {
      sourceList = this.data.allList || [];
    } else {
      const group = this.data.categoryList.find(
        item => item.category === this.data.currentCategory
      );

      sourceList = group ? group.list : [];
    }

    const more = sourceList.slice(start, end);

    if (!more.length) {
      this.setData({
        hasMore: false
      });

      return;
    }

    const newDisplayList = this.data.displayList.concat(more);

    this.setData({
      displayList: newDisplayList,
      currentList: newDisplayList,
      currentPage: page,
      hasMore: end < sourceList.length
    });

    console.log("继续加载词条:", start, "-", end);
    console.log("当前显示:", newDisplayList.length);
    console.log("是否还有更多:", end < sourceList.length);
  },

  // =====================
  // 审核入口
  // =====================
  goAudit() {
    if (this.data.role !== "admin" && this.data.role !== "maintainer") {
      return;
    }

    wx.navigateTo({
      url: "/pages/admin/admin"
    });
  },

  // =====================
  // 页面显示刷新
  // =====================
  onShow() {
    if (this.data.showList) {
      this.loadEntries();
    }
  }
});