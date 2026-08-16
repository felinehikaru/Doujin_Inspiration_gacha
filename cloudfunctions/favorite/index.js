const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    // =====================
    // 检查openid
    // =====================
    if (!openid) {
      return {
        success: false,
        data: null,
        message: "未获取用户身份",
        code: "NO_OPENID"
      };
    }

    const action = event.action;

    /*
     =====================
     获取收藏
     =====================
    */
    if (action === "get") {
      const res = await db.collection("favorites")
        .where({
          openid: openid
        })
        .orderBy("createTime", "desc")
        .get();

      return {
        success: true,
        data: res.data,
        message: ""
      };
    }

    /*
     =====================
     添加收藏
     =====================
    */
    if (action === "add") {
      const {
        text,
        entries
      } = event;

      // =====================
      // 参数检查
      // =====================
      if (
        !text ||
        !Array.isArray(entries) ||
        !entries.length
      ) {
        return {
          success: false,
          data: null,
          message: "收藏内容为空",
          code: "EMPTY_DATA"
        };
      }

      // =====================
      // 收藏数量限制30条
      // =====================
      const countRes = await db.collection("favorites")
        .where({
          openid: openid
        })
        .count();

      if (countRes.total >= 30) {
        return {
          success: false,
          data: null,
          message: "收藏数量已达到上限（30条）",
          code: "LIMIT_REACHED"
        };
      }

      // =====================
      // 防止重复收藏
      // =====================
      const exist = await db.collection("favorites")
        .where({
          openid: openid,
          text: text
        })
        .get();

      if (exist.data.length) {
        return {
          success: false,
          data: null,
          message: "已经收藏过了",
          code: "ALREADY_EXISTS"
        };
      }

      await db.collection("favorites")
        .add({
          data: {
            openid: openid,
            text: text,
            entries: entries,
            createTime: Date.now()
          }
        });

      return {
        success: true,
        data: null,
        message: "收藏成功"
      };
    }

    /*
     =====================
     删除收藏
     =====================
    */
    if (action === "delete") {
      const id = event.id;

      if (!id) {
        return {
          success: false,
          data: null,
          message: "缺少收藏ID",
          code: "MISSING_ID"
        };
      }

      const item = await db.collection("favorites")
        .doc(id)
        .get();

      if (!item.data) {
        return {
          success: false,
          data: null,
          message: "收藏不存在",
          code: "NOT_FOUND"
        };
      }

      if (item.data.openid !== openid) {
        return {
          success: false,
          data: null,
          message: "无权限删除",
          code: "NO_PERMISSION"
        };
      }

      await db.collection("favorites")
        .doc(id)
        .remove();

      return {
        success: true,
        data: null,
        message: "删除成功"
      };
    }

    // =====================
    // 未知操作
    // =====================
    return {
      success: false,
      data: null,
      message: "未知操作",
      code: "INVALID_ACTION"
    };

  } catch (err) {
    console.error("favorite错误:", err);

    return {
      success: false,
      data: null,
      message: err.message || "收藏操作失败",
      code: "SERVER_ERROR"
    };
  }
};