Page({
  data: {
    // =========================
    // 用户权限
    // =========================
    role: "visitor",

    // =========================
    // 词条列表
    // =========================
    allEntries: [],
    displayEntries: [],
    searchKeyword: "",
    filterType: "all",
    filteredEntriesCount: 0,

    // =========================
    // 投稿
    // =========================
    showUpload: false,
    uploadText: "",
    uploadDesc: "",
    uploadCategory: "",
    uploadTags: "",
    isUploading: false,

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

  // =========================
  // 页面加载
  // =========================
  onLoad() {
    this.checkRole();
    this.loadEntries();
  },

  // =========================
  // 权限检测
  // =========================
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
    } catch (err) {
      console.log("权限检测失败", err);
    }
  },

  // =========================
  // 加载词条
  //
  // 来源：
  // entries官方词库
  // user_entries用户词库
  //
  // 不读取pending_entries
  // =========================
  async loadEntries() {
    try {
      const res = await wx.cloud.callFunction({
        name: "syncEntries"
      });

      if (res.result.success) {
        const list = res.result.data;
        this.setData({
          allEntries: list,
          displayEntries: list,
          filteredEntriesCount: list.length
        });
      }
    } catch (err) {
      console.log("加载词条失败", err);
    }
  },

  // =========================
  // 搜索
  // =========================
  onSearchInput(e) {
    const keyword = e.detail.value;
    let list = this.data.allEntries;

    if (keyword) {
      list = list.filter(item => {
        return (item.text.includes(keyword) || item.desc.includes(keyword));
      });
    }

    this.setData({
      searchKeyword: keyword,
      displayEntries: list,
      filteredEntriesCount: list.length
    });
  },

  // =========================
  // 分类筛选
  // =========================
  setFilter(e) {
    const type = e.currentTarget.dataset.type;
    let list = this.data.allEntries;

    if (type !== "all") {
      list = list.filter(item => item.category === type);
    }

    this.setData({
      filterType: type,
      displayEntries: list,
      filteredEntriesCount: list.length
    });
  },

  // =========================
  // 打开投稿
  //
  // visitor禁止
  // =========================
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
      showUpload: true,
      uploadText: "",
      uploadDesc: "",
      uploadCategory: "",
      uploadTags: ""
    });
  },

  closeUpload() {
    this.setData({
      showUpload: false
    });
  },

  // =========================
  // 投稿输入
  // =========================
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
      uploadCategory: item.value
    });
  },

  // =========================
  // 提交投稿
  //
  // 写入：
  // pending_entries
  //
  // 等待审核
  // =========================
  async submitEntry() {
    const {
      uploadText,
      uploadDesc,
      uploadCategory,
      uploadTags
    } = this.data;

    if (!uploadText || !uploadDesc || !uploadCategory) {
      wx.showToast({
        title: "请填写完整",
        icon: "none"
      });
      return;
    }

    this.setData({
      isUploading: true
    });

    try {
      const res = await wx.cloud.callFunction({
        name: "submitEntry",
        data: {
          text: uploadText.trim(),
          desc: uploadDesc.trim(),
          category: uploadCategory,
          tags: uploadTags ? uploadTags.split(/[,，]/).map(i => i.trim()).filter(Boolean) : []
        }
      });

      if (res.result.success) {
        wx.showToast({
          title: "提交成功，等待审核",
          icon: "success"
        });
        this.closeUpload();
      } else {
        wx.showToast({
          title: res.result.message,
          icon: "none"
        });
      }
    } catch (err) {
      console.log("投稿失败", err);
    }

    this.setData({
      isUploading: false
    });
  },

  // =========================
// 管理员审核入口
//
// 只有：
// admin
// maintainer
//
// 可见
// =========================
goAdmin() {
  if (this.data.role !== "admin" && this.data.role !== "maintainer") {
    wx.showToast({
      title: "无审核权限",
      icon: "none"
    });
    return;
  }

  wx.navigateTo({
    url: "/pages/admin/admin"
  });
},

// =========================
// 返回首页
// =========================
goBack() {
  wx.navigateBack({
    delta: 1
  });
}
})