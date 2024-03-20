const { yParser, chalk } = require('@umijs/utils');
const { join } = require('path');
const execa = require('execa');
const getPackages = require('./utils/getPackages');
const isNextVersion = require('./utils/isNextVersion');

const lernaCli = require.resolve('lerna/cli');

function logTemp(text) {
  console.log(`${chalk.gray('>> LogTemp:')} ${chalk.magenta.bold(text)}`);
}

// 打印步骤
function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`);
}

// 打印错误并退出脚本执行
function printErrorAndExit(message) {
  console.error(chalk.red(message));
  process.exit(1);
}

// 检查当前发布的 package 及其版本是否在 npm 仓库中已存在
function packageExists({ name, version }) {
  try {
    const { stdout, stderr } = execa.sync('npm', [
      'info',
      `${name}@${version}`,
    ]);
    if (stderr) return false;
    return stdout.length > 0;
  } catch (error) {
    return false;
  }
}

// 检查 npm 仓库源
function checkNpmRegistry() {
  logStep('check npm registry');
  const userRegistry = execa.sync('npm', ['config', 'get', 'registry']).stdout;
}

async function release() {
  checkNpmRegistry();

  let updated = null;

  const updatedStdout = execa.sync(lernaCli, ['changed']).stdout;
  updated = updatedStdout
    .split('\n')
    .map((pkg) => {
      return pkg.split('/')[1];
    })
    .filter(Boolean);
  logTemp(updated.join(','));
}

release().catch((err) => {
  console.error(err);
  process.exit(1);
});