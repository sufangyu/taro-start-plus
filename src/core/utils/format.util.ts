export const formatUtil = {
  date(
    date: Date | string | number = new Date(),
    fmt: string = 'yyyy-MM-dd HH:mm:ss',
  ): string {
    const targetDate = new Date(date);

    const meta = {
      'M+': targetDate.getMonth() + 1, // 月份
      'd+': targetDate.getDate(), // 日
      'h+': targetDate.getHours() % 12 === 0 ? 12 : targetDate.getHours() % 12, // 小时
      'H+': targetDate.getHours(), // 小时
      'm+': targetDate.getMinutes(), // 分
      's+': targetDate.getSeconds(), // 秒
      'q+': Math.floor((targetDate.getMonth() + 3) / 3), // 季度
      S: targetDate.getMilliseconds(), // 毫秒
    };

    let result: string = fmt;

    if (/(y+)/.test(result)) {
      // eslint-disable-next-line no-param-reassign
      result = fmt.replace(RegExp.$1, (`${targetDate.getFullYear()}`).substr(4 - RegExp.$1.length));
    }

    // console.log('result=>>', result);
    Object.keys(meta).forEach((k) => {
      if (new RegExp(`(${k})`).test(result)) {
        result = result.replace(RegExp.$1, (RegExp.$1.length === 1) ? (meta[k]) : ((`00${meta[k]}`).substr((`${meta[k]}`).length)));
      }
    });


    return result;
  },

  fromNow(
    date: Date | string | number = new Date(),
    fmt: string = 'yyyy-MM-dd HH:mm:ss',
  ): string {
    const target = new Date(date).getTime();
    const now = Date.now();
    const diff = (now - target) / 1000;
    const diffDay = Math.floor(diff / 86400);

    if (diff < 0) {
      console.warn(`[FORMAT UTIL] ${date} must less than the current date`);
      return this.date(date, fmt);
    }

    if (diff < 60) {
      return '刚刚';
    }

    if (diff < 3600) {
      return `${Math.ceil(diff / 60)}分钟前`;
    }
    if (diff < 3600 * 24) {
      return `${Math.floor(diff / 3600)}小时前`;
    }

    if (diffDay === 1) {
      return '昨天';
    }
    if (diffDay < 30) {
      return `${diffDay}天前`;
    }

    // if (fmt) {
    //   return this.date(target, fmt);
    // }

    return this.date(target, fmt);
  },
};
