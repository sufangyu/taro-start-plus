import { BaseEventOrig, ImageProps } from '@tarojs/components';

import { CSSProperties, ReactElement } from 'react';

export type AvatarSize = 'small' | 'medium' | 'large' | number;

export interface AvatarProps {
  children?: string | ReactElement;
  /**
   * 图片地址
   */
  src?: string;
  /**
   * 加载失败时显示的图片的地址
   */
  fallbackSrc?: string;
  /**
   * 尺寸. 默认 medium
   */
  size?: AvatarSize;
  /**
   * 是否圆形
   */
  round?: boolean;
  /**
   * 图片裁剪、缩放的模式. TODO:
   */
  mode?: keyof ImageProps.Mode;
  /**
   * 图片懒加载。只针对 page 与 scroll-view 下的 image 有效
   */
  lazy?: boolean;
  /**
   * 文本、图标颜色
   */
  color?: string;
  /**
   * 占位背景色
   */
  background?: string;
  /**
   * 组件的内联样式, 可以动态设置的内联样式
   */
  style?: CSSProperties;
  /**
   * 图片加载失败执行的回调
   */
  onError?: (ev: BaseEventOrig<ImageProps.onErrorEventDetail>) => void;
  /**
   * 点击回调函数
   * @returns 
   */
  onClick?: () => void;
}


export interface AvatarGroupProps {
  children: ReactElement<AvatarProps> | ReactElement<AvatarProps>[];
  /**
   * 图片之间的层叠关系. 默认 left-up
   * - left-up: 左侧图片在上
   * - right-up: 右侧图片在上
   */
  cascading?: 'left-up' | 'right-up';
  /**
   * 能够同时显示的最多头像数量. 默认 3
   */
  max?: number;
  /**
   * 尺寸, 可取值：small/medium/large, 优先级低于 Avatar.size
   */
  size?: AvatarSize;
  /**
   * 头像数量超出时，会出现一个头像折叠元素。
   * 
   * 该元素内容可自定义。默认为 +N。示例：+5，..., 更多
   */
  collapseAvatar?: string | ReactElement;
  /**
   * 折叠元素文本、图标颜色
   */
  collapseColor?: string;
  /**
   * 折叠元素占位背景色
   */
  collapseBackground?: string;
  /**
   * 折叠元素点击回调函数
   * @returns 
   */
  onCollapseClick?: () => void;
}
