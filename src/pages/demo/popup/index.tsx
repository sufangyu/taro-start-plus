import {
  View, Button, ScrollView, 
} from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import { Popup } from '@/common/components';
import icClose from '@/assets/images/icons/ic-close.png';

import './index.scss';


export default function Index() {
  const [visible, setVisible] = useState({
    base: false,

    positionTop: false,
    positionBottom: false,
    positionLeft: false,
    positionRight: false,

    title: false,
    closeIcon: false,
    closeIconCustom: false,
    closeIconPosition: false,
    closeIconForH: false,

    round: false,
    overlay: false,
    overlayUnclick: false,

    callback: false,
    longContent: false,
  });

  const handleTogglePopup = (key: string, action: boolean) => {
    setVisible((prevState) => ({
      ...prevState,
      [key]: action,
    }));
  };

  // 是否开启顶部安全区域. 页面开启 navigationStyle: 'custom' 时需要设置为 true
  const safeAreaInsetTop = false;

  return (
    <View className="container">
      <View className="demo-title">基本用法</View>
      <View className="demo-content">
        <Button type="primary" onClick={() => handleTogglePopup('base', true)}>展示弹出层</Button>
        <Popup
          visible={visible.base}
          round
          onClosed={() => handleTogglePopup('base', false)}
        >
          <View style={{ padding: '32px 48px' }}>内容</View>
        </Popup>
      </View>

      <View className="demo-title">弹出位置</View>
      <View className="demo-content">
        <Button type="primary" onClick={() => handleTogglePopup('positionTop', true)}>顶部弹出</Button>
        <Popup
          visible={visible.positionTop}
          position="top"
          onClosed={() => handleTogglePopup('positionTop', false)}
          safeAreaInsetTop={safeAreaInsetTop}
        >
          <View style={{ textAlign: 'center', height: '250px' }}>顶部弹窗的内容</View>
        </Popup>

        
        <Button type="primary" onClick={() => handleTogglePopup('positionBottom', true)}>底部弹出</Button>
        <Popup
          visible={visible.positionBottom}
          position="bottom"
          onClosed={() => handleTogglePopup('positionBottom', false)}
        >
          <View style={{ textAlign: 'center', height: '250px', lineHeight: '250px' }}>底部弹窗的内容</View>
        </Popup>

        
        <Button type="primary" onClick={() => handleTogglePopup('positionLeft', true)}>左侧弹出</Button>
        <Popup
          visible={visible.positionLeft}
          position="left"
          onClosed={() => handleTogglePopup('positionLeft', false)}
          safeAreaInsetTop={safeAreaInsetTop}
        >
          <View style={{ textAlign: 'center', width: Taro.pxTransform(420) }}>左侧弹窗的内容</View>
        </Popup>


        <Button type="primary" onClick={() => handleTogglePopup('positionRight', true)}>右侧弹出</Button>
        <Popup
          visible={visible.positionRight}
          position="right"
          onClosed={() => handleTogglePopup('positionRight', false)}
          safeAreaInsetTop={safeAreaInsetTop}
        >
          <View style={{ textAlign: 'center', width: Taro.pxTransform(420) }}>右侧弹窗的内容</View>
        </Popup>
      </View>

      <View className="demo-title">标题 & 关闭图标</View>
      <View className="demo-content">
        <Button type="primary" onClick={() => handleTogglePopup('title', true)}>标题</Button>
        <Popup
          visible={visible.title}
          title="弹窗标题"
          position="bottom"
          onClosed={() => handleTogglePopup('title', false)}
        >
          <View style={{ textAlign: 'center', height: Taro.pxTransform(250) }}>有标题的弹窗内容</View>
        </Popup>


        <Button type="primary" onClick={() => handleTogglePopup('closeIcon', true)}>关闭图标</Button>
        <Popup
          visible={visible.closeIcon}
          title="弹窗标题"
          position="bottom"
          closeable
          onClosed={() => handleTogglePopup('closeIcon', false)}
        >
          <View style={{ textAlign: 'center', height: Taro.pxTransform(250) }}>标题+关闭的弹窗内容</View>
        </Popup>

        <Button type="primary" onClick={() => handleTogglePopup('closeIconForH', true)}>标题+关闭(左侧)</Button>
        <Popup
          visible={visible.closeIconForH}
          title="弹窗标题"
          position="left"
          closeable
          safeAreaInsetTop={safeAreaInsetTop}
          closeIconPosition="top-left"
          onClosed={() => handleTogglePopup('closeIconForH', false)}
        >
          <View style={{ textAlign: 'center', width: Taro.pxTransform(420) }}>标题+关闭的左侧弹窗内容</View>
        </Popup>


        <Button type="primary" onClick={() => handleTogglePopup('closeIconCustom', true)}>自定义图标</Button>
        <Popup
          visible={visible.closeIconCustom}
          // title="弹窗标题"
          position="bottom"
          closeable
          closeIcon={icClose}
          // closeIcon={<Image src={icClose} />}
          onClosed={() => handleTogglePopup('closeIconCustom', false)}
        >
          <View style={{ textAlign: 'center', height: Taro.pxTransform(250) }}>标题+自定义的弹窗内容</View>
        </Popup>


        <Button type="primary" onClick={() => handleTogglePopup('closeIconPosition', true)}>关闭图标位置</Button>
        <Popup
          visible={visible.closeIconPosition}
          title="弹窗标题"
          position="right"
          closeable
          safeAreaInsetTop={safeAreaInsetTop}
          closeIconPosition="top-left"
          onClosed={() => handleTogglePopup('closeIconPosition', false)}
        >
          <View style={{ textAlign: 'center', width: Taro.pxTransform(420) }}>关闭图标位置弹窗内容</View>
        </Popup>
      </View>

      <View className="demo-title">圆角、遮罩层弹窗</View>
      <View className="demo-content">
        <Button type="primary" onClick={() => handleTogglePopup('round', true)}>圆角弹窗</Button>
        <Popup
          visible={visible.round}
          position="bottom"
          round
          onClosed={() => handleTogglePopup('round', false)}
        >
          <View style={{ textAlign: 'center', height: Taro.pxTransform(250) }}>圆角弹窗内容</View>
        </Popup>


        <Button type="primary" onClick={() => handleTogglePopup('overlay', true)}>没有遮罩层弹窗</Button>
        <Popup
          visible={visible.overlay}
          position="bottom"
          round
          closeable
          overlay={false}
          onClosed={() => handleTogglePopup('overlay', false)}
        >
          <View style={{ textAlign: 'center', height: Taro.pxTransform(250) }}>没有遮罩层弹窗内容</View>
        </Popup>


        <Button type="primary" onClick={() => handleTogglePopup('overlayUnclick', true)}>遮罩层不关闭弹窗</Button>
        <Popup
          visible={visible.overlayUnclick}
          position="bottom"
          round
          closeable
          closeOnOverlayClick={false}
          onClosed={() => handleTogglePopup('overlayUnclick', false)}
        >
          <View style={{ textAlign: 'center', height: Taro.pxTransform(250) }}>遮罩层不关闭弹窗内容</View>
        </Popup>
      </View>

      <View className="demo-title">回调函数、长内容</View>
      <View className="demo-content">
        <Button type="primary" onClick={() => handleTogglePopup('callback', true)}>打开、关闭回调函数</Button>
        <Popup
          visible={visible.callback}
          position="bottom"
          title="回调函数"
          round
          closeable
          onClosed={() => {
            handleTogglePopup('callback', false);
            Taro.showToast({
              title: '触发关闭',
              icon: 'success',
            });
          }}
          onOpened={() => {
            Taro.showToast({
              title: '触发打开',
              icon: 'success',
            });
          }}
        >
          <View style={{ textAlign: 'center', height: Taro.pxTransform(250) }}>打开、关闭回调函数弹窗内容</View>
        </Popup>


        <Button type="primary" onClick={() => handleTogglePopup('longContent', true)}>内容超长滚动</Button>
        <Popup
          extraClass="popup-custom"
          visible={visible.longContent}
          position="bottom"
          title="内容超长滚动"
          round
          closeable
          onClosed={() => handleTogglePopup('longContent', false)}
        >
          <ScrollView scrollY style={{ height: Taro.pxTransform(450) }}>
            <View style={{ height: 150, backgroundColor: '#eee' }} />
            <View style={{ height: 200, backgroundColor: '#ccc' }} />
            <View style={{ height: 250, backgroundColor: '#999' }} />
          </ScrollView>
        </Popup>
      </View>

      <View style={{ height: 200, backgroundColor: '#f5f5f5' }} />
    </View>
  );
}
