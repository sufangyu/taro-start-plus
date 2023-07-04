// 参考: https://blog.csdn.net/hezhongla0811/article/details/89486261
import '@tarojs/taro'

declare module '@tarojs/taro' {
  interface TaroStatic {
    umeng: {
      /**
       * 自定义事件
       *
       * @template T
       * @param {string} eventName 事件编码
       * @param {any} eventName 传参
       */
      trackEvent: <T = any>(eventName: string, params?: T) => void;
    };
  }
}
