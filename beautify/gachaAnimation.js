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

<<<<<<< HEAD
  // 阶段2（600ms后）：摇动停止，金球从出口掉出 + 光效播放
=======
  // 阶段2（900ms后）：摇动停止，金球从出口掉出 + 光效播放
  // 双轨：canvas 可用（开发者工具/真机已修 z-index）→ canvas 版（白金光效+金球）；
  //       canvas node 拿不到 → dropBall=true 走 DOM 版金球+光效兜底
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
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
<<<<<<< HEAD
  }, 600);

  // 阶段3（1800ms后）：光效播放完毕，停止光效，显示结果
  setTimeout(() => {
    try {
      if (page._gachaFx) {
        page._gachaFx.stop();
      }
    } catch (e) {}
=======
  }, 900);

  // 阶段3（2600ms后）：光效播放完毕，停止光效，显示结果
  setTimeout(() => {
    if (page._gachaFx) {
      page._gachaFx.stop();
    }
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
    page.setData({
      dropBall: false,
      gachaState: "idle"
    });
    page.showResult(result);
<<<<<<< HEAD
  }, 1800);
=======
  }, 2600);
>>>>>>> 28e4723b9f75b3be41e65a22c0a034d3bb7e042e
}

module.exports = { startGachaAnimation };
