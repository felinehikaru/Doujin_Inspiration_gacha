// utils/gachaAnimation.js
// ============================================================
//  抽卡动画时间线控制器
//  机器摇动 → 金球出球 → 光效播放 → 显示结果
//  纯UI动画模块，与业务逻辑无关
// ============================================================

/**
 * 播放完整抽卡动画
 * @param {Object} page - 页面对象（需要有 _gachaFx 和 showResult）
 * @param {Array} result - 抽卡结果数组
 */
function startGachaAnimation(page, result) {
  // 阶段1：机器摇动 + 罩内球弹动
  page.setData({
    isShaking: true,
    gachaState: "shake",
    dropBall: false
  });

  // 阶段2（600ms后）：摇动停止，金球从出口掉出 + 光效播放
  setTimeout(() => {
    const canvasOk = page._gachaFx && page._gachaFx.isReady();
    page.setData({
      isShaking: false,
      gachaState: "drop",
      dropBall: !canvasOk
    });
    if (page._gachaFx) {
      page._gachaFx.play();
    }
  }, 600);

  // 阶段3（1800ms后）：光效播放完毕，停止光效，显示结果
  setTimeout(() => {
    try {
      if (page._gachaFx) {
        page._gachaFx.stop();
      }
    } catch (e) {}
    page.setData({
      dropBall: false,
      gachaState: "idle"
    });
    page.showResult(result);
  }, 1800);
}

module.exports = { startGachaAnimation };
