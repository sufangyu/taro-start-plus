import {DEMO_ROUTER_PATH, TAB_BAR_ROUTER_PATH} from "@/common/router";


export default defineAppConfig({
  pages: [
    ...TAB_BAR_ROUTER_PATH,

    ...DEMO_ROUTER_PATH,
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro start plus',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: false,
    color: '#808080',
    selectedColor: '#5171f0',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
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
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
})
