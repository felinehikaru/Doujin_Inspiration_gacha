// utils/ballGenerator.js
// ============================================================
//  扭蛋球堆叠生成
//  在玻璃罩球体内随机分布，沿内壁铺开，有立体起伏感
//  纯UI模块，与业务逻辑无关
// ============================================================

/**
 * 生成玻璃罩内的扭蛋球数组
 * @param {number} ballSize - 单个扭蛋直径（rpx）
 * @returns {Array} 球数组 {x, y, color, size, delay, bounce, dur, rot}
 */
function generateBalls(ballSize) {
  const count = 50 + Math.floor(Math.random() * 15); // 随机 50~70 个
  const centerX = 300;
  const centerY = 196;
  const radius = 160;
  const baseSize = ballSize || 38;

  const balls = [];

  for (let i = 0; i < count; i++) {
    // 角度：70% 集中在上半圆（靠内壁铺开），30% 全圆随机
    let angle;
    if (Math.random() < 0.7) {
      angle = Math.PI / 2 + (Math.random() - 0.5) * 1.3;
    } else {
      angle = Math.random() * Math.PI;
    }
    angle = Math.max(0.1, Math.min(Math.PI - 0.1, angle));

    // 半径：60% 靠外层（0.7~1.0），40% 内层（0.3~0.8），形成立体分布
    let rFactor;
    if (Math.random() < 0.6) {
      rFactor = 0.7 + Math.random() * 0.3;
    } else {
      rFactor = 0.3 + Math.random() * 0.5;
    }
    let r = radius * rFactor;

    let x = centerX + r * Math.cos(angle);
    let y = centerY + r * Math.sin(angle);

    // 随机抖动，避免死板排列
    const jitter = 14;
    x += (Math.random() - 0.5) * jitter;
    y += (Math.random() - 0.5) * jitter;

    // 限制在玻璃罩球体内（球心不超过 radius*0.98）
    const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    if (dist > radius * 0.98) {
      const ratio = radius * 0.98 / dist;
      x = centerX + (x - centerX) * ratio;
      y = centerY + (y - centerY) * ratio;
    }

    // 随机颜色（HSL，低饱和高明度，莫兰迪色系）
    const hue = Math.floor(Math.random() * 360);
    const sat = 40 + Math.floor(Math.random() * 30);  // 40~70%
    const light = 55 + Math.floor(Math.random() * 25); // 55~80%
    const color = `hsl(${hue}, ${sat}%, ${light}%)`;

    // 大小随机 ±10%
    const size = baseSize * (0.9 + Math.random() * 0.2);

    // 弹动动画参数（每球不同，避免同步）
    const delay = (Math.random() * 0.8).toFixed(3);    // 延迟 0~0.8s
    const bounce = 22 + Math.random() * 22;             // 幅度 22~44rpx
    const dur = (0.9 + Math.random() * 0.4).toFixed(3); // 时长 0.9~1.3s
    const rot = ((Math.random() - 0.5) * 8).toFixed(2); // 旋转 -4~4度

    balls.push({ x, y, color, size, delay, bounce, dur, rot });
  }

  return balls;
}

module.exports = { generateBalls };
