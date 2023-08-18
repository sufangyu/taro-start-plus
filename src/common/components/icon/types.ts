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
}
