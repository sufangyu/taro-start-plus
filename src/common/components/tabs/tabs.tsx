/* eslint-disable no-use-before-define */
import {
  ScrollView, Swiper, SwiperItem, View, 
} from '@tarojs/components';
import {
  CSSProperties, ReactNode, useRef, useState, 
} from 'react';
import Taro, { useReady } from '@tarojs/taro';
import { viewUtil } from '@/core/utils';

import Tab from './tab';
import './index.scss';


interface Props {
  children: ReactNode;
  /** 组件的内联样式, 可以动态设置的内联样式. 通常用于设置高度 */
  style?: string | CSSProperties;
  /** 当前选中标签序号 */
  active?: number;
  /**
   *  滚动阈值，默认 5
   * 
   * 标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动
   */
  swipeThreshold?: number;
  /** 开启滑动切换标签页。默认 false */
  swipeable?: boolean;
  /** active 线的宽度. 默认 40 */
  lineWidth?: number;
  /** 切换回调函数. 
   * 
   * 注意：swipeable时, 滑动会触发2次回调
   */
  onChange?: (index: number) => void;
}

/**
 * 标签页
 *
 * @param {Props} props
 * @supported — weapp, alipay, swan, tt
 * @return {*} 
 */
const Tabs = (props: Props): ReactNode => {
  const {
    children, style = { height: Taro.pxTransform(400) },
    active = 0, swipeThreshold = 5, lineWidth = 40, swipeable, onChange, 
  } = props;


  const random = Math.random().toString(36).slice(-6);
  // tab id, 用于获取 tab 时候指定获取范围. 代替原生 .in(this)
  const id = useRef(`tabs-wrap-${random}`);
  const tabsWrapWidth = useRef(0);
  const [current, setCurrent] = useState(active);
  const [itemWidth, setItemWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useReady(async () => {
    getTabsWrapInfo();
    const itemRect = await getTabItemInfo(current);
    setItemWidth(itemRect.width);
  });


  // 获取 tab 栏容器信息
  const getTabsWrapInfo = () => {
    viewUtil.delayQuerySelector(`#${id.current}`).then((res) => {
      const rect = res[0];
      if (rect == null) {
        return;
      }
      tabsWrapWidth.current = rect.width;
    });
  };
  
  // 获取 tab item 信息
  const getTabItemInfo = async (index: number) => {
    const res = await viewUtil.delayQuerySelector(`#${id.current} .tab-${index}`, 0);
    const rect = res[0];

    if (rect == null) {
      return {
        width: 0,
        left: 0,
      };
    }

    return rect;
  };


  /**
   * 切换 tab
   *
   * @param {number} index
   */
  const handleSwitchTab = async (index: number): Promise<void> => {
    setCurrent(index);

    // tab 滚动处理 -----------
    const itemRect = await getTabItemInfo(index);
    const tabsHalfWidth = tabsWrapWidth.current / 2;
    const itemHalfWidth = itemRect.width / 2;
    // 滚动条滚动到的位置
    const offsetLeft = itemRect.width * current - tabsHalfWidth + itemHalfWidth;
    // console.log('需要滚动到的位置 =>>', offsetLeft);
    setScrollLeft(Math.max(0, offsetLeft));


    if (index !== current) {
      // 相等时不再触发回调事件
      typeof onChange === 'function' && onChange(index);
    }
  };

  // 渲染切换 tab 栏
  const renderTabNav = (): ReactNode => {
    const offsetLeft = (itemWidth * current) + (itemWidth / 2) - (lineWidth / 2);
    const styles = {
      width: Taro.pxTransform(lineWidth * 2),
      transform: `translateX(${offsetLeft}px)`,
      opacity: itemWidth !== 0 ? 1 : 0,
      transitionDuration: itemWidth !== 0 ? '0.3s' : '0s',
    };

    return (
      <ScrollView
        id={id.current}
        className={`tabs__wrap ${(children as []).length > swipeThreshold ? 'tabs__wrap--scrollable' : ''}`}
        scrollX
        enableFlex
        scrollWithAnimation
        scrollLeft={scrollLeft}
      >
        <View className="tabs__nav">
          <View className="tabs__line" style={styles} />
          {
            (children as []).map((tab: any, idx) => {
              return (
                <Tab
                  className={`tab tab-${idx} ${current === idx ? 'active' : ''}`}
                  key={`tab-nav-${idx}`}
                  title={tab.props.title}
                  onClick={() => handleSwitchTab(idx)}
                />
              );
            })
          }
        </View>
      </ScrollView>
    );
  };


  // 常规切换（无动画）
  const renderNormal = (): ReactNode => {
    return (
      <View
        style={style}
        className="tabs__content"
      >
        {
          (children as []).map((tab: any, idx) => {
            return (
              <View className={`tab__pane ${current === idx ? 'active' : ''}`} key={`tab-content-${idx}`}>
                {tab.props.children}
              </View>
            );
          })
        }
      </View>
    );
  };

  // 动画切换
  const renderSwiper = (): ReactNode => {
    return (
      <Swiper
        onTouchMove={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}
        style={style}
        className="tabs__content"
        circular={false}
        indicatorDots={false}
        autoplay={false}
        current={current}
        onChange={(ev) => {
          const index = ev.detail.current;
          handleSwitchTab(index);
        }}
      >
        {
          (children as []).map((tab: any, idx) => {
            return (
              <SwiperItem className="tab__pane" key={`tab-content-${idx}`}>
                {tab.props.children}
              </SwiperItem>
            );
          })
        }
      </Swiper>
    );
  };

  return (
    <View className={`tabs tabs--${swipeable ? 'swipeable' : 'normal'}`}>
      {renderTabNav()}
      {swipeable ? renderSwiper() : renderNormal()}
    </View>
  );
};

export default Tabs;
