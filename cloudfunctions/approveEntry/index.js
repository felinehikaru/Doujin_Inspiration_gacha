const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const ADMIN_OPENIDS = ['你的OpenID'];

exports.main = async (event, context) => {
  const { entryId, action } = event;
  if (!ADMIN_OPENIDS.includes(cloud.getWXContext().OPENID)) {
    return { success: false, message: '权限不足' };
  }
  try {
    const pending = await db.collection('pending_entries').doc(entryId).get();
    if (!pending.data || pending.data.status !== 'pending') {
      return { success: false, message: '词条不存在或已处理' };
    }
    if (action === 'approve') {
      const { text, type, desc } = pending.data;
      await db.collection('entries').add({ data: { text, type, desc, source: 'user', approveTime: new Date() } });
      await db.collection('pending_entries').doc(entryId).update({ data: { status: 'approved' } });
      return { success: true, message: '审核通过' };
    } else if (action === 'reject') {
      await db.collection('pending_entries').doc(entryId).update({ data: { status: 'rejected' } });
      return { success: true, message: '已拒绝' };
    } else {
      return { success: false, message: '无效操作' };
    }
  } catch (err) {
    return { success: false, message: err.message };
  }
};