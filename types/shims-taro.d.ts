// https://blog.csdn.net/hezhongla0811/article/details/89486261
import { Events } from '@tarojs/taro';

declare module '@tarojs/taro' {
  /** 事件订阅 */
  let events: typeof Events;

  /** 友盟统计 */
  let uma: {
    /**
     * 自定义事件
     *
     * @param {string} eventName 事件名称
     * @param {any} eventName 传参
     */
    trackEvent: (eventName: string, params?: any) => void;
  };
}
