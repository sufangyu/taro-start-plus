/* eslint-disable import/extensions */
import { useCallback, useRef } from 'react';

import useForceUpdate from './force-update.hooks';


interface UsePropsValue<T> {
  /** 当前值 */
  value?: T;
  /** 默认值 */
  defaultValue?: T;
  /** 默认值（defaultValue 为 undefined 时） */
  finalValue?: T;
  /** 变化回调函数 */
  onChange?: (value: T) => void;
}


export default function usePropsValue<T>({
  value, defaultValue, finalValue, onChange, 
}: UsePropsValue<T>): [
  value: T, onChange: (value: T) => void
] {
  const forceUpdate = useForceUpdate();
  const dfValue = (defaultValue !== undefined ? defaultValue : finalValue) as T;
  const stateRef = useRef<T>(value !== undefined ? value : dfValue);

  // // ???
  // if (value !== undefined) {
  //   stateRef.current = value;
  // }

  const setState = useCallback(
    (val: T) => {
      const prevState = stateRef.current;
      stateRef.current = val;
      if (prevState !== stateRef.current) {
        forceUpdate();
      }
      onChange?.(val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, onChange],
  );

  return [stateRef.current, setState];
}
