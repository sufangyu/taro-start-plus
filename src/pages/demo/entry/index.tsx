import {View} from '@tarojs/components'
import {DEMO_ROUTER} from "@/common/router";
import {routeUtil} from "@/core/utils";
import './index.scss';

interface Entry {
  label: string;
  path: string;
}

export default function Index() {

  const entries: Entry[] = [
    {label: 'state、props、事件', path: DEMO_ROUTER.BASE},
    {label: '全局状态', path: DEMO_ROUTER.STORE},
    {label: '页面跳转', path: DEMO_ROUTER.NAVIGATION},
    {label: '网络请求', path: DEMO_ROUTER.REQUEST},
  ];


  return (
    <View className='container'>
      <View className='page-title'>入门教程</View>
      <View className='menu'>
        {
          entries.map(item => {
            return (
              <View
                className='menu-item'
                key={item.path}
                onClick={() => routeUtil.toPage({url: item.path})}
              >
                {item.label}
              </View>
            );
          })
        }
      </View>
    </View>
  )
}
