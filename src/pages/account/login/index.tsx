import { View, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useRef } from 'react';
import { useAccountStore } from '@/common/store';
import { routeUtil } from '@/core/utils';
import { appRouterConfig } from '@/common/router';

import './index.scss';


export default function Index() {
  const accountStore = useAccountStore();
  const router = useRouter();
  const timer = useRef<any | null>(null);

  const handleLogin = async () => {
    const result = await Taro.login();
    console.log('Taro.login=>>', result);

    const account = {
      token: 'token-xxx-?-yy-asd-zs',
      name: '张三疯',
      age: 18,
    };
    accountStore.login(account);


    // 登录成功, 重定向来源页面
    Taro.showToast({
      title: '登录成功',
      icon: 'success',
      mask: true,
    });
    timer.current = setTimeout(() => {
      const { from } = router.params;
      const redirectUrl = from ? decodeURIComponent(from) : appRouterConfig.home.path;
      const mode = 'replace';
      // TODO: 登录后的 跳转方式 处理
      routeUtil.toPage({ url: redirectUrl, mode });
    }, 1000);
  };

  return (
    <View className="container">
      <Button
        type="primary"
        onClick={handleLogin}
      >登录（模拟）
      </Button>

      <View
        style={{ marginTop: 125, textAlign: 'center', color: '#007fff' }}
        onClick={() => routeUtil.toPage({
          url: appRouterConfig.register.path,
        })}
      >没有账号？现在注册
      </View>
    </View>
  );
}
