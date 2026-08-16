const app = getApp();
const localEntries = require("../../utils/entries.js");
const {
  getAchievementList
} = require("../../utils/achievements.js");

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
    showSharePanel: false,

    // 成就达成弹窗
    showAchievementModal: false,
    unlockedAchievement: null,

    // 自由模式
    showFreeMode: false,

    freeCategories: [{
        value: "world",
        title: "世界背景",
        checked: false
      },

      {
        value: "relationship",
        title: "关系设定",
        checked: false
      },

      {
        value: "character",
        title: "角色身份",
        checked: false
      },

      {
        value: "conflict",
        title: "冲突矛盾",
        checked: false
      },

      {
        value: "scene",
        title: "特殊场景",
        checked: false
      },

      {
        value: "theme",
        title: "主题氛围",
        checked: false
      }
    ]

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
  // 云端词库同步   根据版本决定是否更新本地缓存
  //
  // 在线:
  // 云端官方 entries
  // +
  // 云端用户 user_entries
  // =====================

// =====================
// 云端同步词库
// =====================
async syncEntriesFromCloud() {
  try {
    const res = await wx.cloud.callFunction({
      name: "syncEntries"
    });

    if (!res.result || !res.result.success) {
      console.log(
        "词库同步失败:",
        res.result?.message || "未知错误"
      );
      return;
    }

    // =====================
    // 兼容统一返回格式
    // =====================
    const data = res.result.data || res.result;

    const {
      officialEntries,
      userEntries,
      officialVersion,
      userVersion
    } = data;

    if (
      !Array.isArray(officialEntries) ||
      !Array.isArray(userEntries)
    ) {
      console.log(
        "同步数据格式错误"
      );
      return;
    }

    // =====================
    // 更新全局缓存
    // =====================
    const app = getApp();

    app.updateLocalEntries({
      officialEntries: officialEntries,
      userEntries: userEntries,
      officialVersion: officialVersion,
      userVersion: userVersion
    });

    // =====================
    // 更新页面数据
    // =====================
    this.setData({
      totalCount:
        officialEntries.length +
        userEntries.length
    });

    console.log(
      "词库同步完成",
      "官方:",
      officialEntries.length,
      "用户:",
      userEntries.length
    );

  } catch (err) {
    console.error(
      "同步词库失败:",
      err
    );
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
  
    // 优先使用云同步后的缓存
    official =
      app.globalData.localOfficialEntries ||
      app.globalData.cloudOfficialEntries ||
      [];
  
    user =
      app.globalData.localUserEntries ||
      app.globalData.cloudUserEntries ||
      [];
  
    const entries = [
      ...official,
      ...user
    ];
  
    console.log(
      "当前抽卡词库:",
      entries.length,
      "官方:",
      official.length,
      "用户:",
      user.length
    );
  
    return entries;
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
  // 展开自由模式
  // =====================

  openFreeMode() {
    this.setData({
      showFreeMode: true
    });
  },

  // 关闭窗口
  closeFreeMode() {
    this.setData({
      showFreeMode: false
    });
  },

  // =====================
  // 自由模式选择分类
  // =====================

  changeFreeCategory(e) {
    const index = e.currentTarget.dataset.index;

    const list = this.data.freeCategories.map((item, i) => {
      if (i === index) {
        return {
          value: item.value,
          title: item.title,
          checked: !item.checked
        };
      }

      return item;
    });

    this.setData({
      freeCategories: list
    });
  },

  // =====================
  // 自由模式抽卡
  // =====================

  spinFree() {
    const entries = this.getEntries();

    // 获取用户选择的分类
    const selectedCategories = this.data.freeCategories
      .filter(item => item.checked)
      .map(item => item.value);

    if (!selectedCategories.length) {
      wx.showToast({
        title: "请至少选择一个分类",
        icon: "none"
      });

      return;
    }

    const result = [];

    selectedCategories.forEach(category => {
      const pool = entries.filter(item => item.category === category);

      if (pool.length) {
        const index = Math.floor(Math.random() * pool.length);

        result.push(pool[index]);
      }
    });

    if (!result.length) {
      wx.showToast({
        title: "没有找到对应词条",
        icon: "none"
      });

      return;
    }

    // 关闭弹窗
    this.setData({
      showFreeMode: false
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
      this.checkAchievements(result);
    }, 800);
  },
  async checkAchievements(result) {
    if (this.data.role === "visitor") {
      return;
    }

    try {
      const res = await wx.cloud.callFunction({
        name: "achievements",
        data: {
          action: "recordDraw",
          entryCount: result.length
        }
      });
      const data = res.result && res.result.data;
      const unlockedIds = data && data.newlyUnlocked || [];

      if (unlockedIds.length) {
        const achievement = getAchievementList(data).find(item => item.id === unlockedIds[0]);
        this.setData({
          showAchievementModal: true,
          unlockedAchievement: achievement
        });
      }
    } catch (err) {
      console.log("成就进度同步失败", err);
    }
  },
  closeAchievementModal() {
    this.setData({
      showAchievementModal: false,
      unlockedAchievement: null
    });
  },

  noop() {},

  openAchievements() {
    if (this.data.role === "visitor") {
      wx.showModal({
        content: "用户功能，请登录",
        confirmText: "去登录",
        success: res => {
          if (res.confirm) {
            this.goLogin();
          }
        }
      });
      return;
    }

    wx.navigateTo({
      url: "/pages/achievements/achievements"
    });
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

    // 三个词条文本
    const text = this.data.results
      .map(item => item.text)
      .join(" + ");

    // 三个完整词条
    const entries = this.data.results;

    // 游客本地收藏
    
if (this.data.role === "visitor") {
  let favorites = wx.getStorageSync("favorites") || [];

  // =====================
  // 防止重复收藏
  // =====================
  const exist = favorites.some(item => item.text === text);

  if (exist) {
    wx.showToast({
      title: "已经收藏过了",
      icon: "none"
    });
    return;
  }

  favorites.unshift({
    text: text,
    entries: entries,
    createTime: Date.now()
  });

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
      url: "/pages/prompt/prompt"
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
    let title = "灵感扭蛋机";
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
      `灵感扭蛋机

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
  // Canvas 图片分享
  // =====================

  createShareImage() {

    const query = wx.createSelectorQuery();

    query.select("#shareCanvas")
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");


        const width = 750;
        const height = 1100;

        canvas.width = width;
        canvas.height = height;

        // =====================
        // 背景
        // =====================
        let bg = ctx.createLinearGradient(0, 0, 0, height);

        bg.addColorStop(0, "#181225");
        bg.addColorStop(1, "#050505");

        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        // =====================
        // 标题
        // =====================
        ctx.textAlign = "center";

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 56px sans-serif";
        ctx.fillText("灵感扭蛋机", width / 2, 100);

        ctx.font = "32px sans-serif";
        ctx.fillStyle = "#c8a6ff";
        ctx.fillText("我的灵感组合", width / 2, 160);

        // =====================
        // 分类转换
        // =====================
        const categoryName = {
          world: "世界背景",
          relationship: "关系设定",
          character: "角色身份",
          conflict: "冲突矛盾",
          scene: "特殊场景",
          theme: "主题氛围"
        };

        let y = 240;

        // =====================
        // 三个词条卡片
        // =====================
        this.data.results.forEach((item, index) => {
          // 卡片背景
          ctx.fillStyle = "#272038";

          ctx.beginPath();
          ctx.roundRect(50, y, 650, 220, 25);
          ctx.fill();

          // 编号
          ctx.fillStyle = "#d8b4fe";
          ctx.font = "bold 36px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText("灵感 " + (index + 1), 80, y + 50);

          // 标题
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 38px sans-serif";
          ctx.fillText(item.text, 80, y + 100);

          // 分类
          ctx.fillStyle = "#e9a8c7";
          ctx.font = "26px sans-serif";
          ctx.fillText("分类：" + categoryName[item.category], 80, y + 140);

          // 描述
          ctx.fillStyle = "#cccccc";
          ctx.font = "24px sans-serif";
          ctx.fillText(item.desc || "", 80, y + 175);

          // 标签
          ctx.fillStyle = "#bda8ff";
          ctx.font = "22px sans-serif";

          if (item.tags) {
            ctx.fillText("#" + item.tags.join(" #"), 80, y + 205);
          }

          y += 250;
        });

        // =====================
        // 底部文字
        // =====================

        ctx.textAlign = "center";
        ctx.fillStyle = "#aaa";
        ctx.font = "24px sans-serif";
        ctx.fillText("摇出你的故事灵感", width / 2, 1060);

        // =====================
        // 导出临时图片
        // =====================
        wx.canvasToTempFilePath({
          canvas: canvas,

          success(res) {
            console.log("图片生成成功:", res.tempFilePath);

            // 保存到相册
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,

              success() {
                wx.showToast({
                  title: "图片已保存",
                  icon: "success"
                });
              },

              fail(err) {
                console.log("保存相册失败:", err);

                // 请求权限
                wx.authorize({
                  scope: "scope.writePhotosAlbum",

                  success() {
                    wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,

                      success() {
                        wx.showToast({
                          title: "图片已保存",
                          icon: "success"
                        });
                      }
                    });
                  },

                  fail() {
                    wx.showToast({
                      title: "请开启保存权限",
                      icon: "none"
                    });
                  }
                });
              }
            });
          },

          fail(err) {
            console.log("生成图片失败:", err);

            wx.showToast({
              title: "生成图片失败",
              icon: "none"
            });
          }
        });
      });

  }

  // 关闭 Page
});