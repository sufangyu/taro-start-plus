import {
  View, Text, Button,
} from '@tarojs/components';
import Taro, { useDidShow, useLoad } from '@tarojs/taro';

import {
  Close, HomeTwo, VolumeNotice, 
} from '@/common/components';
import type CustomTabBar from '@/custom-tab-bar/index';

import './index.scss';

export default function Index() {
  const curPage = Taro.getCurrentInstance().page;

  useLoad(() => {
    console.log('Page loaded.');
  });

  useDidShow(() => {
    try {
      const tabbar = Taro.getTabBar<CustomTabBar>(curPage);
      tabbar?.setSelected(0);
    } catch (_) {}
  });


  return (
    <View className="index">
      <Text>Hello world!</Text>

      <HomeTwo theme="filled" fill="#007fff" size={16} />
      <Close size={16} />
      <VolumeNotice size={16} />

      <Button
        onClick={() => {
          try {
            const a = {};
            a.b.c = 'x';
          } catch (error) {
            throw new Error(error);
          }
        }}
      >
        触发语法错误
      </Button>

      <Button
        onClick={() => {
          Promise.reject(
            new TypeError('Primise error!'),
          );
        }}
      >
        触发异步错误
      </Button>
    </View>
  );
}
