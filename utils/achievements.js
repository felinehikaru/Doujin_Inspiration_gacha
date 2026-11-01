// 成就定义集中在这里。iconImage 可在后续替换为本地或云端图片路径。
const achievements = [
  {
    id: "first_draw",
    type: "normal",
    icon: "🏆",
    iconImage: "",
    name: "千里之行始于手下",
    description: "第一次摇动扭蛋机！",
    target: 1,
    progressKey: "drawCount"
  },
  {
    id: "thirty_entries",
    type: "hidden",
    icon: "🌛",
    iconImage: "",
    name: "330抽的计算方式",
    description: "喜欢我的大保底吗",
    target: 330,
    progressKey: "entryCount"
  },
  {
    id: "share_first",
    type: "normal",
    icon: "",
    iconImage: "/assets/achievement_icon/p737131379.jpg",
    name: "我也要吗",
    description: "第一次分享抽卡结果",
    target: 1,
    progressKey: "shareCount"
  },
  {
    id: "four_classics",
    type: "normal",
    icon: "📚",
    iconImage: "",
    name: "四大名著",
    description: "累计抽中的词条中，tag里集齐“三国”“西游”“水浒”和“红楼”",
    target: 4,
    progressKey: "fourClassicsCount"
  },
  {
<<<<<<< HEAD
    id: "pokemon_master",
    type: "normal",
    icon: "",
    iconImage: "/assets/achievement_icon/pokemonball.jpeg",
=======
    id: "pokemon_newbie",
    type: "normal",
    icon: "",
    iconImage: "",
    name: "宝可梦新人",
    description: "累计抽中一个tag含有“宝可梦”的词条",
    target: 1,
    progressKey: "pokemonCount"
  },
  {
    id: "pokemon_master",
    type: "normal",
    icon: "",
    iconImage: "",
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
    name: "宝可梦大师",
    description: "累计抽中5个不同的tag含有“宝可梦”的词条",
    target: 5,
    progressKey: "pokemonCount"
  },
  {
<<<<<<< HEAD
    id: "green_frog",
    type: "normal",
    icon: "",
    iconImage: "/assets/achievement_icon/green_frog.png",
    name: "绿色青蛙五个字",
    description: "累计抽到5个不同的tag含有“恶俗”的词条",
    target: 5,
    progressKey: "vulgarCount"
  },
  {
=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
    id: "gong_gong",
    type: "hidden",
    icon: "",
    iconImage: "",
    name: "公说公有理",
    description: "累计抽到三个不同的tag中含有“公公”的不同词条",
    target: 3,
    progressKey: "gongCount"
  },
  {
    id: "mo_mo",
    type: "hidden",
    icon: "",
    iconImage: "",
    name: "嬷说嬷嬷你",
    description: "累计抽到三个不同的tag中含有“嬷嬷”的不同词条",
    target: 3,
    progressKey: "moCount"
  },
  {
    id: "cyberpunk_entry",
    type: "hidden",
    icon: "",
    iconImage: "",
    name: "牛逼啊V",
    description: "累计抽到一个赛博朋克相关词条",
    target: 1,
    progressKey: "cyberCount"
  },
  {
    id: "cyberpunk_set",
    type: "hidden",
    icon: "",
    iconImage: "",
    name: "永不消逝！！",
    description: "累计同时抽到“赛博朋克” + “机械改造者” + “未来都市”",
    target: 1,
    progressKey: "cyberSetHit"
<<<<<<< HEAD
  },
  {
    id: "crash_recovery",
    type: "hidden",
    icon: "",
    iconImage: "/assets/achievement_icon/doorcannotopen.jpg",
    name: "门不能从这一侧打开",
    description: "遇到过一次小程序崩溃，只能重新加载",
    target: 1,
    progressKey: "crashCount"
=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
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