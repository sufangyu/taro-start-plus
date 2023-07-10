import {
  View, Text, Button, MovableArea, MovableView, 
} from '@tarojs/components';
import Taro, { useDidShow, useLoad } from '@tarojs/taro';
import { useAccountStore } from '@/common/store';
import { DebugEnv } from '@/common/components';
import { routeUtil } from '@/core/utils';
import type CustomTabBar from '@/custom-tab-bar/index';

import './index.scss';

export default function Index() {
  const curPage = Taro.getCurrentInstance().page;
  const accountStore = useAccountStore();

  useLoad(() => {
    console.log('Page loaded.');
  });

  useDidShow(() => {
    const tabbar = Taro.getTabBar<CustomTabBar>(curPage);
    tabbar?.setSelected(2);
  });

  return (
    <MovableArea style={{ minWidth: '100vw', minHeight: '100vh' }}>
      <View className="container">
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
      
      <MovableView style={{ height: '32px', width: '32px' }} direction="all" x={320} y={0}>
        <DebugEnv />
      </MovableView>
    </MovableArea>
  );
}
