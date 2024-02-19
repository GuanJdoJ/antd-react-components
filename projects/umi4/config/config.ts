import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  //为应用程序设置路由前缀
  base: '/',
  //插件
  plugins: [
    //初始化数据插件
    //initial-state插件需要放在model插件前面，不然会报错，原因是model插件内部依赖initial-state插件
    '@umijs/plugins/dist/initial-state',
    //数据流插件
    '@umijs/plugins/dist/model',
    //权限插件
    '@umijs/plugins/dist/access',
    //国际化插件
    '@umijs/plugins/dist/locale',
    //tailwindcss插件
    // '@umijs/plugins/dist/tailwindcss',
    //当此应用有作为子应用的需要，取消qiankun插件注释和下方配置注释
    // '@umijs/plugins/dist/qiankun',
    // 页面缓存插件
    // '@alita/plugins/dist/keepalive',
  ],

  // 缓存页面路由列表
  // 在 app.tsx 中动态处理 keepalive
  // keepalive: [],

  //把主题Token插入到less变量中
  // lessLoader: {
  //   modifyVars: {
  //     //可以将globalToken打印出来查看具体数据
  //     ...globalToken,
  //     //如果未来你的项目有可能更改ConfigProvider中的prefixCls
  //     //为了减少通过class修改antd样式的影响，建议在less文件中使用@{ant-prefix}代替固定的前缀，比如
  //     // .@{ant-prefix}-btn-primary { width: 200px; }
  //     'ant-prefix': 'ant',
  //   },
  // },

  access: {},
  //初始化数据
  initialState: {},
  //数据流-基于hooks范式的轻量级数据管理方案
  model: {},
  //国际化
  locale: {
    baseSeparator: '-', //多语言文件名称定义分隔符（无修改，会影响WeeeLayout中英文切换）
    default: 'en-US',
  },
  //tailwindcss
  // tailwindcss: {},
  //路由表
  routes: routes,
  //微前端-qiankun
  // qiankun: {
  //   //注册为父应用
  //   master: {},
  // },
});
