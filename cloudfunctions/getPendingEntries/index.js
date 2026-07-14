const cloud=require('wx-server-sdk');

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
});

const db=cloud.database();

exports.main=async(event,context)=>{
  try{
    const result=await db.collection('pending_entries')
      .where({
        status:'pending'
      })
      .orderBy('submitTime','desc')
      .get();

    return{
      success:true,
      data:result.data
    };

  }catch(err){
    return{
      success:false,
      message:err.message
    };
  }
};