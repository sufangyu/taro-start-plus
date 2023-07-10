import { View, Text } from '@tarojs/components'
import Taro, {  useDidShow, useLoad } from '@tarojs/taro'
import type CustomTabBar from '@/custom-tab-bar/index'

import './index.scss'

export default function Index() {
  const curPage = Taro.getCurrentInstance() .page;

  useLoad(() => {
    console.log('Page loaded.')
  })

  useDidShow(() => {
    const tabbar = Taro.getTabBar<CustomTabBar>(curPage)
    tabbar?.setSelected(0)
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}
