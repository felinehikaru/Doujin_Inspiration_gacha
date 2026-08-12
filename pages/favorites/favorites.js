// pages/favorites/favorites.js
Page({
  data:{
    favorites:[],
    displayFavorites:[],
    role:"visitor",
    showDetail:false,
    searchKeyword:"",
    isManaging:false,
    selectedKeys:[]
  },

  onLoad(){
    this.checkRole();
  },

  onShow(){
    this.checkRole();
  },

  async checkRole(){
    try{
      const res=await wx.cloud.callFunction({
        name:"checkRole"
      });

      const role=res.result&&res.result.success
        ?res.result.role||"visitor"
        :"visitor";

      this.setData({
        role
      });

      this.loadFavorites();

    }catch(err){
      console.log("身份检测失败",err);
    }
  },

  formatEntries(entries){
    const categoryName={
      world:"世界背景",
      relationship:"关系设定",
      character:"角色身份",
      conflict:"冲突矛盾",
      scene:"特殊场景",
      theme:"主题氛围"
    };

    return (entries||[]).map(entry=>({
      ...entry,
      categoryName:categoryName[entry.category]||"其他"
    }));
  },

  formatFavorites(list){
    return (list||[]).map((item,index)=>({
      ...item,
      clientKey:item._id||item.clientKey||`local-${item.createTime||""}-${index}`,
      entries:this.formatEntries(item.entries)
    }));
  },

  applySelectionState(list){
    const selectedKeys=this.data.selectedKeys||[];
    return (list||[]).map(item=>({
      ...item,
      isSelected:selectedKeys.indexOf(item.clientKey)>-1
    }));
  },

  filterFavorites(list,keyword){
    if(!keyword){
      return list;
    }

    return list.filter(item=>{
      return (item.entries||[]).some(entry=>{
        return String(entry.text||"").includes(keyword)||
        String(entry.desc||"").includes(keyword);
      });
    });
  },

  async loadFavorites(){
    if(this.data.role==="visitor"){
      const list=wx.getStorageSync("favorites")||[];
      const data=this.formatFavorites(list);

      this.setData({
        favorites:data,
        displayFavorites:this.filterFavorites(
          this.applySelectionState(data),
          this.data.searchKeyword
        )
      });

      return;
    }

    try{
      const res=await wx.cloud.callFunction({
        name:"favorite",
        data:{
          action:"get"
        }
      });

      const data=this.formatFavorites(
        res.result&&res.result.data||[]
      );

      this.setData({
        favorites:data,
        displayFavorites:this.filterFavorites(
          this.applySelectionState(data),
          this.data.searchKeyword
        )
      });

    }catch(err){
      console.log("收藏读取失败",err);
    }
  },

  onSearchInput(e){
    const keyword=(e.detail.value||"").trim();

    this.setData({
      searchKeyword:keyword,
      displayFavorites:this.filterFavorites(
        this.applySelectionState(this.data.favorites),
        keyword
      )
    });
  },

  toggleDetail(){
    this.setData({
      showDetail:!this.data.showDetail
    });
  },

  toggleManage(){
    this.setData({ isManaging:!this.data.isManaging, selectedKeys:[] });
    this.loadFavorites();
  },

  toggleSelect(e){
    if(!this.data.isManaging){ return; }
    const key=e.currentTarget.dataset.key;
    const selectedKeys=this.data.selectedKeys.slice();
    const index=selectedKeys.indexOf(key);
    if(index>-1){ selectedKeys.splice(index,1); }else{ selectedKeys.push(key); }
    this.setData({ selectedKeys });
    this.loadFavorites();
  },

  deleteSelected(){
    const count=this.data.selectedKeys.length;
    if(!count){
      wx.showToast({ title:"请先选择灵感组合", icon:"none" });
      return;
    }
    wx.showModal({
      title:"批量删除",
      content:`确定删除这 ${count} 个灵感组合吗？`,
      confirmColor:"#d98f9b",
      success:res=>{ if(res.confirm){ this.realDeleteSelected(); } }
    });
  },

  async realDeleteSelected(){
    const selectedKeys=this.data.selectedKeys;
    const selectedItems=this.data.favorites.filter(item=>selectedKeys.includes(item.clientKey));
    try{
      if(this.data.role==="visitor"){
        const list=this.data.favorites.filter(item=>!selectedKeys.includes(item.clientKey)).map(({ clientKey, ...item })=>item);
        wx.setStorageSync("favorites",list);
      }else{
        await Promise.all(selectedItems.map(item=>wx.cloud.callFunction({ name:"favorite", data:{ action:"delete", id:item._id } })));
      }
      await this.loadFavorites();
      this.setData({ isManaging:false, selectedKeys:[] });
      wx.showToast({ title:"删除成功", icon:"success" });
    }catch(err){
      console.log("批量删除失败",err);
      wx.showToast({ title:"删除失败，请重试", icon:"none" });
    }
  },
  deleteFavorite(e){
    const index=Number(e.currentTarget.dataset.index);
    const item=this.data.displayFavorites[index];

    if(!item){
      return;
    }

    wx.showModal({
      title:"删除收藏",
      content:"确定删除这条收藏吗？",
      success:res=>{
        if(res.confirm){
          this.realDelete(item);
        }
      }
    });
  },

  async realDelete(item){
    if(this.data.role==="visitor"){
      let list=wx.getStorageSync("favorites")||[];

      const index=list.findIndex(i=>
        JSON.stringify(i)===JSON.stringify(item)
      );

      if(index>-1){
        list.splice(index,1);
        wx.setStorageSync("favorites",list);
      }

      await this.loadFavorites();

      wx.showToast({
        title:"删除成功",
        icon:"success"
      });

      return;
    }

    try{
      await wx.cloud.callFunction({
        name:"favorite",
        data:{
          action:"delete",
          id:item._id
        }
      });

      await this.loadFavorites();

      wx.showToast({
        title:"删除成功",
        icon:"success"
      });

    }catch(err){
      wx.showToast({
        title:"删除失败",
        icon:"none"
      });
    }
  },

  copyFavorite(e){
    const index=Number(e.currentTarget.dataset.index);
    const item=this.data.displayFavorites[index];

    if(!item){
      return;
    }

    const text=(item.entries||[])
      .map((entry,i)=>`${i+1}. ${entry.text}`)
      .join("\n");

    wx.setClipboardData({
      data:text
    });
  },

  createPrompt(e){
    const index=Number(e.currentTarget.dataset.index);
    const item=this.data.displayFavorites[index];

    if(!item){
      return;
    }

    const text=(item.entries||[])
      .map(entry=>entry.text)
      .join(" + ");

    wx.navigateTo({
      url:"/pages/prompt/prompt?text="+encodeURIComponent(text)
    });
  }
});