import {
  View, Text, Button,
} from '@tarojs/components';
import Taro, { useDidShow, useLoad, usePageScroll } from '@tarojs/taro';

import { useState } from 'react';

import { DebugEnv, NavigationBar } from '@/common/components';
import { useAccountStore } from '@/common/store';
import { routeUtil } from '@/core/utils';
import type CustomTabBar from '@/custom-tab-bar/index';

import './index.scss';

export default function Index() {
  const curPage = Taro.getCurrentInstance().page;
  const accountStore = useAccountStore();
  const [opacity, setOpacity] = useState(0);

  useLoad(() => {
    console.log('Page loaded.');
  });

  useDidShow(() => {
    try {
      const tabbar = Taro.getTabBar<CustomTabBar>(curPage);
      tabbar?.setSelected(2);  
    } catch (_) {}
  });

  usePageScroll((payload) => {
    const curOpacity = Math.min(payload.scrollTop / 60, 1);
    setOpacity(curOpacity);
  });
  

  return (
    <>
      <View style={{ opacity }}>
        <NavigationBar
          title="我的"
          background="#fff"
          extClass="navbar--fixed"
        />
      </View>

      <View className="container">
        <View className="header">
          <View>
            <Text>我的页面</Text>
          </View>

          {
            accountStore.isLogged
            && (
              <View>
                <View>name: {accountStore.account?.name}</View>
                <View>token: {accountStore.account?.token}</View>

                <Button onClick={() => accountStore.logout()}>退出登录</Button>
              </View>
            )
          }

          {
            !accountStore.isLogged
            && (
              <View>
                <Button
                  type="primary"
                  onClick={() => routeUtil.toLoginPage()}
                >登录
                </Button>
              </View>
            )
          }
        </View>

        <View style={{ height: 1200 }} />
      </View>
      
      <DebugEnv />
    </>
  );
}
