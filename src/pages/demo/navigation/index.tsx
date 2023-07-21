import { View, Text, Button } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';

import { appRouterConfig } from '@/common/router';
import { routeUtil } from '@/core/utils';

import './index.scss';


export default function Index() {
  const router = useRouter();
  console.log('router params->>', router.params);

  return (
    <View className="container">
      <Button
        type="primary"
        onClick={() => {
          routeUtil.toPage({
            url: appRouterConfig.base.path,
          });
        }}
      >
        <Text>跳转页面</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          routeUtil.toPage({
            url: appRouterConfig.navigation.path,
            query: {
              name: '张三疯',
              age: 45,
            },
          });
        }}
      >
        <Text>跳转页面 - 传参</Text>
      </Button>


      <Button
        type="primary"
        onClick={() => {
          routeUtil.toPage({
            url: appRouterConfig.mine.path,
          });
        }}
      >
        <Text>跳转页面 - tabBar</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          routeUtil.toPage({
            url: appRouterConfig.base.path,
            mode: 'replace',
          });
        }}
      >
        <Text>重定向页面</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          routeUtil.back();
        }}
      >
        <Text>返回上一页</Text>
      </Button>


      <Button
        type="primary"
        onClick={() => {
          routeUtil.reLaunch({
            url: appRouterConfig.home.path,
          });
        }}
      >
        <Text>打开页面 - 关闭其他</Text>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          const page = routeUtil.getPage();
          console.log('page =>>', page.config);
        }}
      >
        <Text>获取当前页面对象</Text>
      </Button>
    </View>
  );
}
