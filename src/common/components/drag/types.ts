import { ReactNode } from 'react';

export interface DragProps {
  children: ReactNode;
  /**
   * 拖拽元素的拖拽方向限制. 默认 all
   */
  direction?: 'x' | 'y' | 'all';
  /**
   * 是否开启自动吸边. 默认 false
   */
  attract?: boolean;
  /**
   *  拖拽元素的拖拽边界. 默认 {top: 0, left: 0, right: 0, bottom: 0}
   */
  boundary?: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  /**
   * 自定义属性
   */
  style?: string | React.CSSProperties | undefined;
 }
