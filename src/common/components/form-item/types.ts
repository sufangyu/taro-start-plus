import { ReactNode } from 'react';

export interface FormItemProps {
  children: ReactNode;
  /**
   * 前置扩展内容
   */
  prefix?: ReactNode;
  /**
   * 后置扩展内容
   */
  extra?: ReactNode;
  /**
   * 标签
   */
  label?: ReactNode;
  /**
   * 标题扩张
   */
  titleExtra?: ReactNode;
  /**
   * 布局
   * - horizontal: 水平
   * - vertical: 垂直
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 是否禁用. 默认 false
   */
  disabled?: boolean;
  /**
   * 是否必填项. 默认 false
   */
  required?: boolean;
  /**
   * 是否只读模式. 默认 false
   */
  readOnly?: boolean;
  /**
   * 展示内容. 
   * 
   * 只在 只读默认模式 下显示
   */
  content?: ReactNode;
  /**
   * 展示内容对齐. 默认 right
   * 
   * 只在 只读默认模式 有用
   */
  contentAlign?: 'left' | 'center' | 'right';
  /**
   * 是否显示右侧向右箭头. 默认显示
   * 
   * 只在 只读默认模式 下显示
   */
  arrow?: boolean;
}


export interface FormPlaceholderProps {
  children: ReactNode;
  /**
   * 是否占位状态. 默认 true
   */
  isPlaceholder?: boolean;
  /**
   * 展示内容对齐. 默认 left
   * 
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 是否显示右侧向右箭头. 默认 true
   */
  arrow?: boolean;
}
