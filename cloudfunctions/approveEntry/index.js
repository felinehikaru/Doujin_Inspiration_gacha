const cloud=require('wx-server-sdk');

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
});

const db=cloud.database();

exports.main=async(event,context)=>{
  const {
    entryId,
    action
  }=event;

  if(!entryId||!action){
    return{
      success:false,
      message:'参数错误'
    };
  }

  try{
    const entryRes=await db.collection('pending_entries')
      .doc(entryId)
      .get();

    const entry=entryRes.data;

    if(!entry){
      return{
        success:false,
        message:'词条不存在'
      };
    }

    if(action==='approve'){

      const exist=await db.collection('user_entries')
        .where({
          text:entry.text
        })
        .get();

      if(!exist.data.length){

        await db.collection('user_entries')
        .add({
          data:{
            text:entry.text,
            category:entry.category,
            desc:entry.desc,
            tags:entry.tags || [],
            createTime:new Date()
          }
        });
      }

      await db.collection('pending_entries')
        .doc(entryId)
        .update({
          data:{
            status:'approved',
            approveTime:new Date()
          }
        });

      return{
        success:true,
        message:'审核通过'
      };
    }

    if(action==='reject'){

      await db.collection('pending_entries')
        .doc(entryId)
        .update({
          data:{
            status:'rejected',
            rejectTime:new Date()
          }
        });

      return{
        success:true,
        message:'已拒绝'
      };
    }

    return{
      success:false,
      message:'未知操作'
    };

  }catch(err){

    return{
      success:false,
      message:err.message
    };

  }
};