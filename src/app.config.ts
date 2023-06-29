import {pages, subPackages, tabBarList} from "@/common/router";

// console.log('pages::', pages);
// console.log('subPackages::', subPackages);

export default defineAppConfig({
  pages,
  subPackages,
  window: {
    backgroundColor: '#f5f5f5',
    backgroundTextStyle: 'dark',
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
    list: tabBarList,
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
})
