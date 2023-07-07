import {StorageKey} from '@/common/constants'
import { appUtil, storageUtil } from '@/core/utils';
import {ENV_MAP} from './api.config'


// 默认环境标识
export const ENV_CODE_DEFAULT = getDefaultEnvCode();


let isReadStore = ['develop', 'trial'].includes(appUtil.getConfig().envVersion);

// 当前环境标识
export const ENV_CODE = isReadStore
  ? storageUtil.getAsync(StorageKey.API_ENV_CODE_KEY) || ENV_CODE_DEFAULT
  : ENV_CODE_DEFAULT;

// 当前环境配置
export const ENV_CURRENT = ENV_MAP.find(item => item.code === ENV_CODE);

// 当前环境配置的 API MAP
export const API_BASE_MAP = ENV_CURRENT?.apiBase;


/**
 * 获取默认标识
 *
 * @return {*}  {string}
 */
function getDefaultEnvCode():string {
  const isProd = process.env.NODE_ENV === 'production';

  // 命令行指定的运行/打包环境
  let CMD_API_ENV = process.env.API_ENV || '';

  // 是否有环境配置
  const hasEnvConfig = ENV_MAP.some(env => env.code === CMD_API_ENV);

  if (CMD_API_ENV) {
    if (!isProd && hasEnvConfig) {
      console.log(`正使用命令行配置的 ${CMD_API_ENV} 环境`);
    }

    if (!hasEnvConfig) {
      console.warn(`缺省 ${CMD_API_ENV} 的环境配置, 将使用默认环境`);
      CMD_API_ENV = '';
    }
  }

  // 开发环境的环境标识
  const ENV_CODE_DEFAULT_DEV = CMD_API_ENV || 'dev';

  // 生产环境的环境标识
  const ENV_CODE_DEFAULT_PROD = CMD_API_ENV || 'prod';

  return isProd ? ENV_CODE_DEFAULT_PROD : ENV_CODE_DEFAULT_DEV;
}