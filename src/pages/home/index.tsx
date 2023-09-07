import {
  View, Text, Button,
} from '@tarojs/components';
import Taro, { useDidShow, useLoad } from '@tarojs/taro';

import {
  Check, CheckOne, Close, HomeTwo, Round, VolumeNotice, 
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

      <View>
        <HomeTwo theme="filled" fill="#007fff" size={32} />
        <Close size={32} />
        <VolumeNotice size={32} />
        <Check size={32} fill="#007fff" />
        <CheckOne size={32} theme="filled" fill="#007fff" />
        <Round size={32} fill="#dcdcdc" />
      </View>

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
