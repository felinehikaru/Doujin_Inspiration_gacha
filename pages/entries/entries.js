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

    // 搜索
    keyword: "",
    isSearching: false,
    searchGroups: [],

    // 投稿
    showUpload: false,
    uploadText: "",
    uploadDesc: "",
    uploadCategory: "",
    uploadCategoryLabel: "",
    uploadTags: "",

    // 相似检测
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

    // 分页
    pageSize: 30,
    currentPage: 1,
    hasMore: false
  },

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
  // 投稿打开
  // =====================
  openUpload() {
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

    this.setData({
      showUpload: true
    });
  },

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

    const key = text.toLowerCase();

    const result = this.data.entries
      .filter(item => {
        const name = (item.text || "").toLowerCase();

        return name.includes(key) || key.includes(name);
      })
      .slice(0, 5);

    this.setData({
      similarEntries: result,
      showSimilar: result.length > 0
    });
  },

  // =====================
  // 加载全部词条
  // 新逻辑
  // =====================
  loadEntries() {
    let official = [];
    let user = [];

    // 在线
    if (app.globalData.online) {
      official = app.globalData.cloudOfficialEntries || [];
      user = app.globalData.cloudUserEntries || [];
    }
    // 离线
    else {
      official = app.globalData.localOfficialEntries || [];
      user = app.globalData.localUserEntries || [];
    }

    const list = [...official, ...user];
    const groups = this.formatEntries(list);

    this.setData({
      entries: list,
      allList: list,
      categoryList: groups,
      currentList: list,
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

    this.setData({
      currentCategory: category,
      currentList: group ? group.list : []
    });
  },

  // =====================
  // 查看全部
  // =====================
  showAll() {
    this.setData({
      currentCategory: "all",
      currentList: this.data.allList
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
    const start = page * this.data.pageSize;
    const end = start + this.data.pageSize;
    const more = this.data.currentList.slice(start, end);

    this.setData({
      currentList: this.data.currentList.concat(more),
      currentPage: page,
      hasMore: end < this.data.currentList.length
    });
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