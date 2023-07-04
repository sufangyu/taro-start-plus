import { View, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { trackUtil } from '@/core/utils/track.util'
import { ReportEventNameEnum } from '@/common/enums'

import './index.scss'


export default function Index() {

  useLoad(() => {
    console.log('Tracker Event Page loaded.')
  })

  const handleTriggerEvent = () => {
    trackUtil.eventHandler(ReportEventNameEnum.自定义事件);
  };

  const handleTriggerEventWithParams = () => {
    trackUtil.eventHandler<{name: string; age: number;}>(ReportEventNameEnum.自定义事件带参数, {
      name: '张三疯',
      age: 18,
    });
  };

  const handleTriggerEventByStatic = () => {
    console.log('实际事件被触发');
  }

  

  return (
    <View className='container' onClick={trackUtil.catchElementTracker}>
      <Button type='primary' onClick={handleTriggerEvent}>埋点(事件触发)</Button>
      <Button type='primary' onClick={handleTriggerEventWithParams}>埋点有带参数(事件触发)</Button>

      <Button
        type='primary'
        data-code={ReportEventNameEnum.自定义事件}
      >埋点(自定义属性)</Button>
      <Button
        type='primary'
        data-code={ReportEventNameEnum.自定义事件}
        data-params={{
          name: '张三疯',
          age: 19,
        }}
      >埋点有参数(自定义属性)</Button>

      <Button
        type='primary'
        data-code={ReportEventNameEnum.自定义事件}
        data-params={{name: '张三疯', age: 20}}
        onClick={handleTriggerEventByStatic}
      >埋点-绑定事件(自定义属性)</Button>
      
      
      <View data-code={ReportEventNameEnum.自定义事件}>View-埋点(自定义属性)</View>
      <View
        data-code={ReportEventNameEnum.自定义事件}
        data-params={{name: '张三疯', age: 21}}
      >View-埋点有参数(自定义属性)</View>
      <View style={{textAlign: 'center'}}>View-无埋点</View>
    </View>
  )
}
