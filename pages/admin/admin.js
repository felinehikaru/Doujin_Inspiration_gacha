Page({
  data:{
    pendingList:[],
    loading:false
  },

  onShow(){
    this.loadPending();
   },

  async loadPending(){
    try{
      const res=await wx.cloud.callFunction({
        name:'getPendingEntries'
      });
  
      console.log("getPendingEntries返回:",res);
  
      if(res.result.success){
        console.log("词条数量:",res.result.data.length);
  
        const list = res.result.data.map(item => {
          if (item.submitTime) {
            const date = new Date(item.submitTime);
        
            item.submitTimeText =
              `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
          } else {
            item.submitTimeText = "";
          }
        
          return item;
        });
        
        this.setData({
          pendingList: list
        });

        this.setData({
          pendingList:res.result.data
        });
      }
  
    }catch(err){
  
      console.error("加载失败:",err);
  
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