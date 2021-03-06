const { promisify } = require("util");
const ora = require("ora");

/**
 * 从git仓库上下载项目到本地
 * @param {String} repo git仓库地址
 * @param {String} desc 本地的路径
 */
const clone = async function (repo, desc) {
  const download = promisify(require("download-git-repo"));
  const process = ora(`正在从 ${repo} 中下载...`);
  process.start();
  try {
    await download(repo, desc);
    process.succeed();
  } catch (error) {
    process.fail(error.message);
  }
};

module.exports = {
  clone,
};
