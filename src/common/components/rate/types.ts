import { ReactNode } from 'react';

export interface RateProps {
  /**
   * 评分图标的颜色
   * - 数组则表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的颜色，[选中颜色，未选中颜色]。示例：['#ED7B2F', '#E3E6EB']。
   */
  color?: string[];
  /**
   * 是否允许半选. 默认 false
   */
  allowHalf?: boolean;
  /**
   * 是否允许清除. 默认 true
   */
  allowClear?: boolean;
  /**
   * 评分的数量. 默认 5
   */
  count?: number;
  /**
   * 是否禁用评分. 默认 false
   */
  disabled?: boolean;
  /**
   * 评分图标的大小. 样式中默认为 24
   */
  size?: number;
  /**
   * 是否显示对应的辅助文字. 默认 false
   */
  showText?: boolean;
  /**
   * 评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。
   * 自定义值示例：['1分', '2分', '3分', '4分', '5分']。
   */
  texts?: string[];
  /**
   * 选择评分的值. 默认 0
   */
  defaultValue?: number;
  /**
   * 自定义字符
   */
  character?: ReactNode;
  /**
   * 激活的自定义字符
   */
  characterActive?: ReactNode;
  /**
   * 评分回调函数
   * @param value 评分数
   * @returns 
   */
  onChange?: (value: number) => void;
}
