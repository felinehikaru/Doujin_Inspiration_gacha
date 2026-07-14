Page({
  data:{
    pendingList:[],
    loading:false
  },

  onLoad(){
    this.loadPending();
  },

  async loadPending(){
    try{
      const res=await wx.cloud.callFunction({
        name:'getPendingEntries'
      });

      if(res.result.success){
        this.setData({
          pendingList:res.result.data
        });
      }else{
        wx.showToast({
          title:'加载失败',
          icon:'none'
        });
      }

    }catch(err){
      wx.showToast({
        title:'加载失败',
        icon:'none'
      });
    }
  },

  async approveEntry(e){
    const id=e.currentTarget.dataset.id;

    this.setData({
      loading:true
    });

    try{
      const res=await wx.cloud.callFunction({
        name:'approveEntry',
        data:{
          entryId:id,
          action:'approve'
        }
      });

      if(res.result.success){
        wx.showToast({
          title:'已通过',
          icon:'success'
        });

        this.loadPending();
      }

    }catch(err){
      wx.showToast({
        title:'操作失败',
        icon:'none'
      });
    }

    this.setData({
      loading:false
    });
  },

  async rejectEntry(e){
    const id=e.currentTarget.dataset.id;

    this.setData({
      loading:true
    });

    try{
      const res=await wx.cloud.callFunction({
        name:'approveEntry',
        data:{
          entryId:id,
          action:'reject'
        }
      });

      if(res.result.success){
        wx.showToast({
          title:'已拒绝',
          icon:'success'
        });

        this.loadPending();
      }

    }catch(err){
      wx.showToast({
        title:'操作失败',
        icon:'none'
      });
    }

    this.setData({
      loading:false
    });
  }
});