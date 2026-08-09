const app = getApp();
const localEntries = require("../../utils/entries.js");

Page({
  data: {
    // 用户状态
    role: "visitor",
    isRegister: false,

    // 抽卡结果
    results: [],
    history: [],


    // 词库数量
    totalCount: localEntries.length,

    // 扭蛋动画
    balls: [],
    isShaking: false,

    // 帮助
    showHelpModal: false,

    // 收藏
    favorites: [],

    //分享
    showSharePanel:false
  },

  onLoad() {
    this.checkRole();
    this.loadHistory();
    this.initBalls();
    this.syncEntriesFromCloud();
  },

  // =====================
  // 登录身份检测
  // =====================
  async checkRole() {
    try {
      const res = await wx.cloud.callFunction({
        name: "checkRole"
      });

      if (res.result && res.result.success) {
        this.setData({
          role: res.result.role || "visitor",
          isRegister: res.result.isRegister || false
        });

        if (app.updateUserStatus) {
          app.updateUserStatus(res.result);
        }
      }
    } catch (err) {
      console.log("身份检测失败", err);
    }
  },

  // =====================
  // 登录入口
  // =====================
  goLogin() {
    wx.navigateTo({
      url: "/pages/login/login"
    });
  },

  // =====================
  // 词条中心
  // =====================
  openEntries() {
    wx.navigateTo({
      url: "/pages/entries/entries"
    });
  },

// =====================
// 云端词库同步
//
// 在线:
// 云端官方 entries
// +
// 云端用户 user_entries
//
// 分别缓存
// =====================

async syncEntriesFromCloud() {
  if (!app.globalData.online) {
    console.log("离线模式，不同步词库");

    return;
  }

  try {
    const res = await wx.cloud.callFunction({
      name: "syncEntries"
    });

    if (res.result && res.result.success) {
      const official = res.result.officialEntries || [];
      const user = res.result.userEntries || [];

      // =====================
      // 保存在线词库
      // =====================
      app.globalData.cloudOfficialEntries = official;
      app.globalData.cloudUserEntries = user;

      // =====================
      // 更新离线缓存
      // =====================
      wx.setStorageSync("localOfficialEntries", official);
      wx.setStorageSync("localUserEntries", user);

      app.globalData.localOfficialEntries = official;
      app.globalData.localUserEntries = user;

      if (res.result.version !== undefined) {
        wx.setStorageSync("entryVersion", res.result.version);
        app.globalData.entryVersion = res.result.version;
      }

      this.setData({
        totalCount: official.length + user.length
      });

      console.log("官方词库:", official.length);
      console.log("用户词库:", user.length);
      console.log("总词条:", official.length + user.length);
    }
  } catch (err) {
    console.log("词库同步失败", err);
  }
},

// =====================
// 获取抽卡词库
//
// 在线:
// cloudOfficialEntries
// +
// cloudUserEntries
//
// 离线:
// localOfficialEntries
// +
// localUserEntries
// =====================

getEntries() {
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

  return [...official, ...user];
},

  // =====================
  // 初始化扭蛋
  // =====================
  initBalls() {
    const balls = [];

    for (let i = 0; i < 12; i++) {
      balls.push({
        id: i,
        left: Math.random() * 80,
        top: Math.random() * 60,
        size: 50 + Math.random() * 30
      });
    }

    this.setData({
      balls
    });
  },

  // =====================
  // 抽卡
  // =====================
  draw() {
    if (this.data.mode === "balanced") {
      this.spinBalanced();
    } else {
      this.spinRandom();
    }
  },

  // =====================
  // 随机抽卡
  // =====================
  spinRandom() {
    const entries = this.getEntries();

    if (!entries.length) {
      return;
    }

    const pool = [...entries];
    const result = [];

    while (result.length < 3 && pool.length) {
      const index = Math.floor(Math.random() * pool.length);

      result.push(pool.splice(index, 1)[0]);
    }

    this.showResult(result);
  },

  // =====================
  // 平衡抽卡
  // 六分类抽3类
  // =====================
  spinBalanced() {
    const entries = this.getEntries();
    const categories = [
      "world",
      "relationship",
      "character",
      "conflict",
      "scene",
      "theme"
    ];

    const categoryPool = [...categories];
    const selected = [];

    while (selected.length < 3 && categoryPool.length) {
      const index = Math.floor(Math.random() * categoryPool.length);

      selected.push(categoryPool.splice(index, 1)[0]);
    }

    const result = [];

    selected.forEach(category => {
      const pool = entries.filter(item => item.category === category);

      if (pool.length) {
        result.push(pool[Math.floor(Math.random() * pool.length)]);
      }
    });

    this.showResult(result);
  },

  // =====================
  // 显示结果
  // =====================
  showResult(result) {
    this.setData({
      isShaking: true
    });

    setTimeout(() => {
      this.setData({
        isShaking: false,
        results: result
      });

      app.globalData.currentResults = result;

      this.saveHistory(result);
    }, 800);
  },

  // =====================
  // 历史记录
  // =====================
  saveHistory(result) {
    if (!Array.isArray(result) || !result.length) {
      return;
    }

    const text = result.map(item => item.text).join(" + ");

    let history = wx.getStorageSync("history") || [];

    history.unshift({
      text: text,
      time: Date.now()
    });

    if (history.length > 50) {
      history = history.slice(0, 50);
    }

    wx.setStorageSync("history", history);

    this.setData({
      history
    });
  },

  loadHistory() {
    const history = wx.getStorageSync("history") || [];

    this.setData({
      history
    });
  },

  openHistory() {
    wx.navigateTo({
      url: "/pages/history/history"
    });
  },

  // =====================
  // 当前结果清除
  // =====================
  clearCurrentResult() {
    this.setData({
      results: []
    });

    app.globalData.currentResults = [];
  },

  // =====================
  // 收藏
  // =====================
  async collectCurrent() {
    if (!this.data.results.length) {
      return;
    }

    const text = this.data.results.map(item => item.text).join(" + ");
    const entries = this.data.results;

    // 游客本地收藏
    if (this.data.role === "visitor") {
      let favorites = wx.getStorageSync("favorites") || [];

      favorites.unshift({
        text: text,
        entries: entries,
        createTime: Date.now()
      });

      // 收藏数量限制30
      if (favorites.length > 30) {
        favorites = favorites.slice(0, 30);
      }

      wx.setStorageSync("favorites", favorites);

      wx.showToast({
        title: "已保存到本地",
        icon: "success"
      });

      return;
    }

    // 登录用户云收藏
    try {
      const res = await wx.cloud.callFunction({
        name: "favorite",
        data: {
          action: "add",
          text: text,
          entries: entries
        }
      });

      if (res.result && res.result.success) {
        wx.showToast({
          title: "收藏成功",
          icon: "success"
        });
      } else {
        wx.showToast({
          title: res.result.message || "收藏失败",
          icon: "none"
        });
      }
    } catch (err) {
      console.log("收藏失败", err);
    }
  },

  openFavorites() {
    wx.navigateTo({
      url: "/pages/favorites/favorites"
    });
  },

  loadFavorites() {
    const favorites = wx.getStorageSync("favorites") || [];
  
    this.setData({
      favorites
    });
  },

  // 兼容旧WXML
  showFavorites() {
    this.openFavorites();
  },

  // =====================
  // 提示词
  // =====================
  goToPrompt() {

    wx.navigateTo({
      url:"/pages/prompt/prompt"
    });
  
  },

  // =====================
  // 分享复制
  // =====================
  copyCurrentResult() {
    if (!this.data.results.length) {
      return;
    }

    const text = this.data.results.map(item => item.text).join(" + ");

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

  // =====================
  // 分享
  // =====================
  onShareAppMessage() {
    let title = "🎲 同人梗扭蛋机";
    let path = "/pages/index/index";
  
    if (this.data.results.length) {
      title = "我摇到了：" + this.data.results
        .map(item => item.text)
        .join("、");
    }
  
    return {
      title: title,
      path: path
    };
  },

  openSharePanel() {
    this.setData({
      showSharePanel: true
    });
  },
  
  closeSharePanel() {
    this.setData({
      showSharePanel: false
    });
  },

  // =====================
// 复制文字分享
// =====================
copyShareText() {
  if (!this.data.results.length) {
    wx.showToast({
      title: "没有抽卡结果",
      icon: "none"
    });

    return;
  }

  const text = this.data.results
    .map((item, index) => {
      return (
        `灵感词${index + 1}：
${item.text}

分类：
${item.category}

描述：
${item.desc}

标签：
${item.tags.join("、")}`
      );
    })
    .join("\n\n");

  const shareText =
    `🎲 同人梗扭蛋机

我抽到的灵感：

${text}

快来一起摇一个吧！`;

  wx.setClipboardData({
    data: shareText,

    success() {
      wx.showToast({
        title: "分享文字已复制",
        icon: "success"
      });
    }
  });
},

  // =====================
  // 帮助
  // =====================
  openHelp() {
    this.setData({
      showHelpModal: true
    });
  },

  closeHelp() {
    this.setData({
      showHelpModal: false
    });
  }
});