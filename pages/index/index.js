Page({
  data: {
    // =========================
    // 用户权限
    // =========================
    role: "visitor",
    isRegister: false,

    // =========================
    // 帮助
    // =========================
    showHelpModal:false,

    // =========================
    // 抽卡数据
    // =========================
    results: [],
    history: [],

    mode: "balanced",
    modeName: "营养均衡",
    modeBadge: "随机抽取3个分类，各抽1条",

    totalCount: 0,

    // =========================
    // 状态
    // =========================
    balls: [],
    showContent: false,
    isShaking: false,

    // =========================
    // 收藏
    // =========================
    favorites: [],
    showFavoritesModal: false
  },

  // =========================
  // 页面加载
  // =========================
  onLoad() {
    this.checkRole();
    this.showStartModal();
    this.syncEntriesFromCloud();
    this.loadFavorites();
    this.loadHistory();
  },

  // =========================
  // 欢迎弹窗
  // =========================
  showStartModal() {
    wx.showModal({
      title: "欢迎使用",
      content: "💡 扭蛋机提供简单的提示词辅助功能。\n\n" +
        "仅用于个人娱乐和灵感碰撞。\n\n" +
        "不代表鼓励或认同AI代替创作。\n\n" +
        "请同人创作者保持初心，享受创作过程。",
      confirmText: "进入",
      cancelText: "退出",
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
  // 帮助
  // =========================
  showHelp(){
    this.setData({
      showHelpModal:true
    });
  },
  
  closeHelp(){
    this.setData({
      showHelpModal:false
    });
  },
  
  // =========================
  // 登录
  // =========================
  goLogin() {
    wx.navigateTo({
      url: "/pages/login/login"
    });
  },

  // =========================
  // 词条中心
  // =========================
  goEntries() {
    wx.navigateTo({
      url: "/pages/entries/entries"
    });
  },

  // =========================
  // 初始化扭蛋球
  // =========================
  initBalls() {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#ffe66d",
      "#9b5de5",
      "#f15bb5"
    ];

    const balls = [];

    for (let i = 0; i < 20; i++) {
      balls.push({
        x: Math.random() * 90,
        y: Math.random() * 80,
        size: 20 + Math.random() * 30,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    this.setData({
      balls
    });
  },

  // =========================
  // 获取用户角色
  // =========================
  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "checkRole"
      });

      if (res.result && res.result.success) {
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
  // 云端词库同步
  //
  // 在线:
  // entries + user_entries
  //
  // 离线:
  // app.globalData.localEntries
  // =========================
  async syncEntriesFromCloud() {
    const app = getApp();

    if (!app.globalData.online) {
      console.log("离线模式，使用本地词库");
      this.setData({
        totalCount: app.globalData.localEntries ? app.globalData.localEntries.length : 0
      });
      return;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: "syncEntries"
      });

      if (res.result && res.result.success) {
        app.globalData.cloudEntries = res.result.data;
        this.setData({
          totalCount: res.result.data.length
        });
        console.log("云端词库加载:", res.result.data.length);
      }
    } catch (err) {
      console.log("云端词库加载失败", err);
      this.setData({
        totalCount: app.globalData.localEntries ? app.globalData.localEntries.length : 0
      });
    }
  },

  // =========================
  // 获取当前词库
  // =========================
  getEntries() {
    const app = getApp();

    if (app.globalData.online && Array.isArray(app.globalData.cloudEntries) && app.globalData.cloudEntries.length) {
      return app.globalData.cloudEntries;
    }

    return (app.globalData.localEntries || []);
  },

  // =========================
  // 抽卡逻辑
  //
  // random:
  // 全部词条随机3个
  //
  // balanced:
  // 六分类随机三个分类
  // 每类一个
  // =========================
  draw(mode) {
    const entries = this.getEntries();
    const pool = [...entries];
    const result = [];

    if (mode === "random") {
      while (result.length < 3 && pool.length) {
        const index = Math.floor(Math.random() * pool.length);
        result.push(pool.splice(index, 1)[0]);
      }
      return result;
    }

    const categories = [
      "world",
      "relationship",
      "character",
      "conflict",
      "scene",
      "theme"
    ];

    const selectedCategories = [];

    while (selectedCategories.length < 3) {
      const index = Math.floor(Math.random() * categories.length);
      const category = categories[index];
      if (!selectedCategories.includes(category)) {
        selectedCategories.push(category);
      }
    }

    selectedCategories.forEach(category => {
      const candidates = pool.filter(item => item.category === category);

      if (candidates.length) {
        const index = Math.floor(Math.random() * candidates.length);
        result.push(candidates[index]);
      }
    });

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
      title: "抽取成功",
      icon: "success"
    });
  }, 800);
},

spinRandom() {
  this.spin("random");
},

spinBalanced() {
  this.spin("balanced");
},

// =========================
// 历史记录
// 本地Storage
// =========================
saveHistory(results) {
  if (!results.length) return;

  let history = wx.getStorageSync("history") || [];
  const text = results.map(item => item.text).join(" + ");
  history.unshift(text);

  if (history.length > 110) {
    history = history.slice(0, 110);
  }

  wx.setStorageSync("history", history);

  this.setData({
    history: history.slice(0, 10)
  });
},

loadHistory() {
  const history = wx.getStorageSync("history") || [];
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
    title: "已清空当前词条",
    icon: "success"
  });
},

openHistory() {
  wx.navigateTo({
    url: "/pages/history/history"
  });
},

// =========================
// 提示词页面
// =========================
goToPrompt() {
  if (!this.data.results.length) {
    wx.showToast({
      title: "请先抽卡",
      icon: "none"
    });
    return;
  }

  wx.navigateTo({
    url: "/pages/prompt/prompt"
  });
},

// =========================
// 收藏
// =========================
loadFavorites() {
  const favorites = wx.getStorageSync("favorites") || [];
  this.setData({
    favorites
  });
},

saveFavorites() {
  wx.setStorageSync("favorites", this.data.favorites);
},

collectCurrent() {
  if (!this.data.results.length) {
    wx.showToast({
      title: "暂无词条",
      icon: "none"
    });
    return;
  }

  const text = this.data.results.map(item => item.text).join(" + ");
  let favorites = this.data.favorites;

  if (!favorites.includes(text)) {
    favorites.unshift(text);
    this.setData({
      favorites
    });
    this.saveFavorites();
    wx.showToast({
      title: "收藏成功",
      icon: "success"
    });
  } else {
    wx.showToast({
      title: "已收藏",
      icon: "none"
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
    url: "/pages/favorites/favorites"
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
// 管理后台
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
    title: "🎰 同人梗扭蛋机",
    path: "/pages/index/index"
  };
}
});