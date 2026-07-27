const fs = require("fs");
const entries = require("./entries");

const jsonl = entries
  .map(item => JSON.stringify(item))
  .join("\n");

fs.writeFileSync(
  "../entries.json",
  jsonl,
  "utf8"
);

console.log("导出完成，共", entries.length, "条");