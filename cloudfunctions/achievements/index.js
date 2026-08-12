const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const collection = db.collection("achievement_progress");
const rules = [
  { id: "first_draw", key: "drawCount", target: 1 },
  { id: "thirty_entries", key: "entryCount", target: 330 }
];

function normalizeProgress(document, openid) {
  const legacyIds = Array.isArray(document && document.unlockedIds) ? document.unlockedIds : [];
  const unlockedAchievements = Array.isArray(document && document.unlockedAchievements)
    ? document.unlockedAchievements
    : legacyIds.map(id => ({ id, achievedAt: document.createTime || new Date() }));

  return {
    ...document,
    openid,
    inProgress: {
      drawCount: Number(document && document.inProgress && document.inProgress.drawCount || document && document.drawCount) || 0,
      entryCount: Number(document && document.inProgress && document.inProgress.entryCount || document && document.entryCount) || 0
    },
    unlockedAchievements
  };
}

async function getProgress(openid) {
  const result = await collection.where({ openid }).limit(1).get();
  return result.data[0] || null;
}

exports.main = async event => {
  try {
    const openid = cloud.getWXContext().OPENID;
    if (!openid) return { success: false, message: "未获取用户身份" };

    const user = await db.collection("users").where({ openid }).limit(1).get();
    if (!user.data.length) {
      return { success: false, message: "用户功能，请登录", code: "LOGIN_REQUIRED" };
    }

    const saved = await getProgress(openid);
    const progress = normalizeProgress(saved, openid);
    let newlyUnlocked = [];

    if (event.action === "recordDraw") {
      const entryCount = Math.max(0, Math.min(Number(event.entryCount) || 0, 3));
      progress.inProgress.drawCount += 1;
      progress.inProgress.entryCount += entryCount;

      newlyUnlocked = rules.filter(rule => {
        const unlocked = progress.unlockedAchievements.some(item => item.id === rule.id);
        if (progress.inProgress[rule.key] >= rule.target && !unlocked) {
          progress.unlockedAchievements.push({ id: rule.id, achievedAt: new Date() });
          return true;
        }
        return false;
      }).map(rule => rule.id);

      const data = {
        inProgress: progress.inProgress,
        unlockedAchievements: progress.unlockedAchievements,
        updateTime: new Date()
      };

      if (progress._id) {
        await collection.doc(progress._id).update({ data });
      } else {
        await collection.add({ data: { openid, ...data, createTime: new Date() } });
      }
    }

    return {
      success: true,
      data: {
        inProgress: progress.inProgress,
        unlockedAchievements: progress.unlockedAchievements,
        newlyUnlocked
      }
    };
  } catch (err) {
    console.error("成就进度操作失败", err);
    return { success: false, message: err.message || "成就进度操作失败" };
  }
};