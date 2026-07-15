// pages/history/history.js

Page({
  data:{
    history:[]
  },

  onLoad(){
    this.loadHistory();
  },

  onShow(){
    this.loadHistory();
  },

  loadHistory(){

    const history=
      wx.getStorageSync('history')||[];
    this.setData({
      history
    });

  },

  clearHistory(){
    wx.showModal({
      title:'确认删除',
      content:'历史记录仅记录在本地，确认删除无法找回',
      confirmText:'确认删除',
      cancelText:'取消',
      success:res=>{
        if(res.confirm){
          wx.removeStorageSync(
            'history'
          );
          this.setData({
            history:[]
          });
          wx.showToast({
            title:'已清空历史',
            icon:'success'
          });
        }
      }
    });
  },

  goBack(){
    wx.navigateBack();
  }
});