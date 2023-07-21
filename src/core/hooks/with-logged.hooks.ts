import Taro from '@tarojs/taro';

import { useCallback } from 'react';

import { useAccountStore } from '@/common/store';

import { routeUtil } from '../utils';


/**
 * 登录后的操作
 * 
 * @param fn 实际操作函数
 * @returns 
 */
export default function useWithLogged(fn: Function) {
  const accountStore = useAccountStore();

  return useCallback(async (...args: any[]) => {
    if (accountStore.isLogged) {
      fn.call(this, ...args);
    } else {
      const { confirm } = await Taro.showModal({
        title: '提示',
        content: '需登录才可以操作, 现在去登录 ?',
      });

      if (confirm) {
        routeUtil.toLoginPage('push');
      }
    }
  }, [fn, accountStore.isLogged]);
}
