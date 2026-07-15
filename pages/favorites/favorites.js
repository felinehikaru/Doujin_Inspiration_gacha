Page({
  data:{
    favorites:[]
  },

  onLoad(){
    this.loadFavorites();
  },

  loadFavorites(){
    const favorites=wx.getStorageSync('favorites')||[];

    this.setData({
      favorites
    });
  },

  deleteFavorite(e){
    const index=e.currentTarget.dataset.index;
    let favorites=this.data.favorites;

    favorites.splice(index,1);

    this.setData({
      favorites
    });

    wx.setStorageSync(
      'favorites',
      favorites
    );

    wx.showToast({
      title:'已删除',
      icon:'success'
    });
  },

  copyFavorite(e){
    const index=e.currentTarget.dataset.index;
    const text=this.data.favorites[index];
  
    wx.setClipboardData({
      data:text,
      success(){
        wx.showToast({
          title:'复制成功',
          icon:'success'
        });
      }
    });
  },
  
  createPrompt(e){
    const index=e.currentTarget.dataset.index;
    const text=this.data.favorites[index];
  
    wx.navigateTo({
      url:'/pages/prompt/prompt?text='+encodeURIComponent(text)
    });
  },
});