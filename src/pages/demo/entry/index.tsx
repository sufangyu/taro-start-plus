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
    { label: '图标 Icon', path: appRouterConfig.icon.path },
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
    { label: '选择器 Picker', path: appRouterConfig.picker.path },
    { label: '单元格 Cell', path: appRouterConfig.cell.path },
    { label: '单选框 Radio', path: appRouterConfig.radio.path },
    { label: '复选框 Checkbox', path: appRouterConfig.checkbox.path },
    { label: '数字输入框 InputNumber', path: appRouterConfig.inputNumber.path },
    { label: '表单 Form', path: appRouterConfig.form.path },
    { label: '宫格布局 Grid', path: appRouterConfig.grid.path },
    { label: '条形码、二维码生成', path: appRouterConfig.code.path },
    { label: '结果 Result', path: appRouterConfig.result.path },
    { label: '选择项 Select', path: appRouterConfig.select.path },
    { label: '间距 Space', path: appRouterConfig.space.path },
    { label: '头像 Avatar', path: appRouterConfig.avatar.path },
    { label: '拽像 Drag', path: appRouterConfig.drag.path },
    { label: '悬浮导航 FixedNav', path: appRouterConfig.fixedNav.path },
    { label: '日历 Calendar', path: appRouterConfig.calendar.path },
    { label: '价格展示 Price', path: appRouterConfig.price.path },
    { label: '评分 Rate', path: appRouterConfig.rate.path },
  ];

  useDidShow(() => {
    try {
      const tabbar = Taro.getTabBar<CustomTabBar>(curPage);
      tabbar?.setSelected(1);  
    } catch (_) {}
  });


  return (
    <ScrollView className="container">
      <View className="page-title">组件示例</View>
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
