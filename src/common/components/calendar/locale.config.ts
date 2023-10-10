export const calendarLocale = {
  weekdays: ['日', '一', '二', '三', '四', '五', '六'],
  end: '结束',
  start: '开始',
  confirm: '确认',
  title: '日期选择',
  monthTitle: (year: number, month: number) => `${year}年${Number(month) < 10 ? `0${Number(month)}` : month}月`,
  today: '今天',
  loadPreviousMonth: '加载上一个月',
  noEarlierMonth: '没有更早月份',
};
