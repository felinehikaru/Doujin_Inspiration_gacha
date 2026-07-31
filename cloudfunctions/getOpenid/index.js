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


exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  console.log("当前openid:", openid);

  if (!openid) {
    return {
      success: false,
      message: "没有获取到openid"
    };
  }

  const res = await db.collection('users')
    .where({
      openid: openid
    })
    .get();

  console.log("用户查询:", res.data);

  if (res.data.length === 0) {
    return {
      success: true,
      role: "visitor",
      isRegister: false
    };
  }

  return {
    success: true,
    role: res.data[0].role,
    isRegister: true
  };
};