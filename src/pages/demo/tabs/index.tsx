import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { Tabs, Tab } from '@/common/components';

import './index.scss';

export default function Index() {
  return (
    <View className="container safe-area-bottom">
      
      <View className="demo-title">默认</View>
      <View className="demo-content">
        <Tabs
          active={1}
          onChange={(index) => {
            console.log(`当前显示第${index + 1}内容`);
          }}
          style={{ height: Taro.pxTransform(250) }}
        >
          <Tab title="标签1">
            <View className="demo-text-1">标签内容 1</View>
          </Tab>
          <Tab title="标签2">
            <View className="demo-text-2" onClick={() => Taro.showToast({ title: '我被点击了' })}>标签内容 2</View>
          </Tab>
          <Tab title="标签3">
            <View className="demo-text-3">标签内容 3</View>
          </Tab>
          <Tab title="标签4">
            <View className="demo-text-4">标签内容 4</View>
          </Tab>
        </Tabs>
      </View>


      <View className="demo-title">标签栏滚动</View>
      <View className="demo-content">
        <Tabs
          swipeable
          onChange={(index) => {
            console.log(`当前显示第${index + 1}内容`);
          }}
          style={{ height: Taro.pxTransform(250) }}
        >
          <Tab title="标签1">
            <View className="demo-text-1">标签内容 1</View>
          </Tab>
          <Tab title="标签2">
            <View className="demo-text-2" onClick={() => Taro.showToast({ title: '我被点击了' })}>标签内容 2</View>
          </Tab>
          <Tab title="标签3">
            <View className="demo-text-3">标签内容 3</View>
          </Tab>
          <Tab title="标签4">
            <View className="demo-text-4">标签内容 4</View>
          </Tab>
          <Tab title="标签5">
            <View className="demo-text-4">标签内容 5</View>
          </Tab>
          <Tab title="标签6">
            <View className="demo-text-4">标签内容 6</View>
          </Tab>
          <Tab title="标签7">
            <View className="demo-text-4">标签内容 7</View>
          </Tab>
          <Tab title="标签8">
            <View className="demo-text-4">标签内容 8</View>
          </Tab>
        </Tabs>
      </View>

      
      <View className="demo-title">切换动画</View>
      <View className="demo-content">
        <Tabs
          swipeable
          onChange={(index) => {
            console.log(`当前显示第${index + 1}内容`);
          }}
          style={{ height: Taro.pxTransform(250) }}
        >
          <Tab title="标签1">
            <View className="demo-text-1" onClick={() => Taro.showToast({ title: '我被点击了' })}>标签内容 1</View>
          </Tab>
          <Tab title="标签2">
            <View className="demo-text-2">标签内容 2</View>
          </Tab>
          <Tab title="标签3">
            <View className="demo-text-3">标签内容 3</View>
          </Tab>
          <Tab title="标签4">
            <View className="demo-text-4">标签内容 4</View>
          </Tab>
        </Tabs>
      </View>


      <View className="demo-title">状态</View>
      <View className="demo-content">
        <Tabs
          onChange={(index) => {
            console.log(`当前显示第${index + 1}内容`);
          }}
          style={{ height: Taro.pxTransform(250) }}
        >
          <Tab title="标签1">
            <View className="demo-text-1">标签内容 1</View>
          </Tab>
          <Tab title="标签2">
            <View className="demo-text-2">标签内容 2</View>
          </Tab>
          <Tab title="禁用状态" disabled>
            <View className="demo-text-3">标签内容 3</View>
          </Tab>
          <Tab title="标签4">
            <View className="demo-text-4">标签内容 4</View>
          </Tab>
        </Tabs>
      </View>

      
      <View className="demo-title">底部选项卡</View>
      <View className="demo-content">
        <Tabs
          placement="bottom"
          style={{ height: Taro.pxTransform(250) }}
        >
          <Tab title="标签1">
            <View className="demo-text-1">标签内容 1</View>
          </Tab>
          <Tab title="标签2">
            <View className="demo-text-2">标签内容 2</View>
          </Tab>
          <Tab title="标签3">
            <View className="demo-text-3">标签内容 3</View>
          </Tab>
          <Tab title="标签4">
            <View className="demo-text-4">标签内容 4</View>
          </Tab>
        </Tabs>
      </View>


      <View className="demo-title">左侧选项卡</View>
      <View className="demo-content">
        <Tabs
          placement="left"
          onChange={(index) => {
            console.log(`当前显示第${index + 1}内容`);
          }}
          style={{ height: Taro.pxTransform(500) }}
        >
          <Tab title="标签1">
            <View className="demo-text-1">标签内容 1</View>
          </Tab>
          <Tab title="标签2">
            <View className="demo-text-2">标签内容 2</View>
          </Tab>
          <Tab title="标签3">
            <View className="demo-text-3">标签内容 3</View>
          </Tab>
          <Tab title="标签4">
            <View className="demo-text-4">标签内容 4</View>
          </Tab>
          <Tab title="标签5">
            <View className="demo-text-4">标签内容 5</View>
          </Tab>
          <Tab title="标签6">
            <View className="demo-text-4">标签内容 6</View>
          </Tab>
          <Tab title="标签7">
            <View className="demo-text-4">标签内容 7</View>
          </Tab>
          <Tab title="标签8">
            <View className="demo-text-4">标签内容 8</View>
          </Tab>
        </Tabs>
      </View>


      <View className="demo-title">右侧选项卡</View>
      <View className="demo-content">
        <Tabs
          placement="right"
          style={{ height: Taro.pxTransform(400) }}
        >
          <Tab title="标签1">
            <View className="demo-text-1">标签内容 1</View>
          </Tab>
          <Tab title="标签2">
            <View className="demo-text-2">标签内容 2</View>
          </Tab>
          <Tab title="标签3">
            <View className="demo-text-3">标签内容 3</View>
          </Tab>
          <Tab title="标签4">
            <View className="demo-text-4">标签内容 4</View>
          </Tab>
        </Tabs>
      </View>
      

    </View>
  );
}
