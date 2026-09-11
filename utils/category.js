/**
 * 全局分类配置
 */

const categories = [
  {
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
];

// value 转名称
function getName(value) {
  const item = categories.find(item => item.value === value);
  return item ? item.name : value;
}

// 名称转 value
function getValue(name) {
  const item = categories.find(item => item.name === name);
  return item ? item.value : name;
}

module.exports = {
  list: categories,
  getName,
  getValue
};