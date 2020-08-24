#!/usr/bin/env node

const path = require("path");
const program = require("commander");
const inquirer = require("inquirer");
const { updateFile } = require("../lib/file");
const { install } = require("../lib/install");
const { clone } = require("../lib/download");

// 定义和用户交互时的questions
const questions = [
  {
    type: "input",
    name: "author",
    message: "请输入作者的名称:",
  },
  {
    type: "input",
    name: "description",
    message: "请输入项目介绍:",
  },
  {
    type: "input",
    name: "version",
    message: "请输入项目版本号:",
  },
  {
    type: "confirm",
    name: "isOk",
    message: "请确认输入是否ok?",
  },
];

program.version(require("../package.json").version, "-v, --version");

program.command("init <ProjectName>").action((projectName) => {
  inquirer
    .prompt(questions)
    .then(async ({ author, description, version, isOk }) => {
      if (!isOk) {
        return;
      }
      console.log("🚀创建项目: " + projectName);
      await clone("github.com:Howlcn1997/taro-next-base", projectName);

      // 2. 更新package.json的配置.
      const packageJson = path.join(path.resolve(projectName), "package.json");

      updateFile(packageJson, {
        name: projectName,
        author,
        version: version,
        description: description,
      });

      // 将node工作目录更改成构建的项目根目录下
      const projectPath = path.resolve(projectName);
      process.chdir(projectPath);
      // 执行安装命令
      install();
    });
});

program.parse(process.argv);
