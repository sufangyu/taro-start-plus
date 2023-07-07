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
  }
}