/**
 * cloudGen.js — 背景云朵随机生成器
 * 每次打开主界面生成一组随机云朵，横穿屏幕，起伏自然
 * 返回：[{ size, x, y, color }, ...]
 *   size: 圆形直径（rpx）
 *   x: left 位置（rpx）
 *   y: bottom 位置（rpx，相对于容器底部）
 *   color: 填充色
 */

function generateClouds() {
  // 随机 5~7 个圆形
  const count = 5 + Math.floor(Math.random() * 3);
  const clouds = [];

  // 云朵统一颜色（极浅灰蓝，和底部矩形一致，无分层）
  const cloudColor = '#edf2f6';

  // 水平分布：从屏幕左侧外到右侧外，均匀分布 + 随机偏移
  const screenW = 750;
  const step = screenW / (count - 1);
  // 随机选择起伏模式（0=中间高两边低，1=错落起伏，2=左边高右边低）
  const mode = Math.floor(Math.random() * 3);

  for (let i = 0; i < count; i++) {
    // 水平位置：均匀分布 + 随机偏移 ±40rpx
    const x = -80 + i * step + (Math.random() - 0.5) * 80;

    // 大小：基础 260~400rpx + 模式影响
    let baseSize = 260 + Math.random() * 140;
    if (mode === 0) {
      // 中间高两边低：中间的圆更大
      const centerFactor = 1 - Math.abs(i - (count - 1) / 2) / ((count - 1) / 2);
      baseSize = 240 + centerFactor * 180 + Math.random() * 40;
    } else if (mode === 1) {
      // 错落起伏：奇偶交替大小
      baseSize = (i % 2 === 0 ? 320 : 250) + Math.random() * 60;
    } else {
      // 左边高右边低：逐渐减小
      const factor = 1 - i / (count - 1) * 0.5;
      baseSize = 280 * factor + Math.random() * 60;
    }
    const size = Math.round(baseSize);

    // 露出高度 reveal：圆形顶部露出容器的高度（100~240rpx，起伏大）
    // bottom = reveal - size（负数，圆形底部在容器底部以下，只露出顶部圆弧）
    let reveal;
    if (mode === 0) {
      // 中间高两边低：中间露出更多
      const centerFactor = 1 - Math.abs(i - (count - 1) / 2) / ((count - 1) / 2);
      reveal = 130 + centerFactor * 90 + (Math.random() - 0.5) * 20;
    } else if (mode === 1) {
      // 错落起伏：奇偶交替
      reveal = (i % 2 === 0 ? 200 : 130) + (Math.random() - 0.5) * 25;
    } else {
      // 左边高右边低：逐渐降低
      reveal = 210 - i / (count - 1) * 90 + (Math.random() - 0.5) * 20;
    }
    reveal = Math.max(90, Math.min(250, reveal));
    const y = Math.round(reveal - size);  // 负数：底部在容器下

    const color = cloudColor;

    clouds.push({ size, x: Math.round(x), y, color });
  }

  return clouds;
}

module.exports = { generateClouds };
