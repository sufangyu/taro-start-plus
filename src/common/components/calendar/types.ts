import { ReactNode } from 'react';


export interface CalendarState {
  currDateArray: any;
}

export type InputDate = string | string[];

export type CalendarRef = {
  /**
   * 滚动到指定日期
   * @param date 日期. 如: '2023-04-01'
   * @returns 
   */
  scrollToDate: (date: string) => void;
  setDefaultShowMonth?: (date?: InputDate, isClose?: boolean) => void;
}

/**
 * 日历类型
 * - single: 日期选择
 * - range: 区间选择
 * - multiple: 多选
 * - week: 一周
 */
export type SelectedType = 'single' | 'range' | 'multiple' | 'week';

/** 天 */
export interface Day {
  type: 'prev' | 'active' | 'curr';
  day: string | number;
  month?: string | number;
  year?: string | number;
}

/**
 * 月
 */
export interface MonthInfo {
  /** 月份日期信息 */
  curData: string[] | string;
  /** 标题 */
  title: string;
  /** 月份天数 */
  monthData: Day[];
  cssHeight?: number;
  scrollTop?: number;
}


export interface CalendarProps {
  /**
   * 是否可见. 默认 false
   * 
   * 在 poppable 为 true 时才有用
   */
  visible?: boolean;
  /**
   * 日历类型
   */
  type?: SelectedType;
  /**
   * 是否以弹层的形式展示日历. 默认 true
   */
  poppable?: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 主题色，对底部按钮和选中日期生效
   */
  color?: string;
  /**
   * 是否显示标题
   */
  showTitle?: boolean;
  /**
   * 是否显示子标题
   */
  showSubtitle?: boolean;
  /**
   * 是否显示每月日期中上一月份的赞为日期
   */
  showPrevMonthDay?: boolean;
  /**
   * 是否启动滚动动画. 默认 true
   */
  scrollAnimation?: boolean;
  /**
   * 设置周起始日. 默认 0 表示周日
   */
  firstDayOfWeek?: 0 | 1 | 2 | 3| 4| 5 | 6;
  /**
   * 设置不可选日期
   * @param date 
   * @returns 
   */
  disableDate?: (date: Day) => boolean;
  /**
   * 自定义日历标题下部，可用以添加自定义操作
   */
  headerButtons?: ReactNode;
  /**
   * 默认值. 默认值今天
   * - 日期选择 string 格式
   * - 区间选择 Array 格式
   */
  defaultValue?: InputDate;
  /**
   * 开始日期. 默认值 '今天'
   */
  startDate?: InputDate;
  /**
   * 结束日期. 默认值 '距离今天 365 天'
   */
  endDate?: InputDate;
  /**
   * 是否展示今天标记. 默认 true
   */
  showToday?: boolean;
  /**
   * 范围选择，开始信息文案. 默认 '开始'
   */
  startText?: ReactNode;
  /**
   * 范围选择，结束信息文案. 默认 '结束'
   */
  endText?: ReactNode;
  /**
   * 是否展示确认按钮. 默认 true
   * 
   * false 时会隐藏确认按钮, 在选择完成后会立即触发 confirm 事件
   */
  showConfirm?: boolean;
  /**
   * 底部确认按钮文案. 默认 '确认'
   */
  confirmText?: ReactNode;
  /**
   * 日期信息
   * @param day 
   * @returns 
   */
  renderDay?: (day: Day) => string | JSX.Element;
  /**
   * 日期顶部信息
   * @param day 
   * @returns 
   */
  renderDayTop?: (day: Day) => string | JSX.Element;
  /**
   * 日期底部信息
   * @param day 
   * @returns 
   */
  renderDayBottom?: (day: Day) => string | JSX.Element;
  /**
   * 点击/选择后触发
   * @param data 
   * @returns 
   */
  onDayClick?: (data: string[]) => void;
  /**
   * 选择之后或是点击确认按钮触发
   * @returns 
   */
  onConfirm?: (data: string[]) => void;
  /**
   * 关闭时触发
   * @returns 
   */
  onClosed?: () => void;

  // ------------------ 不同 type 特有属性 ------------------
  /**
   * 日期区间最多可选天数，默认无限制
   */
  maxRange?: number;
  /**
   * 范围选择超过最多可选天数时，是否展示提示文案. 默认 true
   */
  showRangePrompt?: boolean;
  /**
   * 范围选择超过最多可选天数时的提示文案
   * 
   * 默认 '选择天数不能超过 xx 天'
   * @param max 
   * @returns 
   */
  rangePrompt?: (max: number) => string;
}
