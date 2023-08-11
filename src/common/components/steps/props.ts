import { ReactElement, ReactNode } from 'react';


export type StepStatus = 'default' | 'process' | 'finish' | 'error'

export interface StepItemProps {
  /**
   * 标题
   */
  title: ReactNode;
  /**
   * 步骤描述。
   */
  description?: ReactNode;
  /**
   * 子元素
   */
  children?: ReactNode;
  /**
   * 当前序号
   */
  index?: number;
  /**
   * 图标
   */
  icon?: string | ReactElement;

  /**
   * 当前步骤的状态
   * 
   * - default: 默认状态（未开始）
   * - process: 进行中状态
   * - finish: 完成状态
   * - error: 错误状态
   */
  status?: StepStatus;
  /**
   * 步骤条风格。默认 default
   * 可选项：default/dot
   */
  theme?: 'default' | 'dot';
}


export interface StepsProps {
  /**
   * 当前步骤，即整个步骤条进度。
   * 
   * - 当前步骤为进行中
   * - 当前步骤之前的步骤为已完成
   * - 当前步骤之后的步骤为未开始
   */
  current: number | string;
  /**
   * 子元素
   */
  children: ReactElement<StepItemProps>[];
  /**
   * 用于控制 current 指向的步骤条的状态。默认 process
   * 
   * - default: 默认状态（未开始）
   * - process: 进行中状态
   * - finish: 完成状态
   * - error: 错误状态
   */
  currentStatus?: StepStatus;
  /**
   * 步骤条方向。默认 horizontal
   * 
   * - horizontal: 横向
   * - vertical: 纵向
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 步骤条风格。默认 default
   * 可选项：default/dot
   */
  theme?: 'default' | 'dot';
}
