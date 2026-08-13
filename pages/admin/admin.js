Page({
  data: {
    pendingList: [],
    loading: false,

    // 编辑弹窗
    showEdit: false,
    editId: "",
    editText: "",
    editDesc: "",
    editCategory: "",
    editTags: "",

    categoryList: [{
        value: "world",
        name: "世界背景"
      },
      {
        value: "relationship",
        name: "关系设定"
      },
      {
        value: "character",
        name: "角色身份"
      },
      {
        value: "conflict",
        name: "冲突矛盾"
      },
      {
        value: "scene",
        name: "特殊场景"
      },
      {
        value: "theme",
        name: "主题氛围"
      }
    ]
  },

  getCategoryName(value) {

    const item = this.data.categoryList.find(
      i => i.value === value
    );

    return item ? item.name : "";

  },

  onShow() {
    const app = getApp();
    const role = app.globalData.role;

    if (role !== "admin" && role !== "maintainer") {
      wx.showToast({
        title: "无权限",
        icon: "none"
      });

      setTimeout(() => {
        wx.navigateBack();
      }, 800);

      return;
    }

    this.loadPending();
  },

  // =====================
  // 获取待审核列表
  // =====================
  async loadPending() {
    try {
      const res = await wx.cloud.callFunction({
        name: "getPendingEntries"
      });

      console.log("getPendingEntries返回:", res);

      if (res.result.success) {
        const list = res.result.data.map(item => {
          if (item.submitTime) {
            const date = new Date(item.submitTime);
            item.submitTimeText =
              `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
          } else {
            item.submitTimeText = "";
          }
        
          // 分类中文显示
          item.categoryName = this.getCategoryName(item.category);
        
          return item;
        });

        this.setData({
          pendingList: list
        });
      }
    } catch (err) {
      console.error("加载失败:", err);
    }
  },

  // =====================
  // 打开编辑窗口
  // =====================
  editEntry(e) {
    const item = e.currentTarget.dataset.item;

    this.setData({
      showEdit: true,
      editId: item._id,
      editText: item.text || "",
      editDesc: item.desc || "",
      editCategory: item.category || "",
      editCategoryName: this.getCategoryName(item.category),
      editTags: (item.tags || []).join(",")
    });
  },

  // =====================
  // 编辑输入

  onEditText(e) {
    this.setData({
      editText: e.detail.value
    });
  },

  onEditDesc(e) {
    this.setData({
      editDesc: e.detail.value
    });
  },

  onEditTags(e) {
    this.setData({
      editTags: e.detail.value
    });
  },

  // =====================
  // 分类选择

  onCategoryChange(e) {
    const index = e.detail.value;
  
    this.setData({
      editCategory: this.data.categoryList[index].value,
      editCategoryName: this.data.categoryList[index].name
    });
  },

  // =====================
  // 关闭编辑

  closeEdit() {
    this.setData({
      showEdit: false,
      editId: "",
      editText: "",
      editDesc: "",
      editCategory: "",
      editTags: ""
    });
  },

  // =====================
  // 保存修改

  async saveEdit() {
    if (!this.data.editText) {
      wx.showToast({
        title: "词条名称不能为空",
        icon: "none"
      });
      return;
    }

    const tags = this.data.editTags
      .split(",")
      .map(item => item.trim())
      .filter(item => item);

    try {
      const res = await wx.cloud.callFunction({
        name: "updatePendingEntry",
        data: {
          entryId: this.data.editId,
          text: this.data.editText,
          desc: this.data.editDesc,
          category: this.data.editCategory,
          tags: tags
        }
      });

      if (res.result.success) {
        wx.showToast({
          title: "修改成功",
          icon: "success"
        });
        this.closeEdit();
        this.loadPending();
      } else {
        wx.showToast({
          title: res.result.message || "修改失败",
          icon: "none"
        });
      }
    } catch (err) {
      console.log("修改失败", err);
      wx.showToast({
        title: "修改失败",
        icon: "none"
      });
    }
  },

  // =====================
  // 审核通过

  async approveEntry(e) {
    const id = e.currentTarget.dataset.id;

    this.setData({
      loading: true
    });

    try {
      const res = await wx.cloud.callFunction({
        name: "approveEntry",
        data: {
          entryId: id,
          action: "approve"
        }
      });

      if (res.result.success) {
        wx.showToast({
          title: "已通过",
          icon: "success"
        });
        this.loadPending();
      }
    } catch (err) {
      wx.showToast({
        title: "操作失败",
        icon: "none"
      });
    }

    this.setData({
      loading: false
    });
  },

  // =====================
  // 拒绝

  async rejectEntry(e) {
    const id = e.currentTarget.dataset.id;

    this.setData({
      loading: true
    });

    try {
      const res = await wx.cloud.callFunction({
        name: "approveEntry",
        data: {
          entryId: id,
          action: "reject"
        }
      });

      if (res.result.success) {
        wx.showToast({
          title: "已拒绝",
          icon: "success"
        });
        this.loadPending();
      }
    } catch (err) {
      wx.showToast({
        title: "操作失败",
        icon: "none"
      });
    }

    this.setData({
      loading: false
    });
  }
});