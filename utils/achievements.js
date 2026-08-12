// 成就定义集中在这里。iconImage 可在后续替换为本地或云端图片路径。
const achievements = [
  {
    id: "first_draw",
    type: "normal",
    icon: "🏆",
    iconImage: "",
    name: "千里之行始于足下",
    description: "第一次摇动扭蛋机！",
    target: 1,
    progressKey: "drawCount"
  },
  {
    id: "thirty_entries",
    type: "hidden",
    icon: "😔",
    iconImage: "",
    name: "330抽的计算方式",
    description: "喜欢我的大保底吗",
    target: 330,
    progressKey: "entryCount"
  }
];

function getAchievementList(progressData = {}) {
  const inProgress = progressData.inProgress || {};
  const unlockedAchievements = Array.isArray(progressData.unlockedAchievements)
    ? progressData.unlockedAchievements
    : [];
  const unlockedIds = unlockedAchievements.map(item => typeof item === "string" ? item : item.id);

  return achievements.map(achievement => {
    const current = Number(inProgress[achievement.progressKey]) || 0;
    const unlocked = unlockedIds.includes(achievement.id);

    return {
      ...achievement,
      unlocked,
      current: Math.min(current, achievement.target),
      progressText: `${Math.min(current, achievement.target)}/${achievement.target}`,
      progressPercent: Math.min(100, Math.round((current / achievement.target) * 100))
    };
  });
}

module.exports = { getAchievementList };