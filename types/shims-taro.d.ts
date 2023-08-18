// 参考: https://blog.csdn.net/hezhongla0811/article/details/89486261
import Taro from '@tarojs/taro';

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

    globalSystemInfo: Taro.getSystemInfoSync.Result & {
      /** 下方扩展4像素高度 防止下方边距太小 */
      navBarExtendHeight?: number;
      /** 导航栏高度不包括statusBarHeight */
      navBarHeight?: number;
      /** 
       * 右上角胶囊按钮信息: 
       * - bottom: 58
       * - height: 32
       * - left: 317
       * - right: 404
       * - top: 26
       * - width: 87
       *
       * 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
       */
      capsulePosition?: {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
      };
      /** 是否 iOS */
      ios?: boolean;
    };
  }
}
