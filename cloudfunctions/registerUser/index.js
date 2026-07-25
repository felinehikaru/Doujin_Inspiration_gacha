const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {

  const openid = cloud.getWXContext().OPENID;

  if (!openid) {
    return {
      success: false,
      message: "获取微信身份失败"
    };
  }


  // 查询是否已经注册
  const res = await db.collection('users')
    .where({
      openid: openid
    })
    .get();


  if (res.data.length) {

    return {
      success: true,
      message: "已经注册",
      role: res.data[0].role
    };

  }


  // 创建注册用户

  await db.collection('users').add({

    data: {
      openid: openid,
      role: "user",
      createTime: new Date()
    }

  });


  return {

    success: true,
    message: "注册成功",
    role: "user"

  };

};