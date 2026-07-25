/* // 云函数入口文件
const cloud = require('wx-server-sdk')
exports.main = async (event, context) => {
  // 通过 getWXContext 方法直接获取可信的 openid
  const { OPENID } = cloud.getWXContext()
  return { OPENID }
} */

const cloud=require('wx-server-sdk');

cloud.init({
 env:cloud.DYNAMIC_CURRENT_ENV
});


exports.main=async(event,context)=>{

 const wxContext=cloud.getWXContext();

 return {
   openid:wxContext.OPENID
 };

};