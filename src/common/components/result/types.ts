import { ReactNode } from 'react';


export type ResultStatus = 'success' | 'waiting' | 'info' | 'warning' | 'error';

export interface ResultProps {
  /**
   * 状态类型. 默认值 info
   */
  status?: ResultStatus;
  /**
   * 自定义 icon
   */
  icon?: ReactNode;
  /**
   * 标题
   */
  title?: ReactNode;
  /**
   * 描述
   */
  description?: ReactNode;
  /**
   * 操作按钮
   */
  actions?: ReactNode;
}
