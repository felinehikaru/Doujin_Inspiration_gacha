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

  loadHistory() {
    let history = wx.getStorageSync('history') || [];
  
    history = history.map(item => {
      return {
        ...item,
        timeText: this.formatTime(item.time)
      };
    });
  
    this.setData({
      history
    });
  },
  
  formatTime(time) {
    const date = new Date(time);
  
    return (
      date.getFullYear() + "-" +
      String(date.getMonth() + 1).padStart(2, "0") + "-" +
      String(date.getDate()).padStart(2, "0") + " " +
      String(date.getHours()).padStart(2, "0") + ":" +
      String(date.getMinutes()).padStart(2, "0")
    );
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
  },

  copyHistory(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.history[index];
  
    wx.setClipboardData({
      data: item.text,
  
      success() {
        wx.showToast({
          title: "已复制",
          icon: "success"
        });
      }
    });
  },
});