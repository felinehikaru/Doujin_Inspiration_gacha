const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event) => {
  const openid = cloud.getWXContext().OPENID;

  if (!openid) {
    return {
      success: false,
      message: "openid不存在"
    };
  }

  const exist = await db.collection("users")
    .where({
      openid
    })
    .get();

  if (exist.data.length) {
    return {
      success:true,
      message:"已注册",
      role:exist.data[0].role,
      isRegister:true
     };
  }

  await db.collection("users")
    .add({
      data: {
        openid,
        role: "user",
        nickname: event.nickname || "",
        avatar: event.avatar || "",
        createTime: new Date()
      }
    });

  return {
    success: true,
    message: "注册成功"
  };
};