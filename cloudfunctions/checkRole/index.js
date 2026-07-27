const cloud=require('wx-server-sdk');

cloud.init({
 env:cloud.DYNAMIC_CURRENT_ENV
});

const db=cloud.database();

exports.main=async(event,context)=>{

 const openid=cloud.getWXContext().OPENID;

 if(!openid){
   return {
    success:false,
    message:"没有获取到openid"
   };
 }

 const res=await db.collection('users')
 .where({
   openid:openid
 })
 .get();


 if(res.data.length===0){

   return {
    success:true,
    role:"visitor",
    isRegister:false
   };
 }

 return {
   success:true,
   role:res.data[0].role,
   isRegister:true
 };
};