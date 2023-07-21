import Taro from '@tarojs/taro';

import { useEffect } from 'react';

// const events = new Events();

/**
 * 监听事件总线
 *
 * @export
 * @template T 返回类型
 * @param {string} eventName 事件名
 * @param {(...args: T[]) => void} listener
 * ```ts
 * // 监听事件
 * useEvents<{name: string; age: number}>(EventNameEnum.刷新列表, (args) => {
 *   console.log('监听用户信息=>>', args);
 *   setPerson((prevState) => ({
 *     ...prevState,
 *     name: args.name,
 *     age: args.age
 *   }));
 * });
 * 
 * // 触发事件
 * Taro.eventCenter.trigger(EventNameEnum.刷新列表, {
 *   name: 'zsf', age: 20,
 * });
 * ```
 */
export default function useEvents<T>(eventName: string, listener: (...args: T[]) => void): void {
  useEffect(() => {
    Taro.eventCenter.on(eventName, (...args: T[]) => {
      listener(...args);
    });

    // 卸载监听
    return () => {
      Taro.eventCenter.off(eventName);
    };
  });
}
