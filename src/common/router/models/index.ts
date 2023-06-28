import debugRouterConfig from "./debug.config";
import homeRouterConfig from "./home.config";
import accountRouterConfig from "./account.config";
import demoRouterConfig from "./demo.config";

// 整个 app 的配置
const appRouterConfig = {
  ...debugRouterConfig,
  ...homeRouterConfig,
  ...accountRouterConfig,
  ...demoRouterConfig,
};


// tabbar list 配置
const tabBarList = [
  {
    text: '首页',
    pagePath: 'pages/home/index',
    iconPath: 'assets/images/tabbar/home.png',
    selectedIconPath: 'assets/images/tabbar/home-selected.png',
  },
  {
    text: '示例',
    pagePath: 'pages/demo/entry/index',
    iconPath: 'assets/images/tabbar/started.png',
    selectedIconPath: 'assets/images/tabbar/started-selected.png',
  },
  {
    text: '我的',
    pagePath: 'pages/mine/index',
    iconPath: 'assets/images/tabbar/mine.png',
    selectedIconPath: 'assets/images/tabbar/mine-selected.png',
  },
];

export {appRouterConfig, tabBarList};

