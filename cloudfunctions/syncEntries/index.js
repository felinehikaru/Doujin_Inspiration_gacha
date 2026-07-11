const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const result = await db.collection('entries').orderBy('text', 'asc').get();
    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};