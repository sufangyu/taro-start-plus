import { ReactNode } from 'react';

/**
 * 对象级的 Column 数据
 */
export type PickerColumnItem = {
  label: string;
  value: string | number;
}

/**
 * 各个 Colum 数据
 */
export type PickerColumn = (string | PickerColumnItem)[];

/**
 * 各个 Colum 选择索引
 */
export type ColumnValues = number[];

/**
 * 默认值. 下标 或 其选项的 value 值
 */
export type PickerDefault = (number | Partial<PickerColumnItem>)[]; 

/**
 * 联动 Picker 的 option
 */
export type CascadePickerOption = {
  children?: CascadePickerOption[];
} & (PickerColumnItem);


/**
 * 确定回调函数结果
 */
export interface ConfirmCallBack {
  choosedIndexValues?: ColumnValues;
  choosedResult: PickerColumn[];
}

export interface PickerBaseProps {
  children: ReactNode;
  /**
   * 模式. 默认 normal
   * - normal: 独立
   * - cascade: 联动
   */
  mode?: 'normal' | 'cascade';
  /**
   * 默认选中项序号
   */
  defaultValues?: PickerDefault;
  /**
   * 配置每一列的选项
   * 
   * mode=normal 时配置
   */
  columns?: PickerColumn[];
  /**
   * 树形的选项数据
   * 
   * mode=cascade 时配置
   */
  options?: (CascadePickerOption)[];
  /**
   * 标题文本
   */
  titleText?: ReactNode;
  /**
   * 确定文本
   */
  confirmText?: ReactNode;
  /**
   * 确定回调函数
   */
  onConfirm?: (cb: ConfirmCallBack) => void;
  /**
   * 取消文本
   */
  cancelText?: ReactNode;
  /**
   * 取消回调函数
   */
  onCancel?: () => void;
  /**
   * 点击背景蒙层后是否关闭. 默认 true
   * 
   */
  closeOnOverlayClick?: boolean;
  /**
   * picker 高度
   */
  height?: number;
  /** 
   * 设置选择器中间选中框的样式
   * @supported weapp, alipay, swan, tt, qq, jd, rn
   */
  indicatorStyle?: string;
}
