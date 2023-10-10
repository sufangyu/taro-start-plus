import { dateUtil } from '@/core/utils';

import {
  Day, InputDate, MonthInfo, SelectedType, 
} from './types';

/**
 * 日期工具类
 */
export const calendarUtil = {
  /**
   * 是否是选择的开始日期
   *
   * @param {string} day
   * @param {string[]} days
   * @return {*} 
   */
  isStart(day: string, days: string[]): boolean {
    return dateUtil.isEqual(days[0], day);
  },
  /**
   * 是否是选择的结束日期
   * @param day 
   * @param days 
   * @returns 
   */
  isEnd(day: string, days: string[]): boolean {
    return dateUtil.isEqual(days[1], day);
  },
  /**
   * 是否是多选
   *
   * @param {string} day
   * @param {string[]} days
   * @return {*} 
   */
  isMultiple(day: string, days: string[]): boolean {
    if (days.length > 0) {
      return days.some((item: string) => {
        return dateUtil.isEqual(item, day);
      });
    }
    return false;
  },
  /**
   * 是否是今天
   * @param month 
   * @param day 
   * @returns 
   */
  isCurrDay(month: MonthInfo, day: string | number): boolean {
    const date = `${month.curData[0]}/${month.curData[1]}/${day}`;
    return dateUtil.isEqual(date, dateUtil.date2Str(new Date(), '/'));
  },
  /**
   * 开始结束时间是否相等
   *
   * @param {string[]} days
   * @return {*} 
   */
  isStartAndEnd(days: string[]): boolean {
    return days.length >= 2 && dateUtil.isEqual(days[0], days[1]);
  },
  /**
   * 分割时间
   * 
   * @param date 
   * @returns 
   */
  splitDate(date: string): string[] {
    const split = date.indexOf('-') !== -1 ? '-' : '/';
    return date.split(split);
  },
  /**
   * 判断时间范围内存在多少个月
   * 
   * @param startDates 开始日期. 如: ["2023", "09", "21"]
   * @param endDates 结束日期. 如: ["2024", "09", "20"]
   * @returns 
   */
  getMonthNum(startDates: string[], endDates: string[]): number {
    let monthNum = Number(endDates[1]) - Number(startDates[1]);
    const yearNum = Number(endDates[0]) - Number(startDates[0]);

    if (yearNum > 0) {
      monthNum += 12 * yearNum;
    }

    // 不够1个月补1个月
    return Math.max(monthNum, 1);
  },
  /**
   * 获取当前日期
   *
   * @param {Day} day
   * @param {MonthInfo} month
   * @return {*} 
   */
  getCurrDate(day: Day, month: MonthInfo): string {
    return `${month.curData[0]}/${month.curData[1]}/${dateUtil.getNumTwoBit(
      +day.day,
    )}`;
  },
  /**
   * 获取天的 className
   *
   * @param {{
   *     day: Day;
   *     month: MonthInfo;
   *     prefix: string;
   *     startDate: string;
   *     endDate: string;
   *   }} params
   * @return {*}  {string}
   */
  getDayClasses(params:{
    /** 当前日期 */
    day: Day;
    /** 月份信息 */
    month: MonthInfo;
    /** className 前缀 */
    prefix: string;
    /** 日历开始日期 */
    startDate: string;
    /** 日历结束日期 */
    endDate: string;
    /** 日历类型 */
    type: SelectedType;
    /** 当前日期 */
    currentDate: InputDate;
    /** 设置日期禁用函数 */
    disableDate: (date: Day) => boolean;
  }): string | null {
    const {
      day, month, prefix, startDate, endDate, type, currentDate, disableDate,
    } = params;
    const dateStr = calendarUtil.getCurrDate(day, month);

    if (day.type === 'active') {
      if (
        (startDate && dateUtil.compareDate(dateStr, startDate))
        || (endDate && dateUtil.compareDate(endDate, dateStr))
      ) {
        // 不在开始、结束日期范围内, 设置不可选择
        return `${prefix}--disabled`;
      }

      if (type === 'range' || type === 'week') {
        if (
          calendarUtil.isStart(dateStr, currentDate as string[])
          || calendarUtil.isEnd(dateStr, currentDate as string[])
        ) {
          return `
            ${prefix}--active 
            ${calendarUtil.isStart(dateStr, currentDate as string[]) ? 'active-start' : ''}
            ${calendarUtil.isEnd(dateStr, currentDate as string[]) ? 'active-end' : ''}
          `;
        }
        if (
          Array.isArray(currentDate)
          && Object.values(currentDate).length === 2
          && dateUtil.compareDate(currentDate[0], dateStr)
          && dateUtil.compareDate(dateStr, currentDate[1])
        ) {
          if (disableDate(day)) {
            return `${prefix}--middle-disabled`;
          }
          return `${prefix}--middle`;
        }
      } else if (
        (type === 'multiple' && calendarUtil.isMultiple(dateStr, currentDate as string[]))
        || (!Array.isArray(currentDate)
          && dateUtil.isEqual(currentDate as string, dateStr))
      ) {
        return `${prefix}--active`;
      }

      // 设置不可选择的日期
      if (disableDate(day)) {
        return `${prefix}--disabled`;
      }

      return null;
    }

    return `${prefix}--disabled`;
  },
  /**
   * 获取每日的背景自定义的颜色
   * @param params 
   * @returns 
   */
  getDayBgColor(params:{
    /** 当前日期 */
    day: Day;
    /** 月份信息 */
    month: MonthInfo;
    /** 当前日期 */
    currentDate: InputDate;
    /** 日历类型 */
    type: SelectedType;
    /** 设置日期禁用函数 */
    disableDate: (date: Day) => boolean;
    /** 自定义主题颜色 */
    color?: string;
  }): string | undefined {
    const {
      day, month, currentDate, type, disableDate, color,
    } = params;

    if (!color || day.type !== 'active' || currentDate.length === 0) {
      return undefined;
    }

    const dateStr = calendarUtil.getCurrDate(day, month);
    let dayBgColor: string | undefined;

    switch (type) {
      case 'single':
        if (dateUtil.isEqual(currentDate as string, dateStr)) {
          dayBgColor = color;
        }
        break;
      case 'range':
      case 'week':
        if (
          calendarUtil.isStart(dateStr, currentDate as string[]) 
          || calendarUtil.isEnd(dateStr, currentDate as string[])
        ) {
          dayBgColor = color;
        }
      
        if (
          Array.isArray(currentDate)
          && Object.values(currentDate).length === 2
          && dateUtil.compareDate(currentDate[0], dateStr)
          && dateUtil.compareDate(dateStr, currentDate[1])
        ) {
          if (disableDate(day)) {
            // FIXME: 行内样式不生效
            dayBgColor = `rgba($color: ${color}, $alpha: 0.05)`;
          }
        }

        break;
      case 'multiple':
        if (typeof currentDate === 'string' && dateUtil.isEqual(dateStr, currentDate)) {
          dayBgColor = color;
        } else if (calendarUtil.isMultiple(dateStr, currentDate as string[])) {
          dayBgColor = color;
        }
        break;
      default:
    }
    
    return dayBgColor;
  },
  /**
   * 是否是中间
   *
   * @param {Day} day 日数据
   * @param {MonthInfo} month 月数据
   * @param {InputDate} currentDate 当前选择日期
   * @param {SelectedType} type 日历类型
   * @return {*} 
   */
  isMiddle(day: Day, month: MonthInfo, currentDate: InputDate, type: SelectedType): boolean {
    const dateStr = calendarUtil.getCurrDate(day, month);
    if (
      (type === 'range' || type === 'week')
      && Array.isArray(currentDate)
      && Object.values(currentDate).length === 2
      && dateUtil.compareDate(currentDate[0], dateStr)
      && dateUtil.compareDate(dateStr, currentDate[1])
    ) {
      return true;
    }

    return false;
  },
  /**
   * 格式化日期的返回结果
   * @param date 
   * @returns ["年", "月", "日", "日期", "星期几"]
   */
  formatResultDate(date: string) {
    const days = [...date.split('-')];
    days[2] = dateUtil.getNumTwoBit(Number(days[2]));
    days[3] = `${days[0]}/${days[1]}/${days[2]}`;
    days[4] = dateUtil.getWhatWeekDay(+days[0], +days[1], +days[2]);
    return days;
  },
};
