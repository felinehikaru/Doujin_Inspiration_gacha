const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const official = await db.collection('entries')
      .limit(1000)
      .get();

    const user = await db.collection('user_entries')
      .limit(1000)
      .get();

    return {
      success: true,
      data: [
        ...official.data,
        ...user.data
      ]
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};