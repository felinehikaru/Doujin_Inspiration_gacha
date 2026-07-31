Page({
  data: {
    role: "visitor",
    isRegister: false,

    showHelpModal: false,

    results: [],
    history: [],

    mode: "balanced",
    modeName: "营养均衡",
    modeBadge: "随机抽取3个分类，各抽1条",

    totalCount: 0,

    balls: [],
    showContent: false,
    isShaking: false,

    favorites: [],
    showFavoritesModal: false
  },

  onLoad() {
    this.showStartModal();
    this.loadHistory();
    this.initNetworkAndEntries();
    this.checkRole().then(()=>{
      this.loadFavorites();
    });
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
  //         网络检测
  // =========================
  async initNetworkAndEntries(){
    const app=getApp();
    if(app.globalData.online){ 
      console.log("在线模式");
      await this.syncEntriesFromCloud();
    }else{
      console.log("离线模式");

      const local =
        app.globalData.localEntries || [];
  
      this.setData({
        totalCount:local.length
      });
    }
  },

// =========================
// 云端词库同步
// entries + user_entries
// 在线使用
// =========================
async syncEntriesFromCloud() {
  const app = getApp();

  try {
    const res = await wx.cloud.callFunction({
      name: "syncEntries"
    });

    if (res.result && res.result.success) {
      const cloudEntries = res.result.data || [];
      const cloudVersion = res.result.version || 1;

      // 保存云端词库
      app.globalData.cloudEntries = cloudEntries;

      // =========================
      // 更新本地缓存
      //
      // 用于离线模式
      // =========================
      if (app.updateLocalEntries) {
        app.updateLocalEntries(cloudEntries, cloudVersion);
      }

      this.setData({
        totalCount: cloudEntries.length
      });

      console.log("云端词库加载:", cloudEntries.length, "版本:", cloudVersion);
    }
  } catch (err) {
    console.log("云端同步失败", err);

    // 清除失效云端数据
    app.globalData.cloudEntries = [];

    // 回退本地词库
    const local = app.globalData.localEntries || [];

    this.setData({
      totalCount: local.length
    });
  }
},

  // =========================
  // 获取当前词库
  //
  // 在线:
  // cloudEntries
  //
  // 离线:
  // localEntries
  // =========================
  getEntries() {
    const app = getApp();
  
    if (app.globalData.online && app.globalData.cloudEntries.length) {
      return app.globalData.cloudEntries;
    }
  
    return app.globalData.localEntries || [];
  },

  // =========================
  // 抽卡逻辑
  //
  // random:
  // 全部随机三个
  //
  // balanced:
  // 六分类随机三个分类
  // 每类一个
  // =========================
  draw(mode) {
    const entries = this.getEntries();
    const result = [];

    if (!entries.length) {
      return result;
    }

    if (mode === "random") {
      const pool = [...entries];

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

    const selected = [];

    while (selected.length < 3) {
      const index = Math.floor(Math.random() * categories.length);
      const category = categories[index];
      if (!selected.includes(category)) {
        selected.push(category);
      }
    }

    selected.forEach(category => {
      const list = entries.filter(item => item.category === category);

      if (list.length) {
        const index = Math.floor(Math.random() * list.length);
        result.push(list[index]);
      }
    });

    return result;
  },

  // =========================
  // 执行抽卡
  // =========================
  spin(mode) {
    if (this.data.isShaking) {
      return;
    }

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
// 扭蛋背景
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
// 用户权限
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
// 帮助
// =========================
showHelp() {
  this.setData({
    showHelpModal: true
  });
},

closeHelp() {
  this.setData({
    showHelpModal: false
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
// 历史记录
// 本地Storage
// =========================
saveHistory(results) {
  if (!results.length) {
    return;
  }

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
// 提示词
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
async loadFavorites() {
  // 登录用户读取云端
  if (this.data.role !== "visitor") {
    try {
      const res = await wx.cloud.callFunction({
        name: "getFavorites"
      });

      if (res.result && res.result.success) {
        this.setData({
          favorites: res.result.data || []
        });
        return;
      }
    } catch (err) {
      console.log("云端收藏读取失败", err);
    }
  }

  // 游客读取本地
  const favorites = wx.getStorageSync("favorites") || [];

  this.setData({
    favorites
  });
},

saveFavorites() {
  wx.setStorageSync("favorites", this.data.favorites);
},

async collectCurrent() {
  // =====================
  // 游客禁止收藏
  // =====================
  if (this.data.role === "visitor") {
    wx.showModal({
      title: "需要登录",
      content: "为减轻云端压力，收藏功能需要登录后使用，登录后收藏内容将保存至云端，更换设备也可以查看。",
      confirmText: "去登录",
      cancelText: "取消",

      success:res=>{
        if(res.confirm){
          wx.navigateTo({
            url:"/pages/login/login"
          });
        }
      }
     });
     return;
    }

  // =====================
  // 没有抽卡结果
  // =====================
  if (!this.data.results.length) {
    wx.showToast({
      title: "暂无词条",
      icon: "none"
    });
    return;
  }

  const text = this.data.results
    .map(item => item.text)
    .join(" + ");

  // =====================
  // 注册用户
  // 云端收藏
  // =====================
  try {
    const res = await wx.cloud.callFunction({
      name: "saveFavorite",
      data: {
        text: text,
        entries: this.data.results
      }
    });

    if (res.result && res.result.success) {
      wx.showToast({
        title: "收藏成功",
        icon: "success"
      });

      this.loadFavorites();
    } else {
      wx.showToast({
        title: res.result.message || "收藏失败",
        icon: "none"
      });
    }
  } catch (err) {
    console.log("收藏失败", err);
    wx.showToast({
      title: "收藏失败",
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
// 注册
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

        if (result.result && result.result.success) {
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