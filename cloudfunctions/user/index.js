const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// =====================
// 查身份（原 checkRole）
// =====================
async function checkRole(openid) {
  if (!openid) {
    return {
      success: false,
      data: null,
      message: "没有获取到openid",
      code: "NO_OPENID"
    };
  }

  const res = await db.collection("users")
    .where({ openid })
    .get();

  // 未注册
  if (res.data.length === 0) {
    return {
      success: true,
      data: {
        role: "visitor",
        isRegister: false,
        user: null
      },
      message: ""
    };
  }

  // 已注册；已登出（loggedOut=true）时按游客返回，但仍标记已注册（可重新登录）
  const user = res.data[0];
  const role = user.loggedOut === true ? "visitor" : (user.role || "visitor");

  return {
    success: true,
    data: {
      role: role,
      isRegister: true,
      user: user
    },
    message: ""
  };
}

// =====================
// 注册 / 重新登录（原 registerUser）
// =====================
async function register(openid, event) {
  if (!openid) {
    return {
      success: false,
      message: "openid不存在"
    };
  }

  const exist = await db.collection("users")
    .where({ openid })
    .get();

  if (exist.data.length) {
    // 重新登录：清除登出标记，恢复身份；老账号顺带补写微信昵称/头像
    const upd = { loggedOut: false };
    if (event && event.nickname) {
      upd.nickname = event.nickname;
    }
    if (event && event.avatar) {
      upd.avatar = event.avatar;
    }

    await db.collection("users")
      .doc(exist.data[0]._id)
      .update({
        data: upd
      });

    return {
      success: true,
      message: "已注册",
      role: exist.data.role,
      isRegister: true,
      nickname: exist.data.nickname || (event && event.nickname) || ""
    };
  }

  await db.collection("users")
    .add({
      data: {
        openid,
        role: "user",
        nickname: (event && event.nickname) || "",
        avatar: (event && event.avatar) || "",
        createTime: new Date()
      }
    });

  return {
    success: true,
    message: "注册成功"
  };
}

// =====================
// 登出（原 logoutUser）：users 记录标记 loggedOut
// =====================
async function logout(openid) {
  if (!openid) {
    return {
      success: false,
      message: "未获取用户身份"
    };
  }

  const res = await db.collection("users")
    .where({ openid })
    .update({
      data: { loggedOut: true }
    });

  return {
    success: true,
    message: "已退出登录",
    updated: res.stats ? res.stats.updated : 0
  };
}

// =====================
// 注销账号（原 deleteUser）：删除该 openid 全部个人数据
// =====================
async function removeUserData(collectionName, openid) {
  const result = await db.collection(collectionName).where({ openid }).remove();
  return result.stats && result.stats.removed ? result.stats.removed : 0;
}

async function deleteAccount(openid) {
  if (!openid) {
    return { success: false, message: "未获取用户身份" };
  }

  const [favorites, pendingEntries, userEntries, achievementProgress, users] = await Promise.all([
    removeUserData("favorites", openid),
    removeUserData("pending_entries", openid),
    removeUserData("user_entries", openid),
    removeUserData("achievement_progress", openid),
    removeUserData("users", openid)
  ]);

  return {
    success: true,
    message: "账号及相关数据已注销",
    removed: { favorites, pendingEntries, userEntries, achievementProgress, users }
  };
}

// =====================
// 统一入口：event.action 分发
// =====================
exports.main = async (event) => {
  const openid = cloud.getWXContext().OPENID;
  const action = event && event.action;

  try {
    switch (action) {
      case "checkRole":
        return await checkRole(openid);
      case "register":
        return await register(openid, event);
      case "logout":
        return await logout(openid);
      case "deleteAccount":
        return await deleteAccount(openid);
      default:
        return {
          success: false,
          message: "未知操作: " + action
        };
    }
  } catch (err) {
    console.error("user云函数错误:", action, err);
    return {
      success: false,
      message: err.message || "操作失败",
      code: "SERVER_ERROR"
    };
  }
};
