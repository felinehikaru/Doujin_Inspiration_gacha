const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

const collection = db.collection("achievement_progress");

// =====================
// 数据格式整理
// =====================
function normalizeProgress(document, openid) {
  const legacyIds =
    Array.isArray(document && document.unlockedIds)
      ? document.unlockedIds
      : [];

  const unlockedAchievements =
    Array.isArray(document && document.unlockedAchievements)
      ? document.unlockedAchievements
      : legacyIds.map(id => ({
          id,
          achievedAt: document.createTime || new Date()
        }));

  const src = (document && document.inProgress) || document || {};

  const arr = (key) =>
    Array.isArray(src[key]) ? src[key] : [];

  return {
    ...document,
    openid,
    inProgress: {
<<<<<<< HEAD
      // =====================
      // 普通成就字段
      // =====================
=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
      drawCount: Number(src.drawCount) || 0,
      entryCount: Number(src.entryCount) || 0,
      shareCount: Number(src.shareCount) || 0,
      fourClassicsCount: Number(src.fourClassicsCount) || 0,
      pokemonCount: Number(src.pokemonCount) || 0,
<<<<<<< HEAD
      vulgarCount: Number(src.vulgarCount) || 0,
      collectedTags: arr("collectedTags"),
      pokemonTexts: arr("pokemonTexts"),
      vulgarTexts: arr("vulgarTexts"),

      // =====================
      // 隐藏成就字段
      // =====================
=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
      gongCount: Number(src.gongCount) || 0,
      moCount: Number(src.moCount) || 0,
      cyberCount: Number(src.cyberCount) || 0,
      cyberSetHit: !!src.cyberSetHit,
<<<<<<< HEAD
      crashCount: Number(src.crashCount) || 0,
=======
      collectedTags: arr("collectedTags"),
      pokemonTexts: arr("pokemonTexts"),
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
      gongTexts: arr("gongTexts"),
      moTexts: arr("moTexts"),
      cyberTexts: arr("cyberTexts")
    },
    unlockedAchievements
  };
}

// =====================
// 获取用户成就记录
// =====================
async function getProgress(openid) {
  const result =
    await collection
      .where({ openid })
      .limit(1)
      .get();

  return result.data[0] || null;
}

// =====================
// 累计词条（tag 统计）
// =====================
function accumulateEntries(progress, entries) {
  const p = progress.inProgress;
  const list = Array.isArray(entries) ? entries : [];

  const add = (arr, v) => {
    if (v && !arr.includes(v)) arr.push(v);
  };

  let hasCyber = false;
  let hasMechanical = false;
  let hasCity = false;

  list.forEach(entry => {
    const text = String(entry.text || "");
    const category = String(entry.category || "");
    const tags = Array.isArray(entry.tags)
      ? entry.tags.map(String)
      : [];

<<<<<<< HEAD
    // =====================
    // 普通成就统计
    // =====================

    // 累计所有 tag（去重）——四大名著共用
=======
    // 累计所有 tag（去重）
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
    tags.forEach(t => add(p.collectedTags, t));

    // 宝可梦：tag 含"宝可梦"的词条（按词条名去重）
    if (tags.some(t => t.includes("宝可梦"))) {
      add(p.pokemonTexts, text);
    }
<<<<<<< HEAD

    // 恶俗：tag 含"恶俗"的词条（按词条名去重）
    if (tags.some(t => t.includes("恶俗"))) {
      add(p.vulgarTexts, text);
    }

    // =====================
    // 隐藏成就统计
    // =====================

=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
    // 公公 / 嬷嬷：tag 含关键字的词条（按词条名去重）
    if (tags.some(t => t.includes("公公"))) {
      add(p.gongTexts, text);
    }
    if (tags.some(t => t.includes("嬷嬷"))) {
      add(p.moTexts, text);
    }
    // 赛博朋克相关：tag 含"赛博朋克"或分类为赛博朋克
    const isCyber =
      tags.some(t => t.includes("赛博朋克")) ||
      category.includes("赛博朋克");
    if (isCyber) {
      add(p.cyberTexts, text);
    }

    // 三件套：赛博朋克相关 / 机械改造者 / 未来都市（词条名或 tag）
    if (isCyber || text.includes("赛博朋克")) hasCyber = true;
    if (text.includes("机械改造者") || tags.some(t => t.includes("机械改造者"))) {
      hasMechanical = true;
    }
    if (text.includes("未来都市") || tags.some(t => t.includes("未来都市"))) {
      hasCity = true;
    }
  });

<<<<<<< HEAD
  // =====================
  // 汇总计数
  // =====================

  // 普通成就计数
=======
  // 汇总计数
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
  p.fourClassicsCount = ["三国", "西游", "水浒", "红楼"]
    .filter(t => p.collectedTags.includes(t))
    .length;
  p.pokemonCount = p.pokemonTexts.length;
<<<<<<< HEAD
  p.vulgarCount = p.vulgarTexts.length;

  // 隐藏成就计数
=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
  p.gongCount = p.gongTexts.length;
  p.moCount = p.moTexts.length;
  p.cyberCount = p.cyberTexts.length;

  if (hasCyber && hasMechanical && hasCity) {
    p.cyberSetHit = true;
  }
}

// =====================
// 规则检查：返回新解锁 id 列表
// =====================
function applyRules(progress) {
  const newly = [];
  const unlockedIds =
    progress.unlockedAchievements
      .map(item => typeof item === "string" ? item : item.id);

  const unlock = (id) => {
    if (!unlockedIds.includes(id)) {
      progress.unlockedAchievements.push({
        id,
        achievedAt: new Date()
      });
      newly.push(id);
    }
  };

  const p = progress.inProgress;
  const hasTag = t => p.collectedTags.includes(t);

<<<<<<< HEAD
  // ============================================================
  // 普通成就解锁判断
  // （新增普通成就时，在此区追加一条 if 判断）
  // ============================================================
=======
  // ---- 普通成就 ----
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
  if (p.drawCount >= 1) unlock("first_draw");
  if (p.entryCount >= 330) unlock("thirty_entries");
  if (p.shareCount >= 1) unlock("share_first");
  if (["三国", "西游", "水浒", "红楼"].every(hasTag)) unlock("four_classics");
<<<<<<< HEAD
  if (p.pokemonCount >= 5) unlock("pokemon_master");
  if (p.vulgarCount >= 5) unlock("green_frog");

  // ============================================================
  // 隐藏成就解锁判断
  // （新增隐藏成就时，在此区追加一条 if 判断）
  // ============================================================
=======
  if (p.pokemonCount >= 1) unlock("pokemon_newbie");
  if (p.pokemonCount >= 5) unlock("pokemon_master");

  // ---- 隐藏成就 ----
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
  if (p.gongCount >= 3) unlock("gong_gong");
  if (p.moCount >= 3) unlock("mo_mo");
  if (p.cyberCount >= 1) unlock("cyberpunk_entry");
  if (p.cyberSetHit) unlock("cyberpunk_set");
<<<<<<< HEAD
  if (p.crashCount >= 1) unlock("crash_recovery");
=======
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e

  return newly;
}

// =====================
// 主函数
// =====================
exports.main = async event => {
  try {
    const openid = cloud.getWXContext().OPENID;

    if (!openid) {
      return {
        success: false,
        data: null,
        message: "未获取用户身份",
        code: "NO_OPENID"
      };
    }

    // 游客也按 openid 记录成就（openid 不变，登录后自动关联恢复），
    // 避免游客本地记录因清缓存丢失后云端也查不到
    const saved = await getProgress(openid);
    const progress = normalizeProgress(saved, openid);

    let newlyUnlocked = [];

    // =====================
    // 记录抽卡（含词条 tag 累计）
    // =====================
    if (event.action === "recordDraw") {
      const entryCount =
        Math.max(
          0,
          Math.min(
            Number(event.entryCount) || 0,
            50
          )
        );

      progress.inProgress.drawCount += 1;
      progress.inProgress.entryCount += entryCount;

      accumulateEntries(progress, event.entries);
      newlyUnlocked = applyRules(progress);
    }

    // =====================
    // 记录分享
    // =====================
    if (event.action === "recordShare") {
      progress.inProgress.shareCount += 1;
      newlyUnlocked = applyRules(progress);
    }

    // =====================
    // 同步本地成就到云端（登录后/成就页打开时，合并并持久化）
    // =====================
    if (event.action === "syncLocal") {
      const localUnlocked =
        Array.isArray(event.unlockedAchievements)
          ? event.unlockedAchievements
          : [];
      const localInProgress = event.inProgress || {};

      // 合并解锁成就
      const cloudIds =
        progress.unlockedAchievements
          .map(item => typeof item === "string" ? item : item.id);
      localUnlocked.forEach(item => {
        const id = typeof item === "string" ? item : item.id;
        if (id && !cloudIds.includes(id)) {
          progress.unlockedAchievements.push({
            id,
            achievedAt: new Date()
          });
          cloudIds.push(id);
        }
      });

      // 合并进度：数值取较大值，数组取并集，布尔取或
      const lp = progress.inProgress;
      Object.keys(localInProgress).forEach(k => {
        const v = localInProgress[k];
        if (typeof v === "number") {
          lp[k] = Math.max(Number(lp[k]) || 0, v);
        } else if (Array.isArray(v)) {
          const target = Array.isArray(lp[k]) ? lp[k] : [];
          v.forEach(x => {
            if (x && !target.includes(x)) target.push(x);
          });
          lp[k] = target;
        } else if (typeof v === "boolean") {
          lp[k] = lp[k] || v;
        }
      });

      newlyUnlocked = applyRules(progress);
    }

    // =====================
    // 同步本地首个成就（登录后上传）
    // =====================
    if (event.action === "syncFirstDraw") {
      const already =
        progress.unlockedAchievements
          .some(item => item.id === "first_draw");

      if (!already) {
        progress.unlockedAchievements.push({
          id: "first_draw",
          achievedAt: new Date()
        });
        progress.inProgress.drawCount =
          Math.max(progress.inProgress.drawCount, 1);
      }
    }

    // =====================
    // 存储
    // =====================
    const data = {
      inProgress: progress.inProgress,
      unlockedAchievements: progress.unlockedAchievements,
      updateTime: new Date()
    };

    if (progress._id) {
      await collection
        .doc(progress._id)
        .update({ data });
    } else {
      await collection.add({
        data: {
          openid,
          ...data,
          createTime: new Date()
        }
      });
    }

    // =====================
    // 成功返回
    // =====================
    return {
      success: true,
      data: {
        inProgress: progress.inProgress,
        unlockedAchievements: progress.unlockedAchievements,
        newlyUnlocked
      },
      message: ""
    };

  } catch (err) {
    console.error("成就进度操作失败", err);

    return {
      success: false,
      data: null,
      message: err.message || "成就进度操作失败",
      code: "ACHIEVEMENT_ERROR"
    };
  }
};
