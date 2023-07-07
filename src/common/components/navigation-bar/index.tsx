import { View } from '@tarojs/components';
import { FC } from 'react';
import { appUtil } from '@/core/utils';
import Taro from '@tarojs/taro';
import { isFunction } from '@tarojs/shared';

import './index.scss';
import { ConfigStyle, Props } from './types';


const Index: FC<Props> = (props: Props) => {
  const {
    extClass,
    title,
    background,
    backgroundColorTop,
    iconTheme,
    back,
    home,
    searchBar,
    searchText,
    renderLeft,
    renderCenter,
    renderRight,
    delta,
    onHome,
    onBack,
    onSearch
  } = props;

  const globalSystemInfo = appUtil.getSystemInfo();
  const styleInfo = getStyleInfo(globalSystemInfo!, props);

  const {
    navigationbarinnerStyle,
    navBarLeft,
    navBarHeight,
    navBarExtendHeight,
    ios,
    rightDistance
  } = styleInfo;

  // 返回按钮事件
  const handleBack = () => {
    if (onBack && isFunction(onBack)) {
      onBack();
    } else {
      const pages = Taro.getCurrentPages();
      if (pages.length >= 2) {
        Taro.navigateBack({
          delta,
        });
      }
    }
  };

  // 返回首页
  const handleGoHome = () => {
    if (onHome && isFunction(onHome)) {
      onHome();
    }
  };

  // 搜索
  const handleSearchClick = () => {
    if (onSearch && isFunction(onSearch)) {
      onSearch('');
    }
  }


  /** 占位 */
  const renderPlaceholder = (): JSX.Element => {
    return (
      <View
        className={`navigation-bar__placeholder ${ios ? "ios" : "android"}`}
        style={{ paddingTop: `${navBarHeight! + navBarExtendHeight!}px;` }}
      />
    );
  };

  /** 左侧内容 */
  const renderBarLeft = (): JSX.Element => {
    return (
      <View className='navigation-bar__left' style={navBarLeft}>
        {back && !home && (
          <View
            onClick={handleBack}
            className={`navigation-bar__button navigation-bar__btn_goback ${iconTheme}`}
          />
        )}

        {!back && home && (
          <View
            onClick={handleGoHome}
            className={`navigation-bar__button navigation-bar__btn_gohome ${iconTheme}`}
          />
        )}·

        {back && home && (
          <View
            className={`navigation-bar__buttons ${ios ? "ios" : "android"}`}
          >
            <View
              onClick={handleBack}
              className={`navigation-bar__button navigation-bar__btn_goback ${iconTheme}`}
            />
            <View
              onClick={handleGoHome}
              className={`navigation-bar__button navigation-bar__btn_gohome ${iconTheme}`}
            />
          </View>
        )}

        {!back && !home && renderLeft}
      </View>
    );
  };

  /** 中间内容 */
  const renderBarCenter = (): JSX.Element => {
    let navbar__center: JSX.Element | null | undefined;

    if (title) {
      navbar__center = <text>{title}</text>;
    } else if (searchBar) {
      navbar__center = (
        <View
          className='navigation-bar-search'
          style={`height:${styleInfo.capsulePosition!.height}px;`}
          onClick={handleSearchClick}
        >
          <View className='navigation-bar-search__icon' />
          <View className='navigation-bar-search__input'>{searchText}</View>
        </View>
      );
    } else if (renderCenter) {
      navbar__center = renderCenter;
    }
    
    return (
      <View
        className='navigation-bar__center'
        style={{paddingLeft: `${rightDistance}px`}}
      >
        {navbar__center}
      </View>
    );
  }


  return (
    <View
      className={`navigation-bar ${ios ? "ios" : "android"} ${extClass}`}
      style={{
        background: `${backgroundColorTop ? backgroundColorTop : background}`,
        height: `${navBarHeight! + navBarExtendHeight!}px`,
      }}
    >
      {renderPlaceholder()}
      
      <View
        className={`navigation-bar__inner ${ios ? "ios" : "android"}`}
        style={{ background: `${background};${navigationbarinnerStyle};` }}
      >
        {renderBarLeft()}
        {renderBarCenter()}
        
        <View
          className='navigation-bar__right'
          style={`margin-right: ${rightDistance}px`}
        >
          {renderRight}
        </View>
      </View>
    </View>
  );
};

Index.defaultProps = {
  extClass: '',
  title: '',
  background: '#fff',
  color: '#000',
  iconTheme: 'black',
  back: false,
  home: false,
  searchBar: false,
  searchText: '点我搜索',
  delta: 1,
  // onHome: () => {},
  // onBack: () => {},
  // onSearch: () => {},
};

export default Index;



/**
 * 设置配置样式
 *
 * @param {typeof Taro.globalSystemInfo} systemInfo 系统信息
 * @param {Props} props 组件属性
 * @return {*}  {ConfigStyle}
 */
const getStyleInfo = (systemInfo: typeof Taro.globalSystemInfo, props: Props): ConfigStyle => {
  const {color, back, home, title} = props;
  const {
    statusBarHeight,
    navBarHeight,
    capsulePosition,
    navBarExtendHeight,
    ios,
    windowWidth
  } = systemInfo;

    // 胶囊按钮右侧到屏幕右侧的边距
  let rightDistance = windowWidth - capsulePosition!.right;
    // 胶囊按钮左侧到屏幕右侧的边距
  let leftWidth = windowWidth - capsulePosition!.left;

  const navigationbarinnerStyle = [
    `color: ${color}`,
    `height: ${navBarHeight! + navBarExtendHeight!}px`,
    `padding-top: ${statusBarHeight}px`,
    `padding-right: ${leftWidth}px`,
    `padding-bottom: ${navBarExtendHeight}px`
  ].join(";");

  let navBarLeft = '';
  if ((back && !home) || (!back && home)) {
    navBarLeft = [
      `width:${capsulePosition!.width / 2}px`,
      `height:${capsulePosition!.height}px`,
      `margin-left:0px`,
      // `margin-right:${rightDistance}px`,
      `display: flex;`,
      `justify-content: center;`,
    ].join(";");
  } else if ((back && home) || title) {
    navBarLeft = [
      `width: ${capsulePosition!.width}px`,
      `height: ${capsulePosition!.height}px`,
      `margin-left: ${rightDistance}px`
    ].join(';')
  } else {
    navBarLeft = [`width:auto`, `margin-left:0px`].join(";");
  }
  
  return {
    navigationbarinnerStyle,
    navBarLeft,
    navBarHeight,
    capsulePosition,
    navBarExtendHeight,
    ios,
    rightDistance,
  };
}