const childProcess = require("child_process");

/**
 * 开启子进程来执行命令
 * @param {String} cmd 待执行的命令
 * @param {Array} args 命令执行时的参数.
 * @param {Function} fn 执行完成时的回调.
 */
function exec(cmd, args = [], cb) {
  const runner = childProcess.spawn(cmd, args, {
    stdio: "inherit",
  });

  runner.on("close", function (code) {
    cb && cb(code);
  });
}

module.exports = {
  exec,
};
