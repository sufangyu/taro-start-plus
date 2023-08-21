import { ScrollView, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';

import { appRouterConfig } from '@/common/router';
import { routeUtil } from '@/core/utils';
import CustomTabBar from '@/custom-tab-bar/index';

import './index.scss';


interface Entry {
  label: string;
  path: string;
}

export default function Index() {
  const curPage = Taro.getCurrentInstance().page;

  const entries: Entry[] = [
    { label: 'state、props、事件', path: appRouterConfig.base.path },
    { label: '全局状态', path: appRouterConfig.store.path },
    { label: '页面跳转', path: appRouterConfig.navigation.path },
    { label: '网络请求', path: appRouterConfig.request.path },
    
    { label: '图片查看 ImagePreview', path: appRouterConfig.imagePreview.path },
    { label: '文件选择&上传 FilePicker', path: appRouterConfig.filePicker.path },
    { label: '动作面板 SheetAction', path: appRouterConfig.actionsheet.path },
    { label: '自定义导航栏 NavigationBar', path: appRouterConfig.navigationBar.path },
    { label: '滑动操作 SwiperCell', path: appRouterConfig.swipeCell.path },
    { label: '弹出层 Popup', path: appRouterConfig.popup.path },
    { label: '徽标 Badge', path: appRouterConfig.badge.path },
    { label: '索引列表 IndexBar', path: appRouterConfig.indexBar.path },
    { label: '标签页 Tabs', path: appRouterConfig.tabs.path },
    { label: '列表组件 List', path: appRouterConfig.listView.path },
    { label: '弹出气泡 Popover', path: appRouterConfig.popover.path },
    { label: '下拉菜单 DropdownMenu', path: appRouterConfig.dropdownMenu.path },
    { label: '步骤条 Steps', path: appRouterConfig.steps.path },
    { label: '通知栏 NoticeBar', path: appRouterConfig.noticeBar.path },

    { label: '下拉刷新 useList', path: appRouterConfig.pullDownRefresh.path },
    { label: '列表 hooks useList', path: appRouterConfig.list.path },
    { label: '事件总线 useEvents', path: appRouterConfig.eventsList.path },
    { label: '权限&未登录拦截 useWithLogged', path: appRouterConfig.auth.path },

    { label: '表单校验', path: appRouterConfig.formValidate.path },
    { label: '数据格式化', path: appRouterConfig.format.path },
    { label: '小数精度', path: appRouterConfig.numberPrecision.path },
    { label: '定位地图', path: appRouterConfig.location.path },
    { label: '扫码（二维码&条形码）', path: appRouterConfig.scan.path },
    { label: '加载网页', path: `${appRouterConfig.webview.path}?url=https://www.ithome.com` },
    { label: '埋点-自定义事件', path: appRouterConfig.event.path },
    { label: '条形码、二维码生成', path: appRouterConfig.code.path },
    { label: '海报分享图生成', path: appRouterConfig.posterRender.path },
    { label: '滚动锚点', path: appRouterConfig.scrollAnchor.path },
    { label: '可视化图表', path: appRouterConfig.charts.path },
    { label: '分包示例', path: appRouterConfig.switchEnv.path },
  ];

  useDidShow(() => {
    try {
      const tabbar = Taro.getTabBar<CustomTabBar>(curPage);
      tabbar?.setSelected(1);  
    } catch (_) {}
  });


  return (
    <ScrollView className="container">
      <View className="page-title">入门教程</View>
      <View className="menu">
        {
          entries.map(item => {
            return (
              <View
                className="menu-item"
                key={item.path}
                onClick={() => routeUtil.toPage({ url: item.path })}
              >
                {item.label}
              </View>
            );
          })
        }
      </View>

      {/* 自定义 tabbar 的占位 */}
      <View className="tabbar__placeholdr" />
    </ScrollView>
  );
}
