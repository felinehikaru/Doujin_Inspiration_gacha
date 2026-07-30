Page({
  data: {
    // 用户角色
    // visitor
    // user
    // admin
    // maintainer
    role: "visitor",

    // 页面状态
    showList: false,

    // 词条
    entries: [],
    displayEntries: [],

    keyword: "",

    // 投稿
    showUpload: false,

    uploadText: "",
    uploadDesc: "",
    uploadCategory: "",
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
  // 获取身份
  // =====================
  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "checkRole"
      });

      if (res.result.success) {
        this.setData({
          role: res.result.role
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  // =====================
  // 投稿入口
  // =====================
  openUpload() {
    if (this.data.role === "visitor") {
      wx.showModal({
        title: "需要登录",
        content: "为了减轻后台维护负担，请先登录注册后再投稿",
        confirmText: "去登录",
        success: (res) => {
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
    this.setData({
      uploadCategory: this.data.categoryOptions[e.detail.value].value
    });
  },

  // =====================
  // 提交投稿
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

    const res = await wx.cloud.callFunction({
      name: "submitEntry",
      data: {
        text: d.uploadText,
        desc: d.uploadDesc,
        category: d.uploadCategory,
        tags: d.uploadTags ? d.uploadTags.split(/[,，]/) : []
      }
    });

    if (res.result.success) {
      wx.showToast({
        title: "已提交审核",
        icon: "success"
      });
      this.closeUpload();
    } else {
      wx.showToast({
        title: res.result.message,
        icon: "none"
      });
    }
  },

  // =====================
  // 查看全部词条
  // 点击后加载
  // =====================
  async loadEntries() {
    const app = getApp();
  
    try {
      let list = [];
  
      // 优先使用首页同步后的云端词库
      if (app.globalData.cloudEntries && app.globalData.cloudEntries.length) {
        list = app.globalData.cloudEntries;
      } else {
        // 没同步则使用本地词库
        list = app.globalData.localEntries || [];
      }
  
      this.setData({
        showList: true,
        entries: list,
        displayEntries: list
      });
    } catch (e) {
      console.error("加载词条失败", e);
    }
  },

  // =====================
  // 搜索
  // =====================
  onSearch(e) {
    const key = e.detail.value;
    const list = this.data.entries.filter(item => {
      return (item.text.includes(key) || item.desc.includes(key));
    });

    this.setData({
      keyword: key,
      displayEntries: list
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
  }
});