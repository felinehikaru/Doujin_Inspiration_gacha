const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

async function removeUserData(collectionName, openid) {
  const result = await db.collection(collectionName).where({ openid }).remove();
  return result.stats && result.stats.removed ? result.stats.removed : 0;
}

exports.main = async () => {
  try {
    const openid = cloud.getWXContext().OPENID;
    if (!openid) return { success: false, message: "未获取用户身份" };

    const [favorites, pendingEntries, userEntries, users] = await Promise.all([
      removeUserData("favorites", openid),
      removeUserData("pending_entries", openid),
      removeUserData("user_entries", openid),
      removeUserData("users", openid)
    ]);

    return { success: true, message: "账号及相关数据已注销", removed: { favorites, pendingEntries, userEntries, users } };
  } catch (err) {
    console.error("注销账号失败", err);
    return { success: false, message: err.message || "注销账号失败" };
  }
};
