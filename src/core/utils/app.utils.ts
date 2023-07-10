import { isFunction } from '@tarojs/shared';
import Taro from '@tarojs/taro';


export const appUtil = {
  /**
   * 获取配置信息
   * 
   * 目前只有微信有实际作用, 其他小程序都是返回固定值
   * @return {*}  {typeof __wxConfig}
   */
  getConfig(): typeof __wxConfig {
    try {
      return __wxConfig;
    } catch (_) {
      return {
        envVersion: 'develop',
      };
    }
  },
  
  /**
   * 获取系统信息
   *
   * @return {*}  {(typeof Taro.globalSystemInfo | null)}
   */
  getSystemInfo(): typeof Taro.globalSystemInfo | null {
    if (Taro.globalSystemInfo && !Taro.globalSystemInfo.ios) {
      return Taro.globalSystemInfo;
    }

    // h5环境下忽略navbar
    if (!isFunction(Taro.getSystemInfoSync)) {
      return null;
    }

    const systemInfo: typeof Taro.globalSystemInfo = Taro.getSystemInfoSync() || {
      model: '',
      system: '',
    };

    const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
    // 胶囊数据
    let rect: Taro.getMenuButtonBoundingClientRect.Rect | null;

    try {
      rect = Taro.getMenuButtonBoundingClientRect
        ? Taro.getMenuButtonBoundingClientRect()
        : null;
      
      if (rect === null) {
        throw new Error('getMenuButtonBoundingClientRect error');
      }

      // 取值为0的情况（有可能width不为0 top为0的情况）
      if (!rect.width || !rect.top || !rect.left || !rect.height) {
        throw new Error('getMenuButtonBoundingClientRect error');
      }
    } catch (error) {
      // 胶囊按钮上下间距 使导航内容居中
      let gap = 0;
      // 胶囊的宽度
      let width = 96;

      switch (systemInfo.platform) {
        case 'android':
          gap = 8;
          width = 96;
          break;
        case 'devtools':
          // 开发工具: ios(5.5)、android和其他手机（7.5）
          gap = ios ? 5.5 : 7.5;
          break;
        default:
          gap = 4;
          width = 88;
      }

      if (!systemInfo.statusBarHeight) {
        // 开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }

      rect = {
        // 获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width,
      };
      // console.warn("error", error);
      // console.info("rect", rect);
    }

    let navBarHeight = 0;
    if (!systemInfo.statusBarHeight) {
      // 开启wifi和打电话下
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;

      navBarHeight = (function _getHeight() {
        const gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + rect.height;
      }());

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0;
    } else {
      navBarHeight = (function _getHeight() {
        const gap = rect.top - systemInfo.statusBarHeight;
        return systemInfo.statusBarHeight + 2 * gap + rect.height;
      }());

      if (ios) {
        // 下方扩展4像素高度 防止下方边距太小
        systemInfo.navBarExtendHeight = 4;
      } else {
        systemInfo.navBarExtendHeight = 0;
      }
    }

    systemInfo.navBarHeight = navBarHeight;
    systemInfo.capsulePosition = rect;
    systemInfo.ios = ios;

    // 将信息保存到全局变量中,后边再用就不用重新异步获取了
    Taro.globalSystemInfo = systemInfo;
    return systemInfo;
  },
};
