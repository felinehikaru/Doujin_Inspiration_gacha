const cloud=require('wx-server-sdk');

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
});

const db=cloud.database();

exports.main=async(event,context)=>{
  const {
    text,
    desc,
    category,
    tags
  }=event;

  if(!text||!desc||!category){
    return{
      success:false,
      message:'请填写完整信息'
    };
  }

  try{
    const result=await db.collection('pending_entries').add({
      data:{
        text,
        desc,
        category,
        tags:Array.isArray(tags)?tags:[],
        submitTime:new Date(),
        status:'pending'
      }
    });

    return{
      success:true,
      message:'提交成功',
      data:result
    };

  }catch(err){
    return{
      success:false,
      message:err.message
    };
  }
};