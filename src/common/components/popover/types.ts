import { ReactNode } from 'react';

const placement = {
  top: '顶部中间位置',
  'top-start': '顶部左侧位置',
  'top-end': '顶部右侧位置',
  left: '左侧中间位置',
  'left-start': '左侧上方位置',
  'left-end': '左侧下方位置',
  right: '右侧中间位置',
  'right-start': '右侧上方位置',
  'right-end': '右侧下方位置',
  bottom: '底部中间位置',
  'bottom-start': '底部左侧位置',
  'bottom-end': '底部右侧位置',
};


/** 弹出位置 */
export type PopoverPlacement = keyof typeof placement;


/** Action */
export interface PopoverActionItem {
  /** 选项文字 */
  text?: string;
  /** 文字左侧的图标, 支持传入图片资源地址、图片组件 */
  icon?: ReactNode;
  /** 选项文字颜色 */
  color?: string;
  /** 是否为禁用状态 */
  disabled?: boolean;
  /** 对应选项添加额外的类名 */
  className?: string | string[] | object;
  /** 点击回调函数 */
  onClick?: (item: PopoverActionItem, index: number) => void;
}
