import { ReactElement, ReactNode } from 'react';

export type CheckboxValue = string | number | boolean;

export type CheckboxGroupValues = (string | number)[];

// 状态(选中、未选择)
export type CheckboxStauts = 'unchecked' | 'checked';

export type CheckAllStatus = CheckboxStauts | 'indeterminate'


export interface CheckboxProps {
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
   * 携带的标识值，用于 Group 模式
   */
  value?: CheckboxValue;
  /**
   * 是否多选组，用于 Group 模式
   */
  isGroup?: boolean;
  /**
   * 用于标识是否为「全选选项」，单独使用无效. 默认 false
   */
  checkAll?: boolean;
  /**
   * 全选勾选框的状态. 全选时才有限
   * - unchecked: 未选择
   * - checked: 已全选
   * - indeterminate: 部分选（不确定）
   */
  checkAllStatus?: CheckAllStatus;
  /**
   * 是否选中. 默认 false
   */
  checked?: boolean;
  /**
   * 选中时的值. 默认 true
   */
  trueLabel?: CheckboxValue;
  /**
   * 没有选中时的值. 默认 false
   */
  falseLabel?: CheckboxValue;
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
   * - Function: 自定义
   */
  icon?: 'check' | 'circle' | ((checked: boolean) => ReactElement);
  /**
   * 是否为块级元素. 默认 true
   */
  block?: boolean;
  /**
   * 变化时回调函数
   * @param value 
   * @param isCheckAll 
   * @returns 
   */
  onChange?: (value: CheckboxValue, isCheckAll?: boolean) => void;
  /**
   * 点击事件
   */
  onClick?: (ev: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;

}


export interface CheboxkGroupProps {
  children: ReactElement<CheckboxProps>[];
  /**
   * 默认选中的选项
   */
  defaultValues?: CheckboxGroupValues;
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
   * @param values
   * @returns 
   */
  onChange?:(values: CheckboxGroupValues) => void;
}
