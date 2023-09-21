import { ReactElement, ReactNode } from 'react';

export interface FixedNavOption {
  id?: number | string;
  /**
   * 文本 
   */
  text?: string;
  /**
   * 图标. 可以是 图片地址, 也可以是组件
   */
  icon?: ReactNode;
}

export interface FixedNavProps {
  /**
   * 自定义内容
   */
  children?: ReactNode;
  /**
   * 悬浮列表内容数据配置
   */
  options?: FixedNavOption[];
  /**
   * 展开方向. 默认 right
   * - left: 左侧展开
   * - right: 右侧展开
   */
  direciton?: 'left' | 'right';
  /**
   * 默认是否展开. 默认 false
   */
  visible?: boolean;
  /**
   * 收起列表按钮文案. 默认 '收起导航'
   */
  activeText?: string;
  /**
   * 展开列表按钮文案. 默认 '快速导航'
   */
  inactiveText?: string;
  /**
   * 按钮指示图标
   */
  btnIcon?: ReactElement;
  /**
   * 展开时是否显示遮罩层. 默认 true
   */
  overlay?: boolean;
  /**
   *  fixed 垂直位置. 默认 {top: 'auto', bottom: 'auto'}
   */
  position?: {
    top?: string;
    bottom?: string;
  };
  /**
   * 展开收起按钮回调
   * @param value 
   * @returns 
   */
  onChange?: (value: boolean) => void;
  /**
   * 选择之后触发
   * @param item 
   * @param index 
   * @returns 
   */
  onSelect?: (item, index: number) => void;
}
