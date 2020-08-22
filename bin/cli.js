#!/usr/bin/env node

const path = require("path");
const program = require("commander");
const inquirer = require("inquirer");
const { updateFile } = require("../lib/file");
const { install } = require("../lib/install");

// 定义和用户交互时的questions
const prompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "author",
      message: "请输入作者的名称",
    },
    {
      type: "input",
      name: "repository",
      message: "请输入GitHub的项目地址",
    },
    {
      type: "confirm",
      name: "isOk",
      message: "请确认输入是否ok?",
    },
  ]);
};

program.version(require("../package.json").version, "-v, --version");

program
  .command("create <ProjectName>")
  .description("创建一个新项目")
  .action((projectName) => {
    prompt().then(async (results) => {
      const { author, repository, isOk } = results;
      if (!isOk) {
        return;
      }
      // 1. clone项目
      const { clone } = require("../lib/download");
      console.log("🚀创建项目: " + projectName);
      await clone("github.com:Howlcn1997/taro-next-base", projectName);
      console.log(`项目${projectName}创建成功`);

      // 2. 更新package.json的配置.
      const packageJson = path.join(path.resolve(projectName), "package.json");
      const repositoryObj = repository
        ? {
            type: "git",
            url: repository,
          }
        : {};

      updateFile(packageJson, {
        name: projectName,
        author,
        repository: repositoryObj,
      });

      // 3. 安装依赖
      console.log("开始安装依赖...");

      // 将node工作目录更改成构建的项目根目录下
      const projectPath = path.resolve(projectName);
      process.chdir(projectPath);
      // 执行安装命令
      install();
    });
  });

program.parse(process.argv);

// #!/usr/bin/env node
// const program = require("commander");
// const inquirer = require("inquirer");
// const packageJson = require("../package.json");
// const ora = require("ora");
// const chalk = require("chalk");
// const p = ora("创建中...");

// console.dir(chalk.red("xxxx"));

// program
//   .version(packageJson.version, "-v, --version")
//   .command("create <name>")
//   .description("Create a new project by demo-cli")
//   .action((name, command) => {
//     inquirer
//       .prompt([
//         // 输入类型
//         {
//           type: "input",
//           name: "name",
//           message: "请输入项目名称:\n",
//         },
//         {
//           type: "input",
//           name: "description",
//           message: "请输入项目描述:\n",
//         },
//         {
//           type: "list",
//           name: "template",
//           message: "请选择项目模板:\n",
//           choices: [
//             { name: "预设配置", value: 0 },
//             { name: "基本配置", value: 1 },
//             { name: "无配置", value: 2 },
//           ],
//         },
//         // 确认类型.
//         {
//           type: "confirm",
//           name: "continune",
//           message: ({ name }) => {
//             return `确认创建 名称：${name} :\n`;
//           },
//         },
//       ])
//       .then((result) => {
//         console.log(result);
//         p.start();
//         setTimeout(() => {
//           p.stop();
//           console.log("创建成功!!!");
//         }, 3000);
//       });
//   });

// program.parse(process.argv);
