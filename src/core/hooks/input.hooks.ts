import { TaroEvent } from "@tarojs/components";
import { useState } from "react";

/**
 * 处理表单的输入赋值
 *
 * @export
 * @template T
 * @param {T} initialState 初始化值
 * @return {*}  {[
 *   T,
 *   (ev: any, key?: string, formatVal?: (val: any) => any) => T,
 * ]}
 * 
 * 示例:
 * ``` ts
 * // 单个值
 * const [name, setName] = useInput<string>('');
 * const [address, setAddress] = useInput<string[]>([]);
 * 
 * // 对象值
 * const [others, setOthers] = useInput({
 *   password: '',
 *   mobile: '',
 *   age: '',
 *   address: [],
 *   delivery: true,
 * });
 * ```
 */
export default function useInput<T>(initialState: T): [
  T,
  (ev: any, key?: string, formatVal?: (val: any) => any) => T,
] {
  const [val, setVal] = useState<T>(initialState);
  
  /**
   * 处理输入、选择值设置
   *
   * @param {any} ev 当前输入框对象
   * @param {string} [key] 对象值 key
   * @param {Function} [formatVal] 特殊处理值的函数, 需 return 处理后的值
   */
  function handleInput(ev: any, key?: string, formatVal?: (val: any) => any): T {
    // console.log('handleInput=>>', ev, key);
    // 非表单元素 => 直接取值
    let value = ev;
    
    // 表单元素 => 从 ev.detail.value 取值
    if (ev.detail) {
      value = (ev as TaroEvent<EventTarget>).detail?.value;
    }
    
    // 处理字符串前后空格
    if (typeof value === 'string') {
      value = value.trim();
    }

    // 处理特殊限制条件
    if (formatVal) {
      value = formatVal(value);
    }

    if (key) {
      setVal((prevVal) => ({
        ...prevVal,
        [key]: value,
      }));
    } else {
      setVal(value);
    }
    return value as T;
  };

  return [val, handleInput];
}