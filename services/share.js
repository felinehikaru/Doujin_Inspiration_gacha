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
// 分享卡片
// =====================
function onShareAppMessage(page) {
  let title = "灵感扭蛋机";
  let path = "/pages/index/index";

  if (page.data.results.length) {
    title = "我摇到了：" + page.data.results
      .map(item => item.text)
      .join("、");
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
      return (
        `灵感词${index + 1}：
${item.text}

分类：
${item.category}

描述：
${item.desc}

标签：
${item.tags.join("、")}`
      );
    })
    .join("\n\n");

  const shareText =
    `灵感扭蛋机

我抽到的灵感：

${text}

快来一起摇一个吧！`;

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
  const query = wx.createSelectorQuery();

  query.select("#shareCanvas")
    .fields({
      node: true,
      size: true
    })
    .exec(res => {
      const canvas = res[0].node;
      const ctx = canvas.getContext("2d");

      const width = 750;
      const height = 1100;

      canvas.width = width;
      canvas.height = height;

      let bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#181225");
      bg.addColorStop(1, "#050505");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 56px sans-serif";
      ctx.fillText("灵感扭蛋机", width / 2, 100);

      ctx.font = "32px sans-serif";
      ctx.fillStyle = "#c8a6ff";
      ctx.fillText("我的灵感组合", width / 2, 160);

      const categoryName = {
        world: "世界背景",
        relationship: "关系设定",
        character: "角色身份",
        conflict: "冲突矛盾",
        scene: "特殊场景",
        theme: "主题氛围"
      };

      let y = 240;

      page.data.results.forEach((item, index) => {
        ctx.fillStyle = "#272038";
        ctx.beginPath();
        ctx.roundRect(50, y, 650, 220, 25);
        ctx.fill();

        ctx.fillStyle = "#d8b4fe";
        ctx.font = "bold 36px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("灵感 " + (index + 1), 80, y + 50);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 38px sans-serif";
        ctx.fillText(item.text, 80, y + 100);

        ctx.fillStyle = "#e9a8c7";
        ctx.font = "26px sans-serif";
        ctx.fillText("分类：" + categoryName[item.category], 80, y + 140);

        ctx.fillStyle = "#cccccc";
        ctx.font = "24px sans-serif";
        ctx.fillText(item.desc || "", 80, y + 175);

        ctx.fillStyle = "#bda8ff";
        ctx.font = "22px sans-serif";
        if (item.tags) {
          ctx.fillText("#" + item.tags.join(" #"), 80, y + 205);
        }

        y += 250;
      });

      ctx.textAlign = "center";
      ctx.fillStyle = "#aaa";
      ctx.font = "24px sans-serif";
      ctx.fillText("摇出你的故事灵感", width / 2, 1060);

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
            }
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