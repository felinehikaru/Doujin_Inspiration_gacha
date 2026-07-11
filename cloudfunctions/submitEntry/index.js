const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { text, type, desc } = event;
  if (!text || !type || !desc) {
    return { success: false, message: '请完整填写词条信息' };
  }
  try {
    const result = await db.collection('pending_entries').add({
      data: {
        text, type, desc,
        submitterOpenid: cloud.getWXContext().OPENID,
        submitTime: new Date(),
        status: 'pending'
      }
    });
    return { success: true, message: '提交成功', data: result };
  } catch (err) {
    return { success: false, message: err.message };
  }
};