/**
 * 是否开启统计分析
 * 建议本地开发默认关闭, 只在线上版开启
 */
import Taro from '@tarojs/taro';

const isDebug = true;

if (isDebug || (__wxConfig?.envVersion ?? 'release') === 'release') {
  const umeng = require('@/core/analysis/umeng').default;
  Taro.umeng = umeng;
}
