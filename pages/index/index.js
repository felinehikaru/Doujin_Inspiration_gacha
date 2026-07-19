const localEntries = require('../../utils/entries.js');

Page({
  data: {
    results: [],
    history: [],
    mode: 'balanced',
    modeName: '营养均衡',
    modeBadge: '随机抽取3个分类，各抽1条',
    totalCount: localEntries.length,
    balls: [],
    showContent: false,
    isShaking: false,
    showHelpModal: false,
    showEntriesModal: false,
    allEntries: [],
    searchKeyword: '',
    filterType: 'all',
    displayEntries: [],
    filteredEntriesCount: 0,
    favorites: [],
    showFavoritesModal: false,
    showUploadModal: false,
    uploadText: '',
    uploadDesc: '',
    uploadCategory: '',
    uploadTags: '',
    isUploading: false,
    categoryOptions: [{
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

  goAdmin(){
    wx.navigateTo({
      url:"/pages/admin/admin"
    })
  },

  onLoad() {
    this.showStartModal();
    this.syncEntriesFromCloud();
    this.loadFavorites();
    this.loadHistory();
  },

  showStartModal() {
    wx.showModal({
      title: '欢迎使用',
      content: '💡 扭蛋机提供简单的提示词辅助功能。\n\n仅用于个人娱乐和灵感碰撞。\n\n不代表鼓励或认同AI代替创作。\n\n请同人创作者保持初心，享受创作过程。',
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

  initBalls() {
    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#ffe66d',
      '#9b5de5',
      '#f15bb5'
    ];

    let balls = [];

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

  async syncEntriesFromCloud() {
    if (!wx.cloud) return;
    try {
      const res = await wx.cloud.callFunction({
        name: 'syncEntries'
      });
      if (res.result && res.result.success && res.result.data.length) {
        const app = getApp();
        if (!app.globalData) {
          app.globalData = {};
        }
        app.globalData.cloudEntries = res.result.data;
        this.setData({
          totalCount: res.result.data.length
        });
      }

    } catch (e) {
      console.warn(
        '云端同步失败',
        e
      );
    }
  },

  getEntries() {
    const app = getApp();
    const cloudEntries =
      app.globalData && app.globalData.cloudEntries ?
      app.globalData.cloudEntries : [];
    return cloudEntries.length ?
      cloudEntries :
      localEntries;
  },

  draw(mode) {
    const entries = this.getEntries();
    let pool = [...entries];
    let result = [];
    if (mode === 'random') {
      while (result.length < 3 && pool.length) {
        const index = Math.floor(
          Math.random() * pool.length
        );
        result.push(
          pool.splice(index, 1)[0]
        );
      }

    } else {
      const categories = [
        ...new Set(
          pool.map(
            item => item.category
          )
        )
      ];

      while (result.length < 3 && categories.length) {
        const typeIndex = Math.floor(
          Math.random() * categories.length
        );
        const category =
          categories.splice(typeIndex, 1)[0];
        const candidates =
          pool.filter(
            item => item.category === category
          );
        if (candidates.length) {
          const index = Math.floor(
            Math.random() * candidates.length
          );
          const item = candidates[index];
          result.push(item);
          pool = pool.filter(
            i => i !== item
          );
        }
      }
    }

    return result;

  },

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

  saveHistory(results) {
    if (!results.length) return;
    let history =
      wx.getStorageSync('history') || [];

    const text = results.map(
      item => item.text
    ).join(' + ');

    history.unshift(text);

    if (history.length > 110) {
      history = history.slice(0, 110);
    }

    wx.setStorageSync(
      'history',
      history
    );

    this.setData({
      history: history.slice(0, 10)
    });

  },

  loadHistory() {

    const history =
      wx.getStorageSync('history') || [];

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
  onSearchInput(e) {
    const keyword = e.detail.value;
    const list = this.data.allEntries.filter(
      item => {
        return item.text.includes(keyword) ||
          item.desc.includes(keyword);
      }
    );

    this.setData({
      searchKeyword: keyword,
      displayEntries: list,
      filteredEntriesCount: list.length
    });
  },

  setFilter(e) {

    const type = e.currentTarget.dataset.type;

    let list = this.data.allEntries;

    if (type !== 'all') {

      list = list.filter(
        item => item.category === type
      );

    }

    this.setData({

      filterType: type,

      displayEntries: list,

      filteredEntriesCount: list.length

    });

  },

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

  loadFavorites() {

    const favorites =
      wx.getStorageSync('favorites') || [];

    this.setData({
      favorites
    });

  },

  saveFavorites() {

    wx.setStorageSync(
      'favorites',
      this.data.favorites
    );

  },

  collectCurrent(){

    if(!this.data.results.length){
      wx.showToast({
        title:'暂无词条',
        icon:'none'
      });
      return;
    }
  
    const text=this.data.results.map(
      item=>item.text
    ).join(' + ');
  
    const favorites=this.data.favorites;
  
    if(!favorites.includes(text)){
  
      favorites.unshift(text);
  
      this.setData({
        favorites
      });
  
      this.saveFavorites();
  
      wx.showToast({
        title:'收藏成功',
        icon:'success'
      });
  
    }else{
  
      wx.showToast({
        title:'已收藏',
        icon:'none'
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

  showUploadModal() {

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

    const category =
      this.data.categoryOptions[e.detail.value];

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

    if (
      !uploadText.trim() ||
      !uploadDesc.trim() ||
      !uploadCategory
    ) {

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
          tags: uploadTags ?
            uploadTags
            .split(/[,，]/)
            .map(i => i.trim())
            .filter(Boolean) : []
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

      console.warn(
        '提交失败',
        err
      );

      wx.showToast({
        title: '提交失败',
        icon: 'none'
      });

    }

    this.setData({
      isUploading: false
    });

  },

  onShareAppMessage() {

    return {
      title: '🎰 同人梗扭蛋机',
      path: '/pages/index/index'
    };

  },

  goFavorites() {

    wx.navigateTo({
      url: '/pages/favorites/favorites'
    });

  },

  /* const db=wx.cloud.database();

  async loadUserEntries(){

    const res=await db
    .collection('user_entries')
    .get();
   
   
    wx.setStorageSync(
      'userEntries',
      res.data
    ); 
   
   }*/

});