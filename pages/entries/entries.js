Page({
  data: {
    role: "visitor",
    // 是否显示列表
    showList: false,

    // 全部词条
    entries: [],

    // 六分类固定数据
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
    currentCategory: "world",
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
    ]
  },

  onLoad() {
    this.checkRole();
  },

  // =====================
  // 身份
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
      }
    } catch (e) {
      console.log("身份检测失败", e);
    }
  },

  // =====================
  // 投稿
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
      showUpload: false
    });
  },

  onTextInput(e) {
    this.setData({
      uploadText: e.detail.value
    });
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

  async submitEntry() {
    const d = this.data;

    if (!d.uploadText || !d.uploadDesc || !d.uploadCategory) {
      wx.showToast({
        title: "请填写完整",
        icon: "none"
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
  // 加载词条
  // =====================
  async loadEntries() {
    try {
      const db = wx.cloud.database();

      const official = await db.collection("entries").get();
      const user = await db.collection("user_entries").get();

      const list = [
        ...official.data,
        ...user.data
      ];

      const groups = this.formatEntries(list);

      this.setData({
        entries: list,
        categoryList: groups,
        currentList: groups[0].list || [],
        currentCategory: "world",
        showList: true
      });

      console.log("总词条数量", list.length);
      console.log(
        "分类统计",
        groups.map(i => ({
          category: i.category,
          count: i.list.length
        }))
      );
    } catch (e) {
      console.log("加载词条失败", e);
    }
  },

  // =====================
  // 分类整理
  // =====================
  formatEntries(list) {
    const base = this.data.categoryList;

    return base.map(group => {
      return {
        category: group.category,
        title: group.title,
        list: list.filter(item => {
          return item.category === group.category;
        })
      };
    });
  },

  // =====================
  // 切换分类
  // =====================
  changeCategory(e) {
    const category = e.currentTarget.dataset.category;
    const group = this.data.categoryList.find(
      item => item.category === category
    );

    this.setData({
      currentCategory: category,
      currentList: group ? group.list : []
    });
  },

  // =====================
  // 搜索
  // =====================
  onSearch(e) {
    const key = e.detail.value.trim();

    if (!key) {
      this.setData({
        isSearching: false,
        searchGroups: []
      });
      return;
    }

    const result = this.data.entries.filter(item => {
      const text = item.text || "";
      const desc = item.desc || "";

      return (
        text.includes(key) ||
        desc.includes(key)
      );
    });

    this.setData({
      keyword: key,
      isSearching: true,
      searchGroups: this.formatEntries(result)
    });
  },

  // =====================
  // 审核
  // =====================
  goAudit() {
    if (
      this.data.role !== "admin" &&
      this.data.role !== "maintainer"
    ) {
      return;
    }

    wx.navigateTo({
      url: "/pages/admin/admin"
    });
  }
});