const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
  try {
    const officialRes = await db.collection('entries')
      .limit(1000)
      .get();

    const userRes = await db.collection('user_entries')
      .limit(1000)
      .get();

    return {
      success: true,
      data: [
        ...officialRes.data,
        ...userRes.data
      ]
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};