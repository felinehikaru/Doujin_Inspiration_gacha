// pages/entries/entries.js

const app = getApp();

Page({
  data: {
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
    categoryList: [
      {
        category: "world",
        title: "世界背景",
        list: []
      },
      {
        category: "relationship",
        title: "关系设定",
        list: []
      },
      {
        category: "character",
        title: "角色身份",
        list: []
      },
      {
        category: "conflict",
        title: "冲突矛盾",
        list: []
      },
      {
        category: "scene",
        title: "特殊场景",
        list: []
      },
      {
        category: "theme",
        title: "主题氛围",
        list: []
      }
    ],

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

    categoryOptions: [
      {
        value: "world",
        label: "世界背景"
      },
      {
        value: "relationship",
        label: "关系设定"
      },
      {
        value: "character",
        label: "角色身份"
      },
      {
        value: "conflict",
        label: "冲突矛盾"
      },
      {
        value: "scene",
        label: "特殊场景"
      },
      {
        value: "theme",
        label: "主题氛围"
      }
    ],

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
  },

  // =====================
  // 身份检测
  // =====================
  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "checkRole"
      });

      if (res.result && res.result.success) {
        this.setData({
          role: res.result.role || "visitor"
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
    let official = [];
    let user = [];

    if (app.globalData.online) {
      official = app.globalData.cloudOfficialEntries || [];
      user = app.globalData.cloudUserEntries || [];
    } else {
      official = app.globalData.localOfficialEntries || [];
      user = app.globalData.localUserEntries || [];
    }

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

  onTagsInput(e) {
    this.setData({
      uploadTags: e.detail.value
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
    const result = [
      {
        category: "world",
        title: "世界背景",
        list: []
      },
      {
        category: "relationship",
        title: "关系设定",
        list: []
      },
      {
        category: "character",
        title: "角色身份",
        list: []
      },
      {
        category: "conflict",
        title: "冲突矛盾",
        list: []
      },
      {
        category: "scene",
        title: "特殊场景",
        list: []
      },
      {
        category: "theme",
        title: "主题氛围",
        list: []
      }
    ];

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
        name: "submitEntry",
        data: {
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