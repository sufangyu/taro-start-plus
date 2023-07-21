/* eslint-disable import/extensions */
import accountRouterConfig from './account.config';
import debugRouterConfig from './debug.config';
import demoRouterConfig from './demo.config';
import frameworkRouterConfig from './framework.config';
import homeRouterConfig from './home.config';

// 整个 app 的配置
const appRouterConfig = {
  ...homeRouterConfig,
  ...accountRouterConfig,
  ...demoRouterConfig,
  ...frameworkRouterConfig,
  ...debugRouterConfig,
};

interface TabbarItem {
  text: string;
  pagePath: string;
  iconPath: string;
  selectedIconPath: string;
  type?: 'dot' | 'badge';
  badgeText?: string;
}


// tabbar list 配置 （常规）
const tabBarList: TabbarItem[] = [
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
    // type: 'badge',
    // badgeText: '99+',
  },
  {
    text: '我的',
    pagePath: 'pages/mine/index',
    iconPath: 'assets/images/tabbar/mine.png',
    selectedIconPath: 'assets/images/tabbar/mine-selected.png',
    // type: 'dot',
  },
];

export { appRouterConfig, tabBarList, TabbarItem };

