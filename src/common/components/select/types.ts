export type SelectValue = number | string;

export interface SelectOption {
  /**
   * 标签文案
   */
  label: string;
  /**
   * 描述文案
   */
  description?: string;
  /**
   * 选项值
   */
  value: SelectValue;
  /**
   * 是否被禁用
   */
  disabled?: boolean; 
}


export interface SelectProps {
  /**
   * 选项列表
   */
  options: SelectOption[];
  /**
   * 已选择项
   */
  values: SelectValue[];
  /**
   * 布局. 默认 vertical
   * - vertical: 纵向
   * - horizontal: 横向
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 尺寸. 默认 normal
   * - normal: 常规
   * - mini: 小型
   */
  size?: 'mini' | 'normal';
  /**
   * 横向布局时, 一行几列. 默认 3
   */
  columnNum?: number;
  /**
   * 是否多选. 默认 false
   */
  multiple?: boolean;
  /**
   * 是否被禁用
   */
  disabled?: boolean;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  /**
   * 值改变回调函数
   * @returns 
   */
  onChange?: (value: SelectValue | SelectValue[]) => void;
}
