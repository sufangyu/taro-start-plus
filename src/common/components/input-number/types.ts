import { BaseEventOrig, InputProps } from '@tarojs/components';

import { ReactNode } from 'react';

export interface InputNumberProps {
  /**
   * 文本内容位置. 默认 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 输入框默认值
   */
  defaultValue?: number;
  /**
   * 允许最小值. 默认 -Infinity
   */
  min?: number;
  /**
   * 允许最大值. 默认 Infinity
   */
  max?: number;
  /**
   * 数值改变步数. 默认 1
   */
  step?: number;
  /**
   * 是否只能输入 step 的倍数. 默认 false
   */
  stepStrictly?: boolean;
  /**
   * 数值精度(小数位). 默认 0
   */
  precision?: number;
  /**
   * 尺寸. 默认 'default'
   */
  size?: 'large' | 'default' | 'small';
  /**
   * 宽度
   */
  width?: string;
  // /**
  //  * 是否只读属性. 默认 false
  //  */
  // readonly?: boolean;
  /**
   * 是否禁用. 默认 false
   */
  disabled?: boolean;
  /**
   * 是否使用控制按钮. 默认 true
   */
  controls?: boolean;
  /**
   * 控制按钮位置
   */
  controlsPosition?: '' | 'right';
  /**
   * 占位描述文案
   */
  placeholder?: string;
  /**
   * prefix
   */
  prefix?: ReactNode;
  /**
   * 后缀
   */
  suffix?: ReactNode;
  /**
   * 绑定值被改变时触发
   * @param currentValue 
   * @param oldValue 
   * @returns 
   */
  onChange?: (currentValue: string | undefined, oldValue: string | undefined) => void;
  /**
   * Input 失去焦点时触发
   * @param event 
   * @returns 
   */
  onBlur?: (event: BaseEventOrig<InputProps.inputValueEventDetail>) => void;
  /**
   * Input 获得焦点时触发
   * @param event 
   * @returns 
   */
  onFocus?: (event: BaseEventOrig<InputProps.inputForceEventDetail>) => void;
}
