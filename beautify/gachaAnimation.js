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

  // 阶段2（900ms后）：摇动停止，金球从出口掉出 + 光效播放
  // 双轨：canvas 可用（开发者工具/真机已修 z-index）→ canvas 版（白金光效+金球）；
  //       canvas node 拿不到 → dropBall=true 走 DOM 版金球+光效兜底
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
  }, 900);

  // 阶段3（2600ms后）：光效播放完毕，停止光效，显示结果
  setTimeout(() => {
    if (page._gachaFx) {
      page._gachaFx.stop();
    }
    page.setData({
      dropBall: false,
      gachaState: "idle"
    });
    page.showResult(result);
  }, 2600);
}

module.exports = { startGachaAnimation };
