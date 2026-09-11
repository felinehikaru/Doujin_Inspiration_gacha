/**
 * sparkleGen.js — 四角星装饰随机生成器（主页 + 历史/收藏/词条中心/成就 通用）
 * 每次打开页面生成一组随机星星：数量、位置、大小、颜色、动画延迟全部随机
 * 主页：颜色取自页面主题色（灰蓝系）+ 底部按钮色系（蓝/黄/绿/红）的低饱和版；
 *       位置只生成在机器两侧纵带（用户中心与云彩底线之间），不落在扭蛋机身上
 * 四个功能页：颜色取自各自页面主题色 + 按钮色的低饱和版；支持分区域生成
 *
 * 返回：[{ x, y, size, color, delay }, ...]
 *   x: left 位置（rpx）
 *   y: top 位置（rpx）
 *   size: 边长（rpx）
 *   color: 填充色
 *   delay: 闪烁动画延迟（s）
 */

// 主页：多彩柔和色（多色相点缀，含主题灰蓝）
const MAIN_COLORS = [
  '#8bb1bf', // 主题灰蓝
  '#8fc4e8', // 天蓝
  '#f0a8c0', // 粉
  '#f0b888', // 橙
  '#c8a8e8', // 紫
  '#a8d8a0', // 绿
  '#f0d888', // 黄
  '#a8e0d8'  // 青
];

// 四个功能页颜色池：主题色为主 + 按钮色变体（提饱和/降饱和/加深）+ 对比点缀色
// 避免全是主题色一色到底
// 四个功能页颜色池：主体为浅灰色调，少量页面主题色 + 按钮色点缀
const THEME_COLORS = {
  history: [   // 历史：浅灰主体 + 蓝灰主题/按钮蓝点缀
    '#c8d0d8', '#d0d6d8', '#d8dcd8', '#c0c8cc',  // 浅灰主体
    '#8bb1bf',                                    // 主题灰蓝
    '#6a9fc8',                                    // 按钮蓝
    '#b8cfe8'                                     // 淡蓝
  ],
  favorite: [  // 收藏：浅灰主体 + 黄主题/按钮黄点缀
    '#c8ccbe', '#d4d6c8', '#d8d8d0', '#c0c4b8',  // 浅灰主体（微暖灰）
    '#e0b848',                                    // 主题黄
    '#e8d5a3',                                    // 按钮淡黄
    '#f0e0b0'                                     // 浅黄
  ],
  entries: [   // 词条中心：浅灰主体 + 绿主题/按钮绿点缀
    '#c8d0c8', '#d0d6d0', '#d8dcd6', '#c0c8c0',  // 浅灰主体（微绿灰）
    '#6ab88a',                                    // 主题绿
    '#b8d8c0',                                    // 按钮淡绿
    '#e8d5a3'                                     // 投稿按钮黄
  ],
  achievements: [ // 成就：浅灰主体 + 红主题/金点缀
    '#d0c8c8', '#d6d0d0', '#d8d8d8', '#c8c0c0',  // 浅灰主体（微暖灰）
    '#d87070',                                    // 主题红
    '#e8d5a3',                                    // 奖杯金
    '#f0c8c8'                                     // 淡红
  ]
};

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

// 从单段或多段范围中随机取一个值
// range: [min, max] 或 [[min,max], [min,max], ...]
function pickRange(range) {
  if (Array.isArray(range[0])) {
    const seg = range[randInt(0, range.length - 1)];
    return rand(seg[0], seg[1]);
  }
  return rand(range[0], range[1]);
}

/**
 * @param {Object} options
 *   colors:    颜色池（默认 MAIN_COLORS）
 *   count:     数量（默认随机 4~6；传入数字则固定）
 *   xRange:    left 范围，单段 [min,max] 或多段 [[min,max],...]（默认 [-20, 620]）
 *   yRange:    [min, max] top 范围（默认 [-10, 610]）
 *   sizeRange: [min, max] 大小范围（默认 [20, 48]）
 *   minDist:   星星之间最小间距（rpx，默认 50）——保证不重叠、有空隙
 */
function generateSparkles(options) {
  const opt = options || {};
  const colors = opt.colors || MAIN_COLORS;
  const count = opt.count != null ? opt.count : randInt(4, 6);
  const xRange = opt.xRange || [-20, 620];
  const yRange = opt.yRange || [-10, 610];
  const sizeRange = opt.sizeRange || [20, 48];
  const minDist = opt.minDist || 50;

  const sparkles = [];
  for (let i = 0; i < count; i++) {
    let placed = false;
    // 最多尝试 40 次找不重叠位置；区域足够时必然放下
    for (let t = 0; t < 40 && !placed; t++) {
      const x = Math.round(pickRange(xRange));
      const y = Math.round(pickRange(yRange));
      const size = Math.round(rand(sizeRange[0], sizeRange[1]));
      const tooClose = sparkles.some(
        s => Math.abs(s.x - x) < minDist && Math.abs(s.y - y) < minDist
      );
      if (!tooClose) {
        sparkles.push({
          x: x,
          y: y,
          size: size,
          color: colors[randInt(0, colors.length - 1)],
          delay: Number((Math.random() * 2).toFixed(2))
        });
        placed = true;
      }
    }
  }
  return sparkles;
}

/**
 * 主页专用：红框区域（扭蛋机周边）内随机散布，不压机头/机身素材（x 132~618 为机器素材带）
 * 上带：机器上方、词条数文字两侧；左右带：紧贴机器轮廓外、y 分段不排竖线
 */
function generateHomeSparkles() {
  return [
    // 上带 2 颗：词条数(x 218~455)两侧空白横带
    ...generateSparkles({
      count: 2,
      xRange: [[-45, 115], [405, 645]],  // 屏幕 30~190 与 480~720
      yRange: [-80, -65],               // 屏幕 425~440（用户中心下、词条数上）
      sizeRange: [16, 30]
    }),
    // 左带 1~2 颗：机器左侧、贴机器（右缘不压机头）
    ...generateSparkles({
      count: randInt(1, 2),
      xRange: [-15, 35],                // 屏幕 60~110rpx
      yRange: [[0, 240], [400, 620]],
      sizeRange: [20, 40],
      minDist: 45
    }),
    // 右带 1~2 颗：机器右侧、贴机器（左缘不压机头）
    ...generateSparkles({
      count: randInt(1, 2),
      xRange: [570, 620],               // 屏幕 645~695rpx
      yRange: [[0, 240], [400, 620]],
      sizeRange: [20, 40],
      minDist: 45
    })
  ];
}

module.exports = { generateSparkles, generateHomeSparkles, THEME_COLORS, MAIN_COLORS, randInt };
