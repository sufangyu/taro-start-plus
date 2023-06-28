/** 微信注入配置信息 */
/* eslint-disable no-underscore-dangle */
declare const __wxConfig: {
  /**
   * 微信各版本标识
   * 
   * develop: 开发版
   * trial: 体验版
   * release: 生产版
   */
  envVersion: 'develop' | 'trial' | 'release';
};
