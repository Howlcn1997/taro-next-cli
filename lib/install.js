const which = require("which");
const { exec } = require("./exec");
const { findNpm } = require("./utils");

/**
 * 执行npm install命令, 安装项目依赖.
 */
const install = (cb) => {
  const npm = findNpm();
  console.log("开始安装依赖...");
  exec(which.sync(npm), ["install"], function () {
    console.log("安装成功!");
    cb && cb();
  });
};

module.exports = {
  install,
};
