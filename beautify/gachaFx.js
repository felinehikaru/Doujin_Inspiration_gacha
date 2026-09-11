/**
 * gachaFx.js — 抽卡光效系统（独立封装）
 * 包含：Canvas 初始化、柔光白金光晕、浓金光晕跟随两半、光芒粒子、中心亮核、散布光点、金球绘制与裂开动画
 * 用法：
 *   const GachaFx = require("../../utils/gachaFx.js");
 *   this._gachaFx = new GachaFx(this);
 *   this._gachaFx.init("#gachaFx");   // onReady
 *   this._gachaFx.play();              // 抽卡时
 *   this._gachaFx.stop();              // 结束时
 */

class GachaFx {
  constructor(page) {
    this.page = page;
    this._fxCtx = null;
    this._fxCanvas = null;
    this._fxWidth = 0;
    this._fxHeight = 0;
    this._fxPx = 1;
    this._fxRaf = null;
  }

  /** 初始化 canvas（onReady 时调用） */
  init(canvasId) {
    wx.createSelectorQuery()
      .in(this.page)
      .select(canvasId)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res && res[0] && res[0].node) this._setup(res[0]);
      });
  }

  /** 配置 canvas 尺寸和上下文 */
  _setup(field) {
    const canvas = field.node;
    // 真机上 fields({size}) 可能返回 0/undefined，用 machine-core 的默认逻辑尺寸兜底
    // （machine-core 600x650rpx，按 750 设计宽折算 0.5px/rpx）
    let width = field.width || 300;
    let height = field.height || 325;
    const dpr = wx.getWindowInfo
      ? wx.getWindowInfo().pixelRatio
      : wx.getSystemInfoSync().pixelRatio || 2;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    this._fxCanvas = canvas;
    this._fxCtx = ctx;
    this._fxWidth = width;
    this._fxHeight = height;
    this._fxPx = width / 600;
  }

  /** canvas 是否已就绪（真机上 Canvas 2D node 可能拿不到，用于决定是否走 DOM 兜底动画） */
  isReady() {
    return !!this._fxCtx;
  }

  /** 播放光效（如果 canvas 未初始化则先初始化） */
  play() {
    if (this._fxCtx) { this._run(); return; }
    wx.createSelectorQuery()
      .in(this.page)
      .select("#gachaFx")
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res && res[0] && res[0].node) {
          this._setup(res[0]);
          this._run();
        }
      });
  }

  /** 运行动画帧循环 */
  _run() {
    const ctx = this._fxCtx;
    const width = this._fxWidth;
    const height = this._fxHeight;
    const px = this._fxPx;
    const cx = 300 * px;
    const cy0 = 537 * px;
    const cy1 = 565 * px;
    const start = Date.now();
    const dur = 1500;
    const canvas = this._fxCanvas;
    const raf = canvas && canvas.requestAnimationFrame
      ? (cb) => canvas.requestAnimationFrame(cb)
      : (cb) => setTimeout(cb, 16);
    const caf = canvas && canvas.cancelAnimationFrame
      ? (id) => canvas.cancelAnimationFrame(id)
      : (id) => clearTimeout(id);
    const step = () => {
      const t = Date.now() - start;
      const p = Math.min(t / dur, 1);
      const drop = Math.min(p / 0.22, 1);
      const cy = cy0 + (cy1 - cy0) * drop;
      ctx.clearRect(0, 0, width, height);
      this._drawFrame(ctx, cx, cy, px, p);
      if (p < 1) {
        this._fxRaf = raf(step);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };
    if (this._fxRaf) caf(this._fxRaf);
    this._fxRaf = raf(step);
  }

  /** 绘制单帧光效 + 金球 */
  _drawFrame(ctx, cx, cy, px, p) {
    const ease = p;
    const fadeIn = Math.min(p / 0.12, 1);
    const dispStart = 0.5;
    const disp = Math.max((p - dispStart) / (1 - dispStart), 0);
    const fadeOut = 1 - disp;
    const global = fadeIn * fadeOut;
    const expand = 1 + disp * 0.25;
    ctx.globalCompositeOperation = "lighter";

    // 1. 四层白金光晕
    const haloLayers = [
      { r: (50 + 75 * ease), a: 0.35 },
      { r: (70 + 110 * ease), a: 0.22 },
      { r: (90 + 140 * ease), a: 0.1 },
      { r: (105 + 160 * ease), a: 0.05 },
    ];
    for (const layer of haloLayers) {
      const hr = layer.r * px * expand;
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, hr);
      hg.addColorStop(0, `rgba(255,253,240,${layer.a * global})`);
      hg.addColorStop(0.35, `rgba(255,247,210,${layer.a * 0.55 * global})`);
      hg.addColorStop(0.7, `rgba(255,238,180,${layer.a * 0.2 * global})`);
      hg.addColorStop(0.9, `rgba(255,228,160,${layer.a * 0.05 * global})`);
      hg.addColorStop(1, "rgba(255,228,160,0)");
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(cx, cy, hr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 1.5 浓金色光晕（裂开后跟随两半球向外晕染散开）
    const halfStartFx = 0.28;
    const halfDurFx = 0.72;
    const hpFx = Math.max((p - halfStartFx) / halfDurFx, 0);
    const epFx = hpFx * hpFx * (3 - 2 * hpFx);
    const txFx = 85 * px * epFx;
    const goldR = (65 + 120 * ease) * px * expand * (1 + 0.3 * epFx);
    const drawGoldHalo = (gx, gy, mul) => {
      const gg = ctx.createRadialGradient(gx, gy, 0, gx, gy, goldR);
      gg.addColorStop(0, `rgba(255,200,60,${0.5 * global * mul})`);
      gg.addColorStop(0.25, `rgba(255,185,40,${0.3 * global * mul})`);
      gg.addColorStop(0.5, `rgba(255,175,35,${0.16 * global * mul})`);
      gg.addColorStop(0.7, `rgba(255,165,25,${0.06 * global * mul})`);
      gg.addColorStop(0.9, `rgba(255,160,20,${0.02 * global * mul})`);
      gg.addColorStop(1, "rgba(255,160,20,0)");
      ctx.fillStyle = gg;
      ctx.beginPath();
      ctx.arc(gx, gy, goldR, 0, Math.PI * 2);
      ctx.fill();
    };
    drawGoldHalo(cx, cy, epFx > 0 ? 0.35 : 1);
    if (epFx > 0) {
      drawGoldHalo(cx - txFx, cy, 1);
      drawGoldHalo(cx + txFx, cy, 1);
    }

    // 2. 细小光芒粒子（24道，两层叠加做边缘模糊）
    const rayCount = 24;
    for (let i = 0; i < rayCount; i++) {
      const seed = ((i * 37) % 100) / 100;
      const ang = (i / rayCount) * Math.PI * 2 + seed * 0.35;
      const rayLen = (70 + 145 * ease) * px * (0.5 + seed * 0.5) * expand;
      const rayW = (2.5 + 5.5 * seed) * px;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);
      const rgOuter = ctx.createLinearGradient(0, 0, rayLen, 0);
      rgOuter.addColorStop(0, `rgba(255,255,250,${0.14 * global})`);
      rgOuter.addColorStop(0.3, `rgba(255,248,215,${0.08 * global})`);
      rgOuter.addColorStop(0.7, `rgba(255,240,185,${0.035 * global})`);
      rgOuter.addColorStop(1, "rgba(255,230,160,0)");
      ctx.fillStyle = rgOuter;
      ctx.beginPath();
      ctx.ellipse(rayLen * 0.4, 0, rayLen * 0.45, rayW * 2.8, 0, 0, Math.PI * 2);
      ctx.fill();
      const rgInner = ctx.createLinearGradient(0, 0, rayLen, 0);
      rgInner.addColorStop(0, `rgba(255,255,250,${0.26 * global})`);
      rgInner.addColorStop(0.3, `rgba(255,248,215,${0.14 * global})`);
      rgInner.addColorStop(0.7, `rgba(255,240,185,${0.055 * global})`);
      rgInner.addColorStop(1, "rgba(255,230,160,0)");
      ctx.fillStyle = rgInner;
      ctx.beginPath();
      ctx.ellipse(rayLen * 0.4, 0, rayLen * 0.45, rayW, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. 中心亮核（裂开后跟随两半球，模糊边缘）
    const rCore = (20 + 14 * ease) * px * (1 + 0.25 * epFx);
    const drawCore = (gx, gy, mul) => {
      const gc = ctx.createRadialGradient(gx, gy, 0, gx, gy, rCore * 2.2);
      gc.addColorStop(0, `rgba(255,255,255,${0.75 * global * mul})`);
      gc.addColorStop(0.35, `rgba(255,252,235,${0.45 * global * mul})`);
      gc.addColorStop(0.65, `rgba(255,248,215,${0.18 * global * mul})`);
      gc.addColorStop(1, "rgba(255,240,200,0)");
      ctx.fillStyle = gc;
      ctx.beginPath();
      ctx.arc(gx, gy, rCore * 2.2, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCore(cx, cy, epFx > 0 ? 0.35 : 1);
    if (epFx > 0) {
      drawCore(cx - txFx, cy, 1);
      drawCore(cx + txFx, cy, 1);
    }

    // 4. 散布光点（8个）
    const n = 8;
    for (let i = 0; i < n; i++) {
      const seed = ((i * 47) % 100) / 100;
      const ang = -Math.PI * 0.7 + seed * Math.PI * 1.4;
      const fly = (60 + 160 * ease) * px * (0.45 + seed * 0.55) * (1 + disp * 0.8);
      const x = cx + Math.cos(ang) * fly;
      const y = cy + Math.sin(ang) * fly * 0.85;
      const tw = 0.6 + 0.4 * Math.sin(p * 12 + seed * 6.28);
      const size = (1.5 + seed * 2) * px;
      const alpha = 0.35 * global * tw;
      const pg = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      pg.addColorStop(0, `rgba(255,255,248,${alpha})`);
      pg.addColorStop(0.5, `rgba(255,242,200,${alpha * 0.5})`);
      pg.addColorStop(1, "rgba(255,230,170,0)");
      ctx.fillStyle = pg;
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. 金球（canvas 内部绘制，先画光效后画球，层级正确）
    ctx.globalCompositeOperation = "source-over";
    const ballR = 45 * px;
    let scale = 1;
    if (p < 0.1) scale = 0.2 + 0.9 * (p / 0.1);
    else if (p < 0.18) scale = 1.1 - 0.1 * ((p - 0.1) / 0.08);
    else if (p < 0.26) scale = 1 - 0.05 * ((p - 0.18) / 0.08);
    else if (p < 0.34) scale = 0.95 + 0.09 * ((p - 0.26) / 0.08);
    else if (p < 0.42) scale = 1.04 - 0.04 * ((p - 0.34) / 0.08);
    const r = ballR * scale;
    const halfStart = 0.28;
    const halfDur = 0.72;

    const drawBall = (x, y, rad, op) => {
      const bg = ctx.createRadialGradient(x - rad * 0.25, y - rad * 0.35, 0, x, y, rad);
      bg.addColorStop(0, `rgba(255,252,240,${op})`);
      bg.addColorStop(0.28, `rgba(255,240,195,${op})`);
      bg.addColorStop(0.55, `rgba(250,222,155,${op})`);
      bg.addColorStop(0.82, `rgba(228,198,130,${op})`);
      bg.addColorStop(1, `rgba(195,165,105,${op})`);
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.save();
      ctx.translate(x - rad * 0.35, y - rad * 0.4);
      ctx.rotate(-0.3);
      const hl = ctx.createRadialGradient(0, 0, 0, 0, 0, rad * 0.35);
      hl.addColorStop(0, `rgba(255,255,255,${0.55 * op})`);
      hl.addColorStop(0.5, `rgba(255,255,245,${0.22 * op})`);
      hl.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = hl;
      ctx.beginPath();
      ctx.ellipse(0, 0, rad * 0.28, rad * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      const sh = ctx.createRadialGradient(x, y + rad * 0.5, 0, x, y + rad * 0.5, rad * 0.75);
      sh.addColorStop(0, `rgba(165,135,85,${0.18 * op})`);
      sh.addColorStop(1, "rgba(165,135,85,0)");
      ctx.fillStyle = sh;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    };

    if (p < halfStart) {
      drawBall(cx, cy, r, 1);
    } else {
      const hp = Math.min((p - halfStart) / halfDur, 1);
      const ep = hp * hp * (3 - 2 * hp);
      const rot = 58 * Math.PI / 180 * ep;
      const tx = 85 * px * ep;
      const op = (1 - ep) * fadeOut;
      ctx.save();
      ctx.translate(cx - tx, cy);
      ctx.rotate(-rot);
      ctx.beginPath();
      ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, true);
      ctx.closePath();
      ctx.clip();
      drawBall(0, 0, r, op);
      ctx.restore();
      ctx.save();
      ctx.translate(cx + tx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
      ctx.closePath();
      ctx.clip();
      drawBall(0, 0, r, op);
      ctx.restore();
    }
  }

  /** 停止光效并清空 canvas */
  stop() {
    const canvas = this._fxCanvas;
    const caf = canvas && canvas.cancelAnimationFrame
      ? (id) => canvas.cancelAnimationFrame(id)
      : (id) => clearTimeout(id);
    if (this._fxRaf) {
      caf(this._fxRaf);
      this._fxRaf = null;
    }
    if (this._fxCtx) {
      this._fxCtx.clearRect(0, 0, this._fxWidth, this._fxHeight);
    }
  }
}

module.exports = GachaFx;
