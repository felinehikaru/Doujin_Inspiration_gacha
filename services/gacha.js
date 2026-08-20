/**
 * 抽卡业务
 *
 * 负责：
 * 1. 获取当前缓存词库
 * 2. 随机抽卡
 * 3. 平衡模式
 * 4. 自由模式
 *
 * 不负责：
 * - 网络
 * - 云同步
 * - 版本更新
 */

const app = getApp();

// =====================
// 获取当前词库
// =====================
function getEntries() {
  const official = Array.isArray(app.globalData.localOfficialEntries)
    ? app.globalData.localOfficialEntries
    : [];

  const user = Array.isArray(app.globalData.localUserEntries)
    ? app.globalData.localUserEntries
    : [];

  const entries = [
    ...official,
    ...user
  ];

  console.log(
    "抽卡读取词库:",
    entries.length,
    "官方:",
    official.length,
    "用户:",
    user.length
  );

  return entries;
}

// =====================
// 抽卡入口
// =====================
function draw(page) {
  const entries = getEntries();

  if (!entries.length) {
    wx.showToast({
      title: "词库为空",
      icon: "none"
    });
    return;
  }

  if (page.data.mode === "balanced") {
    spinBalanced(page);
  } else {
    spinRandom(page);
  }
}

// =====================
// 普通随机抽卡
// =====================
function spinRandom(page) {
  const entries = getEntries();

  if (!entries.length) {
    wx.showToast({
      title: "词库为空",
      icon: "none"
    });
    return;
  }

  const pool = [...entries];
  const result = [];

  while (result.length < 3 && pool.length) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }

  page.showResult(result);
}

// =====================
// 平衡模式
//
// 六分类
// world
// relationship
// character
// conflict
// scene
// theme
//
// 随机抽三个分类
// =====================
function spinBalanced(page) {
  const entries = getEntries();

  if (!entries.length) {
    wx.showToast({
      title: "词库为空",
      icon: "none"
    });
    return;
  }

  const categories = [
    "world",
    "relationship",
    "character",
    "conflict",
    "scene",
    "theme"
  ];

  const selected = [];

  while (selected.length < 3 && categories.length) {
    const index = Math.floor(Math.random() * categories.length);
    selected.push(categories.splice(index, 1)[0]);
  }

  const result = [];

  selected.forEach(category => {
    const pool = entries.filter(item => item.category === category);

    if (pool.length) {
      result.push(
        pool[Math.floor(Math.random() * pool.length)]
      );
    }
  });

  page.showResult(result);
}

// =====================
// 自由模式分类选择
// =====================
function changeFreeCategory(page, e) {
  const index = e.currentTarget.dataset.index;

  const list = page.data.freeCategories.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        checked: !item.checked
      };
    }
    return item;
  });

  page.setData({
    freeCategories: list
  });
}

// =====================
// 自由模式抽卡
// =====================
function spinFree(page) {
  const entries = getEntries();

  const categories = page.data.freeCategories
    .filter(item => item.checked)
    .map(item => item.value);

  if (!categories.length) {
    wx.showToast({
      title: "请选择分类",
      icon: "none"
    });
    return;
  }

  const result = [];

  categories.forEach(category => {
    const pool = entries.filter(item => item.category === category);

    if (pool.length) {
      result.push(
        pool[Math.floor(Math.random() * pool.length)]
      );
    }
  });

  if (!result.length) {
    wx.showToast({
      title: "没有对应词条",
      icon: "none"
    });
    return;
  }

  page.setData({
    showFreeMode: false
  });

  page.showResult(result);
}

module.exports = {
  draw,
  getEntries,
  spinRandom,
  spinBalanced,
  changeFreeCategory,
  spinFree
};