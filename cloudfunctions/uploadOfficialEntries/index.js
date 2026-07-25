const cloud=require('wx-server-sdk');

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
});

const db=cloud.database();


const entries=require('./entries');


exports.main=async(event,context)=>{

  try{

    const openid=cloud.getWXContext().OPENID;


    if(!openid){
      return {
        success:false,
        message:"没有openid"
      };
    }


    const user=await db.collection('users')
      .where({
        openid:openid
      })
      .get();


    if(
      user.data.length===0 ||
      user.data[0].role!=="maintainer"
    ){

      return {
        success:false,
        message:"无维护员权限"
      };

    }


    // 清空官方词库

    const old=await db.collection('entries')
      .limit(1000)
      .get();


    const removeTasks=
      old.data.map(item=>
        db.collection('entries')
        .doc(item._id)
        .remove()
      );


    await Promise.all(removeTasks);



    // 分批上传

    const batchSize=100;

    for(
      let i=0;
      i<entries.length;
      i+=batchSize
    ){

      const batch=
        entries.slice(i,i+batchSize);


      await Promise.all(
        batch.map(item=>
          db.collection('entries')
          .add({
            data:item
          })
        )
      );

    }


    return {

      success:true,

      message:"官方词库同步完成",

      count:entries.length

    };


  }catch(err){

    return {

      success:false,

      message:err.message

    };

  }

};