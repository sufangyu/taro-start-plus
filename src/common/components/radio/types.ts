import { ReactElement, ReactNode } from 'react';

export type RadioValue = string | number | boolean;

// 状态
export type RadioStauts = 'unchecked' | 'checked';


export interface RadioProps {
  children?: ReactNode;
  /**
   * 主文案
   */
  label?: string;
  /**
   * 描述文案
   */
  description?: string;
  /**
   * 初始是否选中. 默认 false
   */
  defaultChecked?: boolean;
  /**
   * 指定当前是否选中. 结合 radio.group 时使用
   */
  value?: RadioValue;
  /**
   * 是否选中. 默认 false
   */
  checked?: boolean;
  /**
   * 选中时的值. 默认 true
   */
  trueLabel?: RadioValue;
  /**
   * 没有选中时的值. 默认 false
   */
  falseLabel?: RadioValue;
  /**
   * 是否禁用. 默认 false
   */
  disabled?: boolean;
  /**
   * 勾选框和内容相对位置. 默认 left
   * 
   * 可选项：
   * - left
   * - right
   */
  placement?: 'left' | 'right';
  /**
   * icon 图标
   * - check: 打勾
   * - circle: 圆形
   * - dot: 点形
   * - Function: 自定义
   */
  icon?: 'check' | 'circle' | 'dot' | ((checked: boolean) => ReactElement);
  /**
   * 是否允许取消选中. 默认 false
   */
  uncheck?: boolean;
  /**
   * 是否为块级元素. 默认 true
   */
  block?: boolean;
  /**
   * 是否单选组，用于 Group 模式
   */
  isGroup?: boolean;
  /**
   * 变化时回调函数
   * @param value 
   * @returns 
   */
  onChange?: (value: RadioValue) => void;
}


export interface RadioGroupProps {
  children: ReactElement<RadioProps>[];
  /**
   * 默认选中的选项
   */
  defaultValue: RadioValue;
  /**
   * 整组失效. 默认 false
   */
  disabled?: boolean;
  /**
   * 单选框是否为块级元素. 默认 true
   */
  block?: boolean;
  /**
   * 主题
   * 
   * - default: 通栏
   * - card: 卡片, 非通栏
   */
  theme?: 'default' | 'card';
  /**
   * 变化时回调函数
   * @param value 
   * @returns 
   */
  onChange?:(value: RadioValue) => void;
}
