import { ReactNode } from 'react';

export interface CellGroupProps {
  children: ReactNode;
  /**
   * 分组标题
   */
  title?: string;
  /**
   * 是否展示为圆角卡片风格. 默认 false
   */
  inset?: boolean;
}

export interface CellProps {
  /**
   * 左侧区域
   */
  prefix?: ReactNode;
  /**
   * 左侧标题
   */
  title?: ReactNode;
  /**
   * 标题中间下部的描述区域
   */
  description?: ReactNode;
  /**
   * 列表项右侧区域
   */
  extra?: ReactNode;
  /**
   * 是否显示右侧箭头. 默认 false
   */
  arrow?: boolean;
  /**
   * 右侧箭头箭头方向
   * 
   * - right:
   * - down:
   */
  arrowDirection?: 'right' | 'down';
  /**
   * 后置内容
   */
  suffix?: ReactNode;
  /**
   * 是否使内容垂直居中
   */
  center?: boolean;
  /**
   * 是否显示表单必填星号
   */
  required?: boolean;
  /**
   * 点击回调函数
   */
  onClick?: () => void;
}
