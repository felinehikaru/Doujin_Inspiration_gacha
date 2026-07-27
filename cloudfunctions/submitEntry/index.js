const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    if (!openid) {
      return {
        success: false,
        message: "未获取用户身份"
      };
    }

    // 查询用户角色
    const userRes = await db.collection('users')
      .where({
        openid: openid
      })
      .get();

    let role = "visitor";

    if (userRes.data.length > 0) {
      role = userRes.data[0].role;
    }

    console.log("提交词条用户角色:", role);

    // 游客禁止提交
    if (role === "visitor") {
      return {
        success: false,
        message: "游客无法提交词条，请先登录注册"
      };
    }

    // 获取提交内容
    const {
      text,
      desc,
      category,
      tags
    } = event;

    if (!text || !desc || !category) {
      return {
        success: false,
        message: "资料填写不完整"
      };
    }

    // 写入用户词库
    await db.collection('pending_entries')
    .add({
     data:{
       id:"",
       text:text,
       category:category,
       desc:desc,
       tags:tags || [],
       openid:openid,
       submitTime:new Date(),
       source:"user",
       extend:{},
       meta:{}
     }
    });

    return {
      success: true,
      message: "提交成功"
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err.message
    };
  }
};