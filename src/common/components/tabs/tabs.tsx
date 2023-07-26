/* eslint-disable no-use-before-define */
import {
  ScrollView, Swiper, SwiperItem, View, 
} from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';

import {
  useRef, useState, CSSProperties, ReactNode,
} from 'react';

import { baseUtil, viewUtil } from '@/core/utils';

import Tab from './tab';
import './index.scss';


interface Props {
  children: ReactNode;
  /** 组件的内联样式, 可以动态设置的内联样式. 通常用于设置高度 */
  style?: string | CSSProperties;
  /** 选项卡的位置. 默认 top */
  placement?: 'left'|'right'|'top'|'bottom';
  /** 当前选中标签序号 */
  active?: number;
  /**
   *  滚动阈值. 默认 5
   * 
   * 标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动
   */
  swipeThreshold?: number;
  /** 开启滑动切换标签页。默认 false */
  swipeable?: boolean;
  /** active 线的宽度/高. 默认 40 */
  lineSize?: number;
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
    children, style = { height: Taro.pxTransform(400) }, placement = 'top',
    active = 0, swipeThreshold = 5, lineSize = 40, swipeable, onChange, 
  } = props;

  // 垂直布局
  const isVertical = ['top', 'bottom'].includes(placement);
  // 水平布局
  const isHorizontal = ['left', 'right'].includes(placement);

  const uuid = baseUtil.uuid();
  // tab id, 用于获取 tab 时候指定获取范围. 代替原生 .in(this)
  const id = useRef(`tabs-wrap-${uuid}`);
  const tabsWrapSize = useRef({
    width: 0,
    height: 0,
  });
  const [current, setCurrent] = useState(active);
  const [itemSize, setItemSize] = useState({
    width: 0,
    height: 0,
  });
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useReady(async () => {
    getTabsWrapInfo();
    const itemRect = await getTabItemInfo(current);
    setItemSize({
      width: itemRect.width,
      height: itemRect.height,
    });
  });


  // 获取 tab 栏容器信息
  const getTabsWrapInfo = () => {
    viewUtil.delayQuerySelector(`#${id.current}`).then((res) => {
      const rect = res[0];
      if (rect == null) {
        return;
      }
      tabsWrapSize.current = {
        width: rect.width,
        height: rect.height,
      };
    });
  };
  
  // 获取 tab item 信息
  const getTabItemInfo = async (index: number) => {
    const res = await viewUtil.delayQuerySelector(`#${id.current} .tab-${index}`, 0);
    const rect = res[0];

    if (rect == null) {
      return {
        width: 0,
        height: 0,
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

    if (isVertical) {
      const tabsHalfWidth = tabsWrapSize.current.width / 2;
      const itemHalfWidth = itemRect.width / 2;
      // 滚动条滚动到的位置
      const offsetLeft = itemRect.width * index - tabsHalfWidth + itemHalfWidth;
      setScrollLeft(Math.max(0, offsetLeft));
    }

    if (isHorizontal) {
      const tabsHalfHeight = tabsWrapSize.current.height / 2;
      const itemHalfHeight = itemRect.height / 2;
      // 滚动条滚动到的位置 
      const offsetTop = itemRect.height * index - tabsHalfHeight + itemHalfHeight * 2;
      setScrollTop(Math.max(0, offsetTop));
    }


    if (index !== current) {
      // 相等时不再触发回调事件
      typeof onChange === 'function' && onChange(index);
    }
  };

  // 渲染切换 tab 栏
  const renderTabNav = (): ReactNode => {
    const offset = isVertical
      ? (itemSize.width * current) + (itemSize.width / 2) - (lineSize / 2)
      : (itemSize.height * current) + (itemSize.height / 2) - (lineSize / 2);

    const styles = {
      width: isVertical ? Taro.pxTransform(lineSize * 2) : '2px',
      height: isHorizontal ? Taro.pxTransform(lineSize * 2) : '2px',
      transform: isVertical ? `translateX(${offset}px)` : `translateY(${offset}px)`,
      opacity: itemSize.width !== 0 ? 1 : 0,
      transitionDuration: itemSize.width !== 0 ? '0.3s' : '0s',
    };

    return (
      <ScrollView
        id={id.current}
        className={`tabs__wrap ${(children as []).length > swipeThreshold ? 'tabs__wrap--scrollable' : ''}`}
        scrollX={isVertical}
        scrollY={isHorizontal}
        enableFlex
        scrollWithAnimation
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        style={{
          height: isHorizontal ? (style as any)?.height : null,
        }}
      >
        <View className="tabs__nav">
          <View className="tabs__line" style={styles} />
          {
            (children as []).map((tab: any, idx) => {
              const { title, disabled } = tab.props;
              return (
                <Tab
                  className={`tab tab-${idx} ${current === idx ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                  key={`tab-nav-${idx}`}
                  title={title}
                  disabled={disabled}
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
    <View className={`tabs tabs--${placement}`}>
      {renderTabNav()}
      {swipeable ? renderSwiper() : renderNormal()}
    </View>
  );
};

export default Tabs;
