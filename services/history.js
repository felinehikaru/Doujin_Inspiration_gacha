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

  const text = result
    .map(item => item.text)
    .join(" + ");

  let history = wx.getStorageSync("history") || [];

  history.unshift({
    text: text,
    time: Date.now()
  });

  // 最大保存50条
  if (history.length > 50) {
    history = history.slice(0, 50);
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