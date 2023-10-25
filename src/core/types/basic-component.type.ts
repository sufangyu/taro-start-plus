import { CSSProperties, ReactNode } from 'react';

export interface BasicComponent {
  /**
   * class 类名
   */
  className?: string;
  /**
   * 行内样式
   */
  style?: CSSProperties;
  /**
   * 子元素
   */
  children?: ReactNode;
  /**
   * id
   */
  id?: string;
}

export const basicComponentDefaults: Partial<BasicComponent> = {
  className: '',
  style: {},
};
