import { ITouchEvent } from '@tarojs/components';

const themes = {
  outline: '线框',
  filled: '填充',
  'two-tone': '双色', 
  'multi-color': '多色',
};

export interface IconProps {
  /**
   * 主题
   * - outline: 线框
   * - filled: 填充
   * - two-tone: 双色 
   * - multi-color: 多色'
   */
  theme?: keyof typeof themes;
  /**
   * 填充颜色
   */
  fill?: string | string[];
  /**
   * 图表大小
   */
  size?: number;
  /**
   * 自定义 class
   */
  className?: string;
  /**
   * 点击事件回调
   * @returns 
   */
   onClick?: (ev: ITouchEvent) => void;
}
