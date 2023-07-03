/* eslint-disable import/no-named-as-default-member */
import { View } from '@tarojs/components'
import NP from 'number-precision'
import './index.scss'

export default function Index() {


  return (
    <View className='container'>
      <View>接近正确数字：{NP.strip(0.09999999999999998)}</View>
      <View>加法（0.1+0.2=0.3）：{NP.plus(0.1, 0.2)}</View>
      <View>减法（1.0-0.9=0.1）：{NP.minus(1.0, 0.9)}</View>
      <View>乘法（3*0.3=0.9）：{NP.times(3, 0.3)}</View>
      <View>除法（1.21/1.1=1.1）：{NP.divide(1.21, 1.1)}</View>
      <View>取整：{NP.round(0.105, 2)}</View>
    </View>
  )
}
