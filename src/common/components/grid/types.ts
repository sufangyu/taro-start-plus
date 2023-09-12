import { CSSProperties, ReactElement, ReactNode } from 'react';

export interface GridItemProps {
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
  /**
   * 组件的内联样式, 可以动态设置的内联样式
   */
  style?: string | CSSProperties;
}

export interface GridProps {
  children: ReactElement | ReactElement<GridItemProps>[];
  /**
   * 列数. 默认 4
   */
  columnNum?: number;
  /**
   * 格子之间的间距. 默认 0
   */
  gutter?: number;
  /**
   * 是否显示边框. 默认 true
   */
  border?: boolean;
  /**
   * 是否将格子固定为正方形. 默认 false
   */
  square?: boolean;
  /**
   * 宫格的风格。可选项：default/card
   */
  theme?: 'default' | 'card';
}
