import { ReactNode } from 'react';

export interface SpaceProps {
  children: ReactNode;
  /**
   * 是否渲染为块级元素. 默认 false
   */
  block?: boolean;
  /**
   * 是否自动换行，仅在 horizontal 时有效. 默认 false
   */
  wrap?: boolean;
  /**
   * 间距方向
   * - horizontal: 水平
   * - vertical: 垂直
   */
  direction?: 'horizontal' | 'vertical'; 
  /**
   * 主轴对齐方式
   * - start: 左对齐
   * - end: 右对齐
   * - center: 居中
   * - between: 两端对齐, item 之间间隔相等
   * - around: 每个项目两侧间距相等
   * - evenly: 
   * - stretch: 
   */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /**
   * 交叉轴对齐方式
   * - start: 交叉轴的起点对齐
   * - end: 交叉轴的终点对齐
   * - center: 交叉轴的中点对齐
   * - baseline: 项目的第一行文字的基线对齐
   */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /**
   * 间距大小(水平、垂直). 默认 8
   */
  gap?: number;
  /**
   * 水平方向的间距大小. 默认 8
   */
  gapHorizontal?: number;
  /**
   * 垂直方向的间距大小. 默认 8
   */
  gapVertical?: number;
}
