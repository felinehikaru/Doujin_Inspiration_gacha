/**
 * 分享相关业务
 *
 * 包含：
 * copyCurrentResult
 * onShareAppMessage
 * openSharePanel
 * closeSharePanel
 * copyShareText
 * createShareImage
 */

const categoryConfig = require("../utils/category.js");

// =====================
// 复制当前结果
// =====================
function copyCurrentResult(page) {
  if (!page.data.results.length) {
    return;
  }

  const text = page.data.results
    .map(item => item.text)
    .join(" + ");

  wx.setClipboardData({
    data: text,

    success() {
      wx.showToast({
        title: "已复制",
        icon: "success"
      });
    }
  });
}

// =====================
// 记录分享成就（登录用户）
// =====================
function recordShare(page) {
  console.log("[分享成就] 开始记录，role =", page && page.data.role);

  if (!page) return;

  // =====================
  // 本地即时记录（游客也记录，登录后可见并同步云端）
  // =====================
  const KEY = "localAchievementProgress";
  let progress = wx.getStorageSync(KEY);

  if (!progress || typeof progress !== "object") {
    progress = { inProgress: {}, unlockedAchievements: [] };
  }

  progress.inProgress = progress.inProgress || {};
  progress.unlockedAchievements =
    Array.isArray(progress.unlockedAchievements)
      ? progress.unlockedAchievements
      : [];

  progress.inProgress.shareCount =
    Number(progress.inProgress.shareCount) + 1 || 1;

  const unlockedIds = progress.unlockedAchievements
    .map(item => typeof item === "string" ? item : item.id);

  if (!unlockedIds.includes("share_first")) {
    progress.unlockedAchievements.push({
      id: "share_first",
      achievedAt: new Date()
    });

    wx.setStorageSync(KEY, progress);

    // 立即弹恭喜窗（本地判定，不依赖云端返回）
    console.log("[分享成就] 本地解锁 share_first，立即弹窗");
    if (page.checkAchievementsNotify) {
      page.checkAchievementsNotify("share_first");
    }
  } else {
    wx.setStorageSync(KEY, progress);
    console.log("[分享成就] 本地已解锁过 share_first");
  }

  // =====================
  // 云端异步同步（游客也上传，按 openid 记录；登录后同 openid 自动关联恢复）
  // =====================
  wx.cloud.callFunction({
    name: "achievements",
    data: { action: "recordShare" }
  }).then(res => {
    console.log("[分享成就] 云端返回:", JSON.stringify(res.result));
  }).catch(err => {
    console.log("[分享成就] 云端同步失败(不影响本地):", err);
  });
}

// =====================
// 微信分享
// =====================
function onShareAppMessage(page) {
  let title = "灵感扭蛋机";
  const path = "/pages/index/index";

  if (page.data.results.length) {
    title =
      "我摇到了：" +
      page.data.results
        .map(item => item.text)
        .join("、");
  }

  // 分享抽卡结果：记录分享成就（首次分享解锁"我也要吗"）
  if (page.data.results.length) {
    recordShare(page);
  }

  return {
    title,
    path
  };
}

// =====================
// 打开分享面板
// =====================
function openSharePanel(page) {
  page.setData({
    showSharePanel: true
  });
}

// =====================
// 关闭分享面板
// =====================
function closeSharePanel(page) {
  page.setData({
    showSharePanel: false
  });
}

// =====================
// 复制分享文字
// =====================
function copyShareText(page) {
  if (!page.data.results.length) {
    wx.showToast({
      title: "没有抽卡结果",
      icon: "none"
    });
    return;
  }

  const text = page.data.results
    .map((item, index) => {
      // 健壮提取标签：兼容 tags/tag/labels 字段，兼容数组和字符串格式
      let tags = "";
      const tagField = item.tags || item.tag || item.labels || item.label;
      if (Array.isArray(tagField)) {
        tags = tagField.filter(t => t && String(t).trim()).join("、");
      } else if (tagField && typeof tagField === "string") {
        tags = tagField.trim();
      }

      return `灵感词${index + 1}：
${item.text}

描述：
${item.desc || ""}

标签：
${tags}`;
    })
    .join("\n\n");

  const shareText =
    `灵感扭蛋机

我抽到的灵感：

${text}

快来一起摇一个吧！`;

  // 复制分享文字：视为一次分享
  recordShare(page);

  wx.setClipboardData({
    data: shareText,

    success() {
      wx.showToast({
        title: "分享文字已复制",
        icon: "success"
      });
    }
  });
}

// =====================
// Canvas 图片分享
// =====================
function createShareImage(page) {
  if (!page.data.results.length) {
    wx.showToast({
      title: "没有抽卡结果",
      icon: "none"
    });
    return;
  }

  // 点击图片分享：记录分享成就（首次分享解锁"我也要吗"）
  recordShare(page);

  const query = wx.createSelectorQuery();

  query
    .select("#shareCanvas")
    .fields({
      node: true,
      size: true
    })
    .exec(res => {
      if (!res || !res[0]) {
        wx.showToast({
          title: "分享图片生成失败",
          icon: "none"
        });
        return;
      }

      const canvas = res[0].node;
      const ctx = canvas.getContext("2d");

      const width = 750;
      const cardX = 50;
      const cardW = 650;
      const textX = 80;
      const textMaxW = cardW - 60; // 文字可用宽度 590px

      // ===== 第一步：测量每个词条描述的行数，动态计算卡片高度 =====
      ctx.font = "24px sans-serif"; // 临时设置字体用于测量

      const cardData = page.data.results.map((item, index) => {
        const desc = item.desc || "";
        // 手动按宽度换行
        const lines = [];
        let line = "";
        for (let i = 0; i < desc.length; i++) {
          const test = line + desc[i];
          if (ctx.measureText(test).width > textMaxW && line) {
            lines.push(line);
            line = desc[i];
          } else {
            line = test;
          }
        }
        if (line) lines.push(line);

        // 卡片高度：固定区域250px + 描述行数*30px
        const descH = lines.length * 30;
        const cardH = 250 + descH;

        return { item, index, lines, cardH };
      });

      // 总高度：顶部240 + 所有卡片 + 卡片间距30*(n-1) + 底部80
      const topH = 240;
      const gap = 30;
      const bottomH = 80;
      const cardsTotalH = cardData.reduce((s, c) => s + c.cardH, 0);
      const gapsTotalH = gap * Math.max(0, cardData.length - 1);
      const height = topH + cardsTotalH + gapsTotalH + bottomH;

      // ===== 第二步：设置正式尺寸并绘制 =====
      canvas.width = width;
      canvas.height = height;

      // 背景
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#f8f7ff");
      bg.addColorStop(1, "#fff7ef");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 标题
      ctx.textAlign = "center";
      ctx.fillStyle = "#493d61";
      ctx.font = "bold 56px sans-serif";
      ctx.fillText("灵感扭蛋机", width / 2, 100);
      ctx.font = "32px sans-serif";
      ctx.fillStyle = "#8d7ca6";
      ctx.fillText("我的灵感组合", width / 2, 160);

      // 结果卡片
      let y = topH;
      cardData.forEach(({ item, index, lines, cardH }) => {
        // 卡片背景
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(cardX, y, cardW, cardH, 25);
        ctx.fill();

        // 灵感N
        ctx.fillStyle = "#70b8cf";
        ctx.font = "bold 36px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("灵感 " + (index + 1), textX, y + 55);

        // 词条名
        ctx.fillStyle = "#30343b";
        ctx.font = "bold 38px sans-serif";
        ctx.fillText(item.text || "", textX, y + 105);

        // 分类
        ctx.fillStyle = "#70a9bd";
        ctx.font = "26px sans-serif";
        ctx.fillText(
          "分类：" + categoryConfig.getName(item.category),
          textX,
          y + 145
        );

        // 描述（多行）
        ctx.fillStyle = "#777777";
        ctx.font = "24px sans-serif";
        lines.forEach((line, li) => {
          ctx.fillText(line, textX, y + 185 + li * 30);
        });

        // 标签
        const tagsY = y + 185 + lines.length * 30 + 10;
        ctx.fillStyle = "#8b8b8b";
        ctx.font = "22px sans-serif";
        if (Array.isArray(item.tags)) {
          ctx.fillText(
            "#" + item.tags.join(" #"),
            textX,
            tagsY
          );
        }

        y += cardH + gap;
      });

      // 底部文字
      ctx.textAlign = "center";
      ctx.fillStyle = "#999999";
      ctx.font = "24px sans-serif";
      ctx.fillText("摇出你的故事灵感", width / 2, height - 35);

      // ===== 保存图片 =====
      wx.canvasToTempFilePath({
        canvas,

        success(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,

            success() {
              wx.showToast({
                title: "图片已保存",
                icon: "success"
              });
            },

            fail() {
              wx.showToast({
                title: "保存图片失败",
                icon: "none"
              });
            }
          });
        },

        fail() {
          wx.showToast({
            title: "图片生成失败",
            icon: "none"
          });
        }
      });
    });
}

module.exports = {
  copyCurrentResult,
  onShareAppMessage,
  openSharePanel,
  closeSharePanel,
  copyShareText,
  createShareImage
};