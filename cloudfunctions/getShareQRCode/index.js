const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async () => {
  try {

    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: "share=1",
      page: "pages/index/index",
      width: 430
    });

    console.log("二维码生成成功");
    console.log(result);

    return {
      success: true,
      buffer: result.buffer
    };

  } catch (err) {

    console.error("二维码生成失败", err);

    return {
      success: false,
      error: err.message || JSON.stringify(err)
    };

  }
};