const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event) => {
  try {
    const openid = cloud.getWXContext().OPENID;

    if (!openid) {
      return {
        success: false,
        message: "未获取用户身份"
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
        data: res.data
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
          message: "收藏数量已达到上限（30条）"
        };
      }

      if (!text || !Array.isArray(entries) || !entries.length) {
        return {
          success: false,
          message: "收藏内容为空"
        };
      }

      // 防止重复收藏
      const exist = await db.collection("favorites")
        .where({
          openid: openid,
          text: text
        })
        .get();

      if (exist.data.length) {
        return {
          success: false,
          message: "已经收藏过了"
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
          message: "缺少收藏ID"
        };
      }

      const item = await db.collection("favorites")
        .doc(id)
        .get();

      if (!item.data) {
        return {
          success: false,
          message: "收藏不存在"
        };
      }

      if (item.data.openid !== openid) {
        return {
          success: false,
          message: "无权限删除"
        };
      }

      await db.collection("favorites")
        .doc(id)
        .remove();

      return {
        success: true,
        message: "删除成功"
      };
    }

    return {
      success: false,
      message: "未知操作"
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: err.message
    };
  }
};