const chalk = require("chalk");
const which = require("which");
/**
 * 查找系统中用于安装依赖包的命令
 */
function findNpm() {
  const npms = ["tnpm", "cnpm", "npm"];
  for (let i = 0; i < npms.length; i++) {
    try {
      // 查找环境变量下指定的可执行文件的第一个实例
      which.sync(npms[i]);
      return npms[i];
    } catch (e) {}
  }
  throw new Error(chalk.red("请先安装 npm"));
}

module.exports = {
  findNpm,
};
