import { ITouchEvent } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { ReportEventNameEnum } from '@/common/enums';

/** 行为追踪工具类 */
const trackUtil = {
  /**
   * 自定义事件触发器
   *
   * @template T
   * @param {string} code 事件编号
   * @param {T} [params] 事件传参
   */
  eventHandler<T = Record<string, any>>(code: ReportEventNameEnum, params?: T) {
    Taro.umeng?.trackEvent(code, params ?? {});
  },

  /**
   * 事件属性埋点的页面级的监听
   *
   * @param {ITouchEvent} ev
   * 
   * 示例：
   * ```ts
   * <View className='container' onClick={trackUtil.catchElementTracker}>
   *   <Button
   *     type='primary'
   *     data-code={ReportEventNameEnum.自定义事件}
   *   >埋点(自定义属性)</Button>
   *   <Button
   *     type='primary'
   *     data-code={ReportEventNameEnum.自定义事件}
   *     data-params={{
   *       name: '张三疯',
   *       age: 18,
   *     }}
   *   >埋点有参数(自定义属性)</Button>
   *
   *   <Button
   *     type='primary'
   *     data-code={ReportEventNameEnum.自定义事件}
   *     data-params={{name: '张三疯', age: 18}}
   *     onClick={handleTriggerEventByStatic}
   *   >埋点-绑定事件(自定义属性)</Button>    
   *   
   *   <View data-code={ReportEventNameEnum.自定义事件}>View-埋点(自定义属性)</View>
   *   <View
   *     data-code={ReportEventNameEnum.自定义事件}
   *     data-params={{name: '张三疯', age: 18}}
   *   >View-埋点有参数(自定义属性)</View>
   *   <View style={{textAlign: 'center'}}>View-无埋点</View>
   * </View>
   * ```
   */
  catchElementTracker(ev: ITouchEvent) {
    const { dataset: { code, params } } = ev.target;
    
    if (code) {
      Taro.umeng?.trackEvent(code, params ?? {});
    }
  },
};

export { trackUtil };
