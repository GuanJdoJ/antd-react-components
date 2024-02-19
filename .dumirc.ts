import chalk from 'chalk';
import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';

const headPkgList: string[] = [];

/**
 * 获取 packages 目录下所有文件名
 * readdirSync-方法将返回一个包含“指定目录下所有文件名称”的数组对象
 */
const pkgList = readdirSync(join(__dirname, 'packages')).filter((pkg) => {
  return pkg.charAt(0) !== '.' && !headPkgList.includes(pkg);
});

/**
 * 定义包名
 */
const alias = pkgList.reduce((pre, pkg) => {
  pre[`@guanjdoj/arc-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {} as Record<string, string>);

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

// 获取原子资产（例如组件、函数、工具等）Markdown 的解析目录
const tailPkgList = pkgList.map((path) => `packages/${path}/src/components`);

export default defineConfig({
  outputPath: 'docs-dist',
  alias,
  resolve: {
    docDirs: ['docs'],
    atomDirs: tailPkgList.map((dir) => ({ type: 'component', dir })),
  },
  themeConfig: {
    lastUpdated: true,
    hero: {
      title: 'ARC',
      description: '🏆 让中后台开发更简单',
      actions: {
        text: '🏮🏮 快速开始 →',
        link: '/docs/intro',
      },
    },
    footer: '@guanjdoj/antd-react-component',
    name: 'ARC',
    features: [
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/q48YQ5X4ytAAAAAAAAAAAAAAFl94AQBr',
        title: '简单易用',
        description: '在 Ant Design 上进行了自己的封装，更加易用',
      },
      {
        image:
          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        description: '与 Ant Design 设计体系一脉相承，无缝对接 antd 项目',
      },
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/UKqDTIp55HYAAAAAAAAAAAAAFl94AQBr',
        title: '国际化',
        description: '提供完备的国际化，与 Ant Design 体系打通，无需多余配置',
      },

      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Y_NMQKxw7OgAAAAAAAAAAAAAFl94AQBr',
        title: '预设样式',
        description:
          '样式风格与 antd 一脉相承，无需魔改，浑然天成。默认好用的主题系统',
      },
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/U3XjS5IA1tUAAAAAAAAAAAAAFl94AQBr',
        title: '预设行为',
        description: '更少的代码，更少的 Bug，更多的功能',
      },

      {
        image:
          'https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg',
        title: 'TypeScript',
        description:
          '使用 TypeScript 开发，提供完整的类型定义文件，无需频繁打开官网',
      },
    ],
    siteToken: { demoInheritSiteTheme: true },
    nav: [
      { title: '文档', link: '/docs' },
      { title: '组件', link: '/components' },
      { title: 'Changelog', link: '/changelog' },
    ],
    sidebar: {
      '/components': [
        {
          title: '架构设计',
          children: [
            {
              title: 'Components - 组件设计',
              link: '/components',
            },
          ],
        },
        {
          title: '布局',
          children: [
            {
              title: 'ARCLayout - 高级布局',
              link: '/components/layout',
            },
          ],
        },
      ],
    },
  },
  hash: true,
  ignoreMomentLocale: true,
});
