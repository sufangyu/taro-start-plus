import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { Component, ReactNode } from 'react';

import { TabbarItem, tabBarList } from '@/common/router';
import { routeUtil } from '@/core/utils';

import './index.scss';


// QA: 获取 tabBar 的实例会始终为 undefined。倘若改成 class 组件的话即可获取到。目前暂未知道问题出在哪里。
// fix:https://www.leezhian.com/faq/faq-one#taro-v3-%E5%BC%80%E5%8F%91%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%81%87%E5%88%B0%E7%9A%84%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      normalColor: '#808080',
      selectedColor: '#5171f0',
    };
  }
  
  
  componentDidMount(): void {
    const app = Taro.getApp();
    const normalColor = app.config?.tabBar?.color ?? '#808080';
    const selectedColor = app.config?.tabBar?.selectedColor ?? '#5171f0';

    this.setState({
      normalColor,
      selectedColor,
    });
  }

  handleSwitchTab(tabbar: TabbarItem): void {
    routeUtil.toPage({
      // 补 '/' 才可正常跳转
      url: `/${tabbar.pagePath}`,
    });
  }

  setSelected(idx: number) {
    this.setState({
      selected: idx,
    });
  }


  // 渲染 item
  renderRabbarItem(tabbar: TabbarItem, index: number) {
    const { selected, normalColor, selectedColor } = this.state as {
      selected: null | number;
      normalColor: string;
      selectedColor: string;
    };
    const isSelected = selected === index;

    return (
      <View
        className="tabbar__item"
        onClick={() => this.handleSwitchTab(tabbar)}
        data-path={tabbar.pagePath}
        key={tabbar.text}
      >
        <Image className="tabbar__item__icon" src={isSelected ? `../${tabbar.selectedIconPath}` : `../${tabbar.iconPath}`} />
        <View className="tabbar__item__text" style={{ color: isSelected ? selectedColor : normalColor }}>
          {tabbar.text}
        </View>
        {
          tabbar.type && ['badge', 'dot'].includes(tabbar.type)
          && (
            <View className={tabbar.type}>
              {tabbar.type === 'badge' ? tabbar.badgeText : ''}
            </View>
          )
        }
      </View>
    );
  }

  render(): ReactNode {
    return (
      <View className="tabbar">
        <View className="tabbar__border" />
        {
          tabBarList.map((item, index) => this.renderRabbarItem(item, index))
        }
      </View>
    );
  }
}
