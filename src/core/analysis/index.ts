/**
 * 是否开启统计分析
 * 建议本地开发默认关闭, 只在线上版开启
 */
import Taro from '@tarojs/taro';
import { appUtil } from '@/core/utils';

const isDebug = false;

if (isDebug || appUtil.getConfig().envVersion === 'release') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const umeng = require('@/core/analysis/umeng').default;
  Taro.umeng = umeng;
}
