import { View } from '@tarojs/components';
import Taro, { getSystemInfoSync } from '@tarojs/taro';

import { DemoBlock, Drag } from '@/common/components';

import './index.scss';

export default function Index() {
  const btnStyle = {
    borderRadius: Taro.pxTransform(50),
    padding: `0 ${Taro.pxTransform(36)}`,
    fontSize: Taro.pxTransform(28),
    color: '#fff',
    display: 'inline-block',
    lineHeight: Taro.pxTransform(72),
    background: '#004fd4',
  };
  
  const { windowWidth, windowHeight } = getSystemInfoSync();
  const right = () => windowWidth - (300 + 16);
  const bottom = () => windowHeight - (190 + 150);
  
  return (
    <View className="container">
      <DemoBlock title="基础用法">
        <View
          data-desc="占位"
          style={{
            height: Taro.pxTransform(72),
            width: Taro.pxTransform(72),
            background: 'transparent', 
          }}
        />
        <Drag style={{ top: Taro.pxTransform(120), left: Taro.pxTransform(32) }}>
          <View style={btnStyle}>触摸移动</View>
        </Drag>
      </DemoBlock>

      <DemoBlock title="限制拖拽边界">
        <View
          data-desc="占位"
          style={{
            width: '300px',
            height: '150px',
            background: 'transparent',
          }}
        />
      
        <View
          className="drag-boundary"
          style={{
            position: 'absolute',
            top: '190px',
            left: '16px',
            width: '300px',
            height: '150px',
            border: '1PX solid blue',
          }}
        />
        <Drag
          style={{ top: Taro.pxTransform(200 * 2), left: Taro.pxTransform(80 * 2) }}
          boundary={{
            top: 190, left: 16, bottom: bottom(), right: right(), 
          }}
        >
          <View style={btnStyle}>限制拖拽边界</View>
        </Drag>
      </DemoBlock>


      <DemoBlock title="限制拖拽方向">
        <View
          data-desc="占位"
          style={{
            height: Taro.pxTransform(36 * 2),
            width: Taro.pxTransform(36 * 2),
            background: 'transparent', 
          }}
        />
      
        <Drag direction="x" style={{ top: Taro.pxTransform(809), left: Taro.pxTransform(16 * 2) }}>
          <View style={btnStyle}>只能X轴拖拽</View>
        </Drag>

        <Drag direction="y" style={{ top: Taro.pxTransform(809), right: Taro.pxTransform(16 * 2) }}>
          <View style={btnStyle}>只能Y轴拖拽</View>
        </Drag>
      </DemoBlock>


      <DemoBlock title="自动吸边">
        <View
          data-desc="占位"
          style={{
            height: Taro.pxTransform(36 * 2),
            width: Taro.pxTransform(36 * 2),
            background: 'transparent', 
          }}
        />
      
        <Drag attract style={{ top: Taro.pxTransform(1056), left: Taro.pxTransform(16 * 2) }}>
          <View style={btnStyle}>吸边</View>
        </Drag>
      </DemoBlock>
      
    </View>
  );
}
