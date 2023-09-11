import { ReactNode } from 'react';


export type optionValue = number | string;

export interface SelectOption { 
  label?: string; 
  value?: optionValue;
  /**
   * 是否是 全选选项
   */
  checkAll?: boolean;
}

export interface PickerSelectProps {
  children: ReactNode;
  /**
   * 标题文本
   */
  title?: ReactNode;
  /**
   * 确定文本
   */
  conformText?: string;
  /**
   * 选择项类型
   * - radio: 单选
   * - checkbox: 多选
   */
  type: 'radio' | 'checkbox';
  /**
   * 选择项配置项
   */
  options: SelectOption[];
  /**
   * 选择项默认值.
   * 
   * radio 单选时, 传入单个值的数组
   */
  defaultValues: optionValue[];
  /**
   * 取消回调函数
   */
  onCancel?: () => void;
  /**
   * 确定回调函数
   */
  onConform?: (data: optionValue | optionValue[]) => void;
}
