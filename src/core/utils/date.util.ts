export const dateUtil = {
  /**
   * 补齐数字位数
   * @return {string}
   */
  getNumTwoBit(n: number): string {
    const num = Number(n);
    return (n > 9 ? '' : '0') + num;
  },
  /**
   * 是否为闫年
   * @return {Boolse} true|false
   */
  isLeapYear(y: number): boolean {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  },
  /**
   * 返回星期数
   * @return {String}
   */
  getWhatWeekDay(year: number, month: number, day: number): string {
    const date = new Date(`${year}/${month}/${day}`);
    const index = date.getDay();
    const dayNames = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ];
    return dayNames[index];
  },
  /**
   * 返回上一个月在当前面板中的天数
   * @return {Number}
   */
  getMonthPreDays(year: number, month: number): number {
    const date = new Date(`${year}/${month}/01`);
    let day = date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day;
  },

  /**
   * 返回月份天数
   * @return {Number}
   */
  getMonthDays(y: string, m: string): number {
    const year = y;
    const month = /^0/.test(m) ? m.split('')[1] : m;
    return (
      [
        0,
        31,
        dateUtil.isLeapYear(Number(year)) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ] as number[]
    )[month as any];
  },
  /**
   * 日期对象转成字符串
   * @param date 日期
   * @param split 拼接字符
   * @returns 
   */
  date2Str(date: Date, split: string = '-'): string {
    const y = date.getFullYear();
    const m = dateUtil.getNumTwoBit(date.getMonth() + 1);
    const d = dateUtil.getNumTwoBit(date.getDate());
    return [y, m, d].join(split);
  },
  /**
   * 获取指定天数后的日期
   *
   * @param {number} [i=0] 0 返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
   * @return {*}  {string}  '2023-12-31'
   */
  getDay(i: number = 0): string {
    const diff = i * (1000 * 60 * 60 * 24);
    let date = new Date();
    date = new Date(date.getTime() + diff);
    return dateUtil.date2Str(date);
  },
  /**
   * 时间比较
   * @return {Boolean}
   */
  compareDate(date1: string, date2: string): boolean {
    const startTime = new Date(date1.replace('-', '/').replace('-', '/'));
    const endTime = new Date(date2.replace('-', '/').replace('-', '/'));
    if (startTime >= endTime) {
      return false;
    }
    return true;
  },
  /**
   * 时间是否相等
   * @return {Boolean}
   */
  isEqual(date1: string, date2: string): boolean {
    const startTime = new Date((date1 || '').replace(/-/g, '/')).getTime();
    const endTime = new Date(date2.replace(/-/g, '/')).getTime();
    if (startTime === endTime) {
      return true;
    }
    return false;
  },
  /**
   * 获取指定日期的一周区间
   *
   * @param {string} year
   * @param {string} month
   * @param {string} date
   * @param {number} [firstDayOfWeek=0]
   * @return {*}  {string[]}
   */
  getWeekDate(
    year: string,
    month: string,
    date: string,
    firstDayOfWeek: number = 0,
  ): string[] {
    const dateNow = new Date(Number(year), parseInt(month, 10) - 1, Number(date));
    const nowTime = dateNow.getTime();
    let day = dateNow.getDay();
    const oneDayTime = 24 * 60 * 60 * 1000;

    if (firstDayOfWeek === 0) {
      // 显示周日（本周的周日）
      const SundayTime = nowTime - day * oneDayTime;
      // 显示周六（本周的周六）
      const SaturdayTime = nowTime + (6 - day) * oneDayTime;

      const sunday = dateUtil.date2Str(new Date(SundayTime));
      const saturday = dateUtil.date2Str(new Date(SaturdayTime));
      return [sunday, saturday];
    }
    day = day === 0 ? 7 : day;
    // 显示周一（本周的周一）
    const MondayTime = nowTime - (day - 1) * oneDayTime;
    // 显示周日（本周的周日）
    const SundayTime = nowTime + (7 - day) * oneDayTime;

    const monday = dateUtil.date2Str(new Date(MondayTime));
    const sunday = dateUtil.date2Str(new Date(SundayTime));
    return [monday, sunday];
  },
  /**
   * 获取上一个月的最后一周天数，填充当月空白
   *
   * @param {string} type
   * @param {number} year
   * @param {number} month
   * @param {number} firstDayOfWeek
   * @return {*} 
   */
  getPreMonthDates(
    type: 'active' | 'prev' | 'next',
    year: number,
    month: number,
    firstDayOfWeek: number,
  ): {
    type: 'active' | 'prev' | 'next';
    day: number;
    prevYear: number;
    prevMonth: number;
  }[] {
    let prevMonth = +month - 1;
    let prevYear = year;
    if (prevMonth <= 0) {
      prevMonth = 12;
      prevYear += 1;
    }
    let days = dateUtil.getMonthPreDays(+year, +month);
    days -= firstDayOfWeek;

    // 修复：当某个月的1号是周日时，月份下方会空出来一行
    if (type === 'prev' && days >= 7) {
      days -= 7;
    }

    const prevMounthDays = dateUtil.getMonthDays(`${prevYear}`, `${prevMonth}`);
    const months = Array.from(Array(prevMounthDays), (_, k) => {
      return {
        type,
        day: k + 1,
        prevYear,
        prevMonth,
      };
    });

    return months.slice(prevMounthDays - days);
  },
  // 获取当前月数据
  getCurrMonthData(type: 'prev' | 'next', yearRaw: number, monthRaw: number) {
    let month = monthRaw;
    let year = yearRaw;
    switch (type) {
      case 'prev':
        month === 1 && (year -= 1);
        month = month === 1 ? 12 : month - 1;
        break;
      case 'next':
        month === 12 && (year += 1);
        month = month === 12 ? 1 : month + 1;
        break;
      default:
        break;
    }
    return [
      `${year}`,
      dateUtil.getNumTwoBit(month),
      `${dateUtil.getMonthDays(String(year), String(month))}`,
    ];
  },
  /**
   * 获取日期状态
   *
   * @param {('active' | 'prev' | 'next')} type
   * @param {number} year
   * @param {number} month
   * @return {*} 
   */
  getDaysStatus(type: 'active' | 'prev' | 'next', year: number, month: number):{
    type: 'active' | 'prev' | 'next';
    day: number;
    month: number;
    year: number;
  }[] {
    let days = dateUtil.getMonthDays(`${year}`, `${month}`);

    // 修复：当某个月的1号是周日时，月份下方会空出来一行
    if (type === 'prev' && days >= 7) {
      days -= 7;
    }

    return Array.from(Array(days), (_, k) => {
      return {
        type,
        day: k + 1,
        month,
        year,
      };
    });
  },
  /**
   * 获取两个日期相差天数
   * @param date1 
   * @param date2 
   * @returns 
   */
  getDiffDays(date1: string, date2: string): number {
    const startDate = Date.parse(date1);
    const endDate = Date.parse(date2);

    if (startDate > endDate) {
      return 0;
    }

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = (diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },
  /**
   * 获取指定日期指定天数后的日期
   *
   * @param {string} date 日期
   * @param {number} diffDays 相差天数
   * @return {*}  {string}
   */
  getDiffDaysDate(date: string, diffDays: number):string {
    const diff = diffDays * (1000 * 60 * 60 * 24);
    let nextDate = new Date(date);
    nextDate = new Date(nextDate.getTime() + diff);
    return dateUtil.date2Str(nextDate);
  },
};
