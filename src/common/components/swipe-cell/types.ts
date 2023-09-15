export interface SwipeCellActionOption {
  /** 名称 */
  text: string;
  /** 图标 */
  icon?: string | JSX.Element;
  /** 选项样式 */
  style?: object | string;
  /** 样式类名 */
  className?: object | string | string[];
}

/** 打开操作的位置. 为空表示关闭 */
export type OpenedPosition = '' | 'left' | 'right';
