import { CountUpOptions } from 'countup.js';

/** 组件示例 */
export type CountUpRef = {
  /**
   * 更新到最新值
   * @param value 数值 
   * @returns 
   */
  update: (value: number) => void;
  /**
   * 
   * @param callback 
   */
  start: (callback?: (args?: any) => any) => void;
  /**
   * 暂停恢复
   * @returns 
   */
  pauseResume: () => void;
  /**
   * 重置初始化的值
   * @returns 
   */
  reset: () => void;
}


/**
 *
 *
 * @export
 * @interface CountUpProps
 * @extends {CountUpOptions}
 * 
 * - decimalPlaces?: number; // 小数位数. 默认 0
 * - duration?: number; // 动画持续时间. 默认 2秒
 * - useGrouping?: boolean; // 使用千分位展示（1,000 => 1000）. 默认 true
 * - useIndianSeparators?: boolean; // example: 1,00,000 vs 100,000 (false)
 * - useEasing?: boolean; // ease animation (true)
 * - smartEasingThreshold?: number; // smooth easing for large numbers above this if useEasing (999)
 * - smartEasingAmount?: number; // amount to be eased for numbers above threshold (333)
 * - separator?: string; // 千分位间隔符号. 默认 ','
 * - decimal?: string; // 小数点符号. 默认 '.'
 * - easingFn?: (t: number, b: number, c: number, d: number) => number;
 * - formattingFn?: (n: number) => string; // 格式化结果展示函数
 * - prefix?: string; // 前置文本
 * - suffix?: string; // 后置文本
 * - numerals?: string[]; // 数字标志符号替换
 * - enableScrollSpy?: boolean; // 当目标在视图中时开始动画
 * - scrollSpyDelay?: number; // delay (ms) after target comes into view
 * - scrollSpyOnce?: boolean; // 是否只运行一次
 * - onCompleteCallback?: () => any; // 动画完成时回调函数
 * - onStartCallback?: () => any; // 动画开始回调函数
 */
export interface CountUpProps extends CountUpOptions {
  /**
   * 开始值
   */
  start?: number;
  /**
   * 结束值
   */
  end: number;
  /**
   * 在挂在时候自动执行. 默认 true
   */
  startOnMount?: boolean;
}
