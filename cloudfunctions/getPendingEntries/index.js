const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const ADMIN_OPENIDS = ['你的OpenID'];

exports.main = async (event, context) => {
  if (!ADMIN_OPENIDS.includes(cloud.getWXContext().OPENID)) {
    return { success: false, message: '权限不足' };
  }
  try {
    const result = await db.collection('pending_entries')
      .where({ status: 'pending' })
      .orderBy('submitTime', 'desc')
      .get();
    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};