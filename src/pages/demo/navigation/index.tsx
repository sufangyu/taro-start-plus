import { View, Text, Button } from '@tarojs/components'
import { useRouter } from '@tarojs/taro';
import { routeUtil } from '@/core/utils'
import { DEMO_ROUTER, TAB_BAR_ROUTER } from '@/common/router'

import './index.scss'


export default function Index() {
  const router = useRouter();
  console.log('router params->>', router.params);

  return (
    <View className='container'>
      <Button
        type='primary'
        onClick={() => {
          routeUtil.toPage({
            url: DEMO_ROUTER.BASE,
          });
        }}
      >
        <Text>跳转页面</Text>
      </Button>

      <Button
        type='primary'
        onClick={() => {
          routeUtil.toPage({
            url: DEMO_ROUTER.NAVIGATION,
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
        type='primary'
        onClick={() => {
          routeUtil.toPage({
            url: TAB_BAR_ROUTER.MINE,
          });
        }}
      >
        <Text>跳转页面 - tabBar</Text>
      </Button>

      <Button
        type='primary'
        onClick={() => {
          routeUtil.toPage({
            url: DEMO_ROUTER.BASE,
            mode: 'replace',
          });
        }}
      >
        <Text>重定向页面</Text>
      </Button>

      <Button
        type='primary'
        onClick={() => {
          routeUtil.back();
        }}
      >
        <Text>返回上一页</Text>
      </Button>


      <Button
        type='primary'
        onClick={() => {
          routeUtil.reLaunch({
            url: TAB_BAR_ROUTER.HOME,
          });
        }}
      >
        <Text>打开页面 - 关闭其他</Text>
      </Button>

      <Button
        type='primary'
        onClick={() => {
          const page = routeUtil.getPage(1);
          console.log('page =>>', page.config);
        }}
      >
        <Text>获取当前页面对象</Text>
      </Button>
    </View>
  )
}
