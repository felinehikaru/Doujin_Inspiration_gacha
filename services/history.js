/**
 * 历史记录业务
 *
 * 包含：
 * saveHistory
 * loadHistory
 */

// =====================
// 保存历史记录
// =====================
function saveHistory(page, result) {
  if (!Array.isArray(result) || !result.length) {
    return;
  }

  // 保存完整词条信息（用于词条列表显示）
  const entries = result.map(item => ({
    text: item.text,
    desc: item.desc || "",
    category: item.category || "",
    categoryName: item.categoryName || ""
  }));

  const text = result
    .map(item => item.text)
    .join(" + ");

  let history = wx.getStorageSync("history") || [];

  history.unshift({
    text: text,
    entries: entries,
    time: Date.now()
  });

  // 最大保存30条
  if (history.length > 30) {
    history = history.slice(0, 30);
  }

  wx.setStorageSync("history", history);

  page.setData({
    history
  });
}

// =====================
// 读取历史记录
// =====================
function loadHistory(page) {
  const history = wx.getStorageSync("history") || [];

  page.setData({
    history
  });
}

module.exports = {
  saveHistory,
  loadHistory
};