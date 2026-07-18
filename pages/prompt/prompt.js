// pages/prompt/prompt.js

Page({
  data:{
    results:[],
    prompt:'',
    promptTemplate:'qqqqqqqqqqqqqqqqqqq',
    showTemplateModal:false
  },

  onLoad(){
    this.loadPromptTemplate();
    this.loadResults();
  },

  onShow(){
    this.loadResults();
  },

  loadResults(){
    const app=getApp();
    const results=(app.globalData&&app.globalData.currentResults)||[];

    this.setData({
      results
    });

    this.generatePrompt();
  },

  loadPromptTemplate(){
    try{
      const template=wx.getStorageSync('promptTemplate');

      if(template){
        this.setData({
          promptTemplate:template
        });
      }

    }catch(e){
      console.warn('模板读取失败',e);
    }
  },

  generatePrompt(){
    const results=this.data.results;

    if(!results.length){
      this.setData({
        prompt:this.data.promptTemplate
      });
      return;
    }

    const resultText=results.map((item,index)=>{
      return `${index+1}. ${item.text}\n类型：${item.type}\n描述：${item.desc}`;
    }).join('\n\n');


    const prompt=this.data.promptTemplate.replace(
      /\{results\}/g,
      resultText
    );


    this.setData({
      prompt
    });
  },


  openTemplateEditor(){
    this.setData({
      showTemplateModal:true
    });
  },


  closeTemplateEditor(){
    this.setData({
      showTemplateModal:false
    });
  },


  onTemplateInput(e){
    this.setData({
      promptTemplate:e.detail.value
    });
  },


  saveTemplate(){
    const template=this.data.promptTemplate;

    wx.setStorageSync(
      'promptTemplate',
      template
    );

    this.generatePrompt();

    this.setData({
      showTemplateModal:false
    });

    wx.showToast({
      title:'模板已保存',
      icon:'success'
    });
  },


  resetTemplate(){

    const template='qqqqqqqqqqqqqqqqqqq';

    this.setData({
      promptTemplate:template
    });

    wx.setStorageSync(
      'promptTemplate',
      template
    );

    this.generatePrompt();

    wx.showToast({
      title:'已恢复默认',
      icon:'success'
    });

  },


  copyPrompt(){

    if(!this.data.prompt){
      wx.showToast({
        title:'没有可复制内容',
        icon:'none'
      });
      return;
    }


    wx.setClipboardData({
      data:this.data.promptTemplate,

      success(){
        wx.showToast({
          title:'已复制',
          icon:'success'
        });
      }
    });

  },


  goBack(){
    wx.navigateBack();
  }

});