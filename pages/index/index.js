const localEntries = require('../../utils/entries.js');

Page({

  data: {
    // =========================
    // 用户权限
    // visitor / user / admin / maintainer
    // =========================
    role: "visitor",
    isRegister: false,

    // =========================
    // 抽卡结果
    // =========================
    results: [],
    history: [],
    mode: 'balanced',
    modeName: '营养均衡',
    modeBadge: '随机抽取3个分类，各抽1条',
    totalCount: localEntries.length,

    // =========================
    // 页面动画
    // =========================
    balls: [],
    showContent: false,
    isShaking: false,

    // =========================
    // 词库查看
    // =========================
    showEntriesModal: false,
    allEntries: [],
    displayEntries: [],
    searchKeyword: '',
    filterType: 'all',
    filteredEntriesCount: 0,

    // =========================
    // 收藏
    // =========================
    favorites: [],
    showFavoritesModal: false,

    // =========================
    // 用户投稿
    // =========================
    showUploadModal: false,
    uploadText: '',
    uploadDesc: '',
    uploadCategory: '',
    uploadTags: '',
    isUploading: false,

    categoryOptions: [
      {
        value: 'world',
        label: '世界背景'
      },
      {
        value: 'relationship',
        label: '关系设定'
      },
      {
        value: 'character',
        label: '角色身份'
      },
      {
        value: 'conflict',
        label: '冲突矛盾'
      },
      {
        value: 'scene',
        label: '特殊场景'
      },
      {
        value: 'theme',
        label: '主题氛围'
      }
    ]
  },

  // =========================
  // 页面加载
  // =========================
  
  onLoad() {
    this.checkRole();
    this.showStartModal();
    // 云端同步接口保留
    // 后续改造成版本检测
    this.syncEntriesFromCloud();
    this.loadFavorites();
    this.loadHistory();
  },

  // =========================
  // 欢迎弹窗
  // =========================
  showStartModal() {
    wx.showModal({
      title: '欢迎使用',

      content:
        '💡 扭蛋机提供简单的提示词辅助功能。\n\n' +
        '仅用于个人娱乐和灵感碰撞。\n\n' +
        '不代表鼓励或认同AI代替创作。\n\n' +
        '请同人创作者保持初心，享受创作过程。',

      confirmText: '进入',
      cancelText: '退出',
      success: res => {
        if (res.confirm) {
          this.setData({
            showContent: true
          });
          this.initBalls();
        } else {
          wx.exitMiniProgram();
        }
      }
    });
  },

  // =========================
  // 登录注册
  // =========================
  goLogin(){
    wx.navigateTo({
     url:
     "/pages/login/login"
    });
   },


  // =========================
  // 背景扭蛋动画
  // =========================

  initBalls() {
    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#ffe66d',
      '#9b5de5',
      '#f15bb5'
    ];
    const balls = [];

    for (let i = 0; i < 20; i++) {
      balls.push({
        x: Math.random() * 90,
        y: Math.random() * 80,
        size: 20 + Math.random() * 30,
        color:
          colors[
            Math.floor(
              Math.random() * colors.length
            )
          ]
      });
    }

    this.setData({
      balls
    });
  },

  // =========================
  // 用户权限检测
  // =========================

  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "checkRole"
      });
  
      if (res.result.success) {
        console.log("当前角色:", res.result.role);
        this.setData({
          role: res.result.role,
          isRegister: res.result.role !== "visitor"
        });
      }
    } catch (err) {
      console.log("身份检测失败", err);
    }
  },

  // =========================
  // 词库同步入口
  //
  // 当前：
  // 云端获取
  //
  // 后续：
  // 改造成版本检查
  // 不直接覆盖本地词库
  // =========================

  async syncEntriesFromCloud() {
    if (!wx.cloud) return;
    try {
      const res =
        await wx.cloud.callFunction({
          name: 'syncEntries'
        });
      if (
        res.result &&
        res.result.success &&
        res.result.data.length
      ) {
        const app = getApp();
        if (!app.globalData) {
          app.globalData = {};
        }
        app.globalData.cloudEntries =
          res.result.data;
      }

    } catch (e) {
      console.warn(
        '云端同步失败',
        e
      );
    }
  },

  // =========================
  // 本地词库读取
  //
  // 优先：
  // 1. 云端更新后的本地缓存
  // 2. 内置 entries.js
  //
  // 后续接入版本更新
  // =========================

  getLocalEntries() {
    const cache =
      wx.getStorageSync(
        "officialEntries"
      );

    if (
      Array.isArray(cache) &&
      cache.length
    ) {
      return cache;
    }

    return localEntries;
  },

  // =========================
  // 抽卡使用词库入口
  // =========================

  getEntries() {

    const entries =
      this.getLocalEntries();
    return Array.isArray(entries)
      ? entries
      : [];
  },

  // =========================
// 抽卡核心逻辑
//
// random:
// 完全随机抽取3条
//
// balanced:
// 当前版本：
// 随机三个分类各抽一条
//
// 后续：
// 改为固定六分类
// world
// relationship
// character
// conflict
// scene
// theme
// =========================
draw(mode) {
  const entries = this.getEntries();
  let pool = [...entries];
  const result = [];

  if (mode === 'random') {
    while (result.length < 3 && pool.length) {
      const index = Math.floor(Math.random() * pool.length);
      result.push(pool.splice(index, 1)[0]);
    }
  } else {
    const categories = [...new Set(pool.map(item => item.category))];

    while (result.length < 3 && categories.length) {
      const typeIndex = Math.floor(Math.random() * categories.length);
      const category = categories.splice(typeIndex, 1)[0];
      const candidates = pool.filter(item => item.category === category);

      if (candidates.length) {
        const index = Math.floor(Math.random() * candidates.length);
        const item = candidates[index];
        result.push(item);
        pool = pool.filter(i => i !== item);
      }
    }
  }

  return result;
},

// =========================
// 执行抽卡
// =========================
spin(mode) {
  if (this.data.isShaking) return;

  this.setData({
    results: [],
    isShaking: true
  });

  setTimeout(() => {
    const results = this.draw(mode);

    this.setData({
      results,
      isShaking: false
    });

    this.saveHistory(results);

    const app = getApp();
    if (!app.globalData) {
      app.globalData = {};
    }
    app.globalData.currentResults = results;

    wx.showToast({
      title: '抽取成功',
      icon: 'success'
    });
  }, 800);
},

spinRandom() {
  this.spin('random');
},

spinBalanced() {
  this.spin('balanced');
},

// =========================
// 历史记录
//
// 当前：
// 本地Storage保存
//
// 后续保持本地设计
// =========================
saveHistory(results) {
  if (!results.length) return;

  let history = wx.getStorageSync('history') || [];
  const text = results.map(item => item.text).join(' + ');
  history.unshift(text);

  if (history.length > 110) {
    history = history.slice(0, 110);
  }

  wx.setStorageSync('history', history);
  this.setData({
    history: history.slice(0, 10)
  });
},

loadHistory() {
  const history = wx.getStorageSync('history') || [];
  this.setData({
    history: history.slice(0, 10)
  });
},

clearCurrentResult() {
  this.setData({
    results: []
  });

  const app = getApp();
  if (app.globalData) {
    app.globalData.currentResults = [];
  }

  wx.showToast({
    title: '已清空当前词条',
    icon: 'success'
  });
},

openHistory() {
  wx.navigateTo({
    url: '/pages/history/history'
  });
},

// =========================
// 查看全部词库
// =========================
showEntriesList() {
  const entries = this.getEntries();
  this.setData({
    showEntriesModal: true,
    allEntries: entries,
    displayEntries: entries,
    filteredEntriesCount: entries.length
  });
},

closeEntriesModal() {
  this.setData({
    showEntriesModal: false
  });
},

// =========================
// 词库搜索
// =========================
onSearchInput(e) {
  const keyword = e.detail.value;
  const list = this.data.allEntries.filter(
    item => item.text.includes(keyword) || item.desc.includes(keyword)
  );

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

  if (type !== 'all') {
    list = list.filter(item => item.category === type);
  }

  this.setData({
    filterType: type,
    displayEntries: list,
    filteredEntriesCount: list.length
  });
},

// =========================
// 提示词页面
// =========================
goToPrompt() {
  if (!this.data.results.length) {
    wx.showToast({
      title: '请先抽卡',
      icon: 'none'
    });
    return;
  }

  wx.navigateTo({
    url: '/pages/prompt/prompt'
  });
},

// =========================
// 收藏功能
//
// 当前：
// 本地Storage保存
//
// 后续：
// 登录用户接入favorites集合
// =========================
loadFavorites() {
  const favorites = wx.getStorageSync('favorites') || [];
  this.setData({
    favorites
  });
},

saveFavorites() {
  wx.setStorageSync('favorites', this.data.favorites);
},

collectCurrent() {
  if (!this.data.results.length) {
    wx.showToast({
      title: '暂无词条',
      icon: 'none'
    });
    return;
  }

  const text = this.data.results.map(item => item.text).join(' + ');
  const favorites = this.data.favorites;

  if (!favorites.includes(text)) {
    favorites.unshift(text);
    this.setData({
      favorites
    });
    this.saveFavorites();
    wx.showToast({
      title: '收藏成功',
      icon: 'success'
    });
  } else {
    wx.showToast({
      title: '已收藏',
      icon: 'none'
    });
  }
},

showFavorites() {
  this.setData({
    showFavoritesModal: true
  });
},

closeFavoritesModal() {
  this.setData({
    showFavoritesModal: false
  });
},

goFavorites() {
  wx.navigateTo({
    url: '/pages/favorites/favorites'
  });
},

// =========================
// 用户投稿
//
// 提交到 user_entries
// 等待审核
// =========================
showUploadModal() {
  if (this.data.role === "visitor") {
    wx.showModal({
      title: "需要登录",
      content: "注册后才可以提交用户词条",
      confirmText: "去登录",
      success: (res) => {
        if (res.confirm) {
          this.goLogin();
        }
      }
    });
    return;
  }

  this.setData({
    showUploadModal: true,
    uploadText: '',
    uploadDesc: '',
    uploadCategory: '',
    uploadTags: ''
  });
},

closeUploadModal() {
  this.setData({
    showUploadModal: false
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

onCategoryChange(e) {
  const category = this.data.categoryOptions[e.detail.value];
  this.setData({
    uploadCategory: category.value
  });
},

onTagsInput(e) {
  this.setData({
    uploadTags: e.detail.value
  });
},

async submitEntry() {
  const {
    uploadText,
    uploadDesc,
    uploadCategory,
    uploadTags
  } = this.data;

  if (!uploadText.trim() || !uploadDesc.trim() || !uploadCategory) {
    wx.showToast({
      title: '请填写完整信息',
      icon: 'none'
    });
    return;
  }

  this.setData({
    isUploading: true
  });

  try {
    const res = await wx.cloud.callFunction({
      name: 'submitEntry',
      data: {
        text: uploadText.trim(),
        desc: uploadDesc.trim(),
        category: uploadCategory,
        tags: uploadTags ? uploadTags.split(/[,，]/).map(i => i.trim()).filter(Boolean) : []
      }
    });

    if (res.result.success) {
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      this.closeUploadModal();
    } else {
      wx.showToast({
        title: res.result.message || '提交失败',
        icon: 'none'
      });
    }
  } catch (err) {
    console.warn('投稿失败', err);
    wx.showToast({
      title: '提交失败',
      icon: 'none'
    });
  }

  this.setData({
    isUploading: false
  });
},

// =========================
// 注册用户
// =========================
async registerUser() {
  wx.showModal({
    title: "注册说明",
    content: "为减轻云空间和维护压力，游客可使用基础功能，免费注册后可使用全部功能",
    confirmText: "注册",
    success: async res => {
      if (res.confirm) {
        const result = await wx.cloud.callFunction({
          name: "registerUser"
        });
        if (result.result.success) {
          wx.showToast({
            title: "注册成功",
            icon: "success"
          });
          this.checkRole();
        }
      }
    }
  });
},

// =========================
// 管理入口
// maintainer/admin使用
// =========================
goAdmin() {
  wx.navigateTo({
    url: "/pages/admin/admin"
  });
},

// =========================
// 分享
// =========================
onShareAppMessage() {
  return {
    title: '🎰 同人梗扭蛋机',
    path: '/pages/index/index'
  };
}

});