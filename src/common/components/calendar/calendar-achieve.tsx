import { ScrollView, View } from '@tarojs/components';
import Taro, { nextTick } from '@tarojs/taro';

import classNames from 'classnames';
import React, {
  ReactNode, useEffect, useRef, useState, 
} from 'react';

import { usePropsValue } from '@/core/hooks';
import { baseUtil, dateUtil } from '@/core/utils';

// eslint-disable-next-line import/extensions
import { calendarLocale } from './locale.config';
import {
  CalendarProps, CalendarRef, CalendarState, Day, InputDate, MonthInfo, 
} from './types';
import { calendarUtil } from './util';
import './index.scss';

const Index = React.forwardRef<
  CalendarRef,
  CalendarProps & {value?: InputDate} & Omit<React.HTMLAttributes<HTMLDivElement>, ''>
>((props, ref) => {
  const {
    weekdays,
    title: localeTitle, 
    today,
    start: startTextDefault,
    end: endTextDefault,
    confirm: confirmTextDefault,
    monthTitle, 
  } = calendarLocale;

  const {
    className,
    type = 'single',
    poppable,
    title = '',
    color,
    showTitle = true,
    showSubtitle = true,
    showPrevMonthDay = true,
    scrollAnimation = true,
    firstDayOfWeek = 0,
    headerButtons,
    defaultValue = '',
    startDate,
    endDate,
    showToday = true,
    startText = startTextDefault,
    endText = endTextDefault,
    confirmText = confirmTextDefault,
    showConfirm = true,
    disableDate = () => false,
    renderDay,
    renderDayTop,
    renderDayBottom,
    onDayClick,
    onConfirm,

    // type = range
    maxRange,
    showRangePrompt = true,
    rangePrompt = (max: number) => `选择天数不能超过${max}天`,
  } = props;

  const uuid = useRef(baseUtil.uuid());
  const calendarScrollViewId = useRef(`calendar-${uuid.current}`);
  const calendarBodyClass = useRef(`calendar__body-${uuid.current}`);
  const calendarMonthClass = useRef(`calendar__month-${uuid.current}`);
  
  const [yearMonthTitle, setYearMonthTitle] = useState('');
  const [monthsData, setMonthsData] = useState<MonthInfo[]>([]);
  const [scrollWithAnimation, setScrollWithAnimation] = useState<boolean>(false);
  // 滚动到指定 ID 月份
  const [scrollIntoViewId, setScrollIntoViewId] = useState('');
  const contentObserver = useRef<Taro.IntersectionObserver | null>(null);

  // 初始化开始结束数据
  const propStartDate = (startDate || dateUtil.getDay(0)) as string;
  const propEndDate = (endDate || dateUtil.getDay(365)) as string;
  const startDates = calendarUtil.splitDate(propStartDate);
  const endDates = calendarUtil.splitDate(propEndDate);
  const [state] = useState<CalendarState>({
    currDateArray: [],
  });

  const resetDefaultValue = () => {
    if (
      defaultValue
      || (Array.isArray(defaultValue) && defaultValue.length > 0)
    ) {
      return type !== 'single'
        ? ([...(defaultValue as string[])] as string[])
        : (defaultValue as string[]);
    }
    return undefined;
  };

  const [currentDate, setCurrentDate] = usePropsValue<InputDate>({
    value: props.value,
    defaultValue: resetDefaultValue(),
    finalValue: [],
    // onChange: (val) => console.log('onChange val', val),
  });


  /**
   * 获取月数据
   *
   * @param {string[]} curData 日期
   * @param {number} monthNum 月份数量
   * @param {('next' | 'prev')} type 日期类型
   */
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getMonthData = async (curData: string[], monthNum: number, type: 'next' | 'prev') => {
    // console.log(curData, monthNum, type);
    let i = 0;
    let date = curData;
    const monthData = monthsData;

    do {
      const y = parseInt(date[0], 10);
      const m = parseInt(date[1], 10);
      const days = [
        ...(dateUtil.getPreMonthDates('prev', y, m, firstDayOfWeek) as Day[]),
        ...(dateUtil.getDaysStatus('active', y, m) as Day[]),
      ];
      // 当前月份信息
      const monthInfo: MonthInfo = {
        curData: date,
        title: monthTitle(y, m),
        monthData: days,
      };

      if (type === 'next') {
        const lastDay = dateUtil.getMonthDays(endDates[0], endDates[1]);
        const compareDateStart = `${endDates[0]}/${endDates[1]}/${lastDay}`;
        const compareDateEnd = curData.join('/');
        
        if (!endDates || !dateUtil.compareDate(compareDateStart, compareDateEnd)) {
          monthData.push(monthInfo);
        }
      } else if (
        !startDates 
        || !dateUtil.compareDate(
          curData.join('/'),
          `${startDates[0]}/${startDates[1]}/01`,
        )
      ) {
        monthData.unshift(monthInfo);
      }

      date = dateUtil.getCurrMonthData('next', y, m) as string[];

    // eslint-disable-next-line no-plusplus
    } while (i++ < monthNum);
    
    setMonthsData(monthData);
  };

  const setReachedYearMonthInfo = (current: number) => {
    const currentMonthsData = monthsData[current];
    const [year, month] = currentMonthsData.curData;
    if (currentMonthsData.title === yearMonthTitle) {
      return;
    }

    setYearMonthTitle(currentMonthsData.title);
    
    // 滚动到指到日历月份
    const targetDateId = `month-${year}-${month}-${uuid.current}`;
    setScrollIntoViewId(targetDateId);
    nextTick(() => setScrollWithAnimation(scrollAnimation));
  };


  // 设置默认日期
  const getDefaultDate = () => {
    let defaultData: InputDate = [];
    // 日期转化为数组，限制初始日期。判断时间范围
    if (type === 'range' && Array.isArray(currentDate)) {
      // console.log('range currentDate', currentDate);
      if (currentDate.length > 0) {
        // 处理选择的日期区间是否在开始、结束时间内
        if (propStartDate && dateUtil.compareDate(currentDate[0], propStartDate)) {
          currentDate.splice(0, 1, propStartDate);
        }
        if (propEndDate && dateUtil.compareDate(propEndDate, currentDate[1])) {
          currentDate.splice(1, 1, propEndDate);
        }

        defaultData = [
          ...calendarUtil.splitDate(currentDate[0]),
          ...calendarUtil.splitDate(currentDate[1]),
        ];
      }
    } else if (type === 'multiple' && Array.isArray(currentDate)) {
      if (currentDate.length > 0) {
        const defaultArr = [] as string[];
        currentDate.forEach((item: string) => {
          if (
            propStartDate && !dateUtil.compareDate(item, propStartDate)
            && propEndDate && !dateUtil.compareDate(propEndDate, item)
          ) {
            const isExisted = defaultArr.some(it => it === item);
            if (!isExisted) {
              defaultArr.push(item);
            }
          }
        });
        currentDate.splice(0) && currentDate.push(...defaultArr);
        defaultData = [...calendarUtil.splitDate(defaultArr[0])];
      }
    } else if (type === 'week' && Array.isArray(currentDate)) {
      if (currentDate.length > 0) {
        const [y, m, d] = calendarUtil.splitDate(currentDate[0]);
        const weekArr = dateUtil.getWeekDate(y, m, d, firstDayOfWeek);
        // 重新赋值
        currentDate.splice(0) && currentDate.push(...weekArr);
        // 处理边界
        if (propStartDate && dateUtil.compareDate(currentDate[0], propStartDate)) {
          currentDate.splice(0, 1, propStartDate);
        }
        if (propEndDate && !dateUtil.compareDate(currentDate[1], propEndDate)) {
          currentDate.splice(1, 1, propEndDate);
        }
        defaultData = [
          ...calendarUtil.splitDate(currentDate[0]),
          ...calendarUtil.splitDate(currentDate[1]),
        ];
      }
    } else if (currentDate) {
      if (currentDate.length > 0) {
        if (propStartDate && dateUtil.compareDate(currentDate as string, propStartDate)) {
          defaultData = [...calendarUtil.splitDate(propStartDate)];
        } else if (propEndDate && !dateUtil.compareDate(currentDate as string, propEndDate)) {
          defaultData = [...calendarUtil.splitDate(propEndDate)];
        } else {
          defaultData = [...calendarUtil.splitDate(currentDate as string)];
        }
      } else {
        defaultData = [];
      }
    }

    return defaultData;
  };

  // 设置默认可见区域
  const getCurrentIndex = (defaultData: InputDate) => {
    let current = 0;
    let lastCurrent = 0;
    if (defaultData.length > 0) {
      monthsData.forEach((item, index) => {
        if (item.title === monthTitle(+defaultData[0], +defaultData[1])) {
          current = index;
        }
        if (type === 'range' || type === 'week') {
          lastCurrent = index;
        }
      });
    } else {
      // 当 defaultValue 为空时，如果月份列表包含当月，则默认定位到当月
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const index = monthsData.findIndex((item) => {
        return +item.curData[0] === year && +item.curData[1] === month;
      });
      if (index > -1) {
        current = index;
      }
    }

    return {
      current,
      lastCurrent,
    };
  };


  // 暴露出的API
  const scrollToDate = (async (date: string) => {
    let targetDate = date;
    if (dateUtil.compareDate(date, propStartDate)) {
      targetDate = propStartDate;
    } else if (!dateUtil.compareDate(date, propEndDate)) {
      targetDate = propEndDate;
    }
    const dateArr = calendarUtil.splitDate(targetDate);
    const curMonthTitle = monthTitle(+dateArr[0], +dateArr[1]);
    const targetData = monthsData.find(item => item.title === curMonthTitle);
    if (!targetData) {
      return;
    }

    setYearMonthTitle(curMonthTitle);
    const targetDateId = `month-${dateArr[0]}-${dateArr[1]}-${uuid.current}`;
    // console.log('scrollToDate targetDateId =>', targetDateId);
    setScrollIntoViewId(targetDateId);
  });


  // 确认/点击回调函数
  const confirm = () => {
    if (
      type !== 'range' 
      || (type === 'range' && state.currDateArray.length === 2)
    ) {
      // copy 结果用于回调
      const chooseData = state.currDateArray.slice(0);
      typeof onConfirm === 'function' && onConfirm(chooseData);
    }
  };

  // 设置日历显示月份
  const setDefaultShowMonth = (date: InputDate, isPopupClose = false) => {
    // console.log('setDefaultShowMonth =>>', date, defaultValue, isPopupClose);
    // 关闭 popup 弹窗, 重设置默认值
    if (isPopupClose) {
      const curDateValue = typeof defaultValue === 'string' ? defaultValue : [...defaultValue];
      setCurrentDate(curDateValue);
    }

    let toDate: string = '';
    if (!date || date.length === 0) {
      toDate = dateUtil.getDay();
      scrollToDate(toDate);
      return;
    }
    
    switch (type) {
      case 'single':
        toDate = typeof date === 'string' ? date as string : date[3];
        break;
      case 'range':
        [toDate] = date;
        toDate = typeof toDate === 'string' ? toDate : toDate[3];
        break;
      case 'multiple':
        [toDate] = date;
        toDate = typeof toDate === 'string' ? toDate : toDate[3];
        break;
      case 'week':
        [toDate] = date;
        toDate = typeof toDate === 'string' ? toDate : toDate[3];
        break;
      default:
    }
    scrollToDate(toDate);
  };

  const handleConfirm = () => {
    confirm();

    if (poppable) {
      setDefaultShowMonth(state.currDateArray);
    }
  };


  React.useImperativeHandle(ref, () => ({
    scrollToDate,
    setDefaultShowMonth,
  }));


  /**
   * 选择日期
   *
   * @param {Day} day
   * @param {MonthInfo} month
   * @param {boolean} [isFirst]
   */
  const handleChooseDay = (day: Day, month: MonthInfo, isFirst?: boolean) => {
    const curDayClass = calendarUtil.getDayClasses({
      day,
      month,
      prefix: 'calendar__day',
      startDate: propStartDate,
      endDate: propEndDate,
      type,
      currentDate,
      disableDate,
    });

    if (['calendar__day--disabled', 'calendar__day--middle-disabled'].includes(curDayClass ?? '')) {
      return;
    }

    const [y, m] = month.curData;
    const days = [...month.curData];
    days[2] = typeof day.day === 'number' ? dateUtil.getNumTwoBit(day.day) : day.day;
    days[3] = `${days[0]}/${days[1]}/${days[2]}`;
    days[4] = dateUtil.getWhatWeekDay(+days[0], +days[1], +days[2]);
    // datys => ["2023", "09", "22", "2023/09/22", "星期五"]
    // console.log(type, days, currentDate);

    switch (type) {
      case 'single':
        setCurrentDate(days[3]);
        state.currDateArray = [...days];
        break;
      case 'range':
        // eslint-disable-next-line no-case-declarations
        const curDataLength = Object.values(currentDate).length;
        if (curDataLength === 2 || curDataLength === 0) {
          Array.isArray(currentDate) && currentDate.splice(0) && currentDate.push(days[3]);
          state.currDateArray = [[...days]];
        } else if (dateUtil.compareDate(currentDate[0], days[3])) {
        // 第二次选择在第一次选择日期后面
          Array.isArray(currentDate) && currentDate.push(days[3]);
          state.currDateArray = [...state.currDateArray, [...days]];
        } else {
        // 第二次选择在第一次选择日期之前
          Array.isArray(currentDate) && currentDate.unshift(days[3]);
          state.currDateArray = [[...days], ...state.currDateArray];
        }

        // 处理日期区间最多可选天数
        if (maxRange !== undefined && state.currDateArray.length === 2) {
          const [start, end] = state.currDateArray;
          const diffDays = dateUtil.getDiffDays(start[3], end[3]);

          // 最多可以选择的天数
          if (diffDays > maxRange - 1) {
            const newEndDate = dateUtil.getDiffDaysDate(start[3], maxRange - 1);
            const newEnd = calendarUtil.formatResultDate(newEndDate);
            state.currDateArray = [[...start], [...newEnd]];
            // 处理开始结束显示
            if (poppable) {
              const newCurrentDate = [start[3], newEnd[3]];
              setCurrentDate(newCurrentDate);
            }

            showRangePrompt && Taro.showToast({
              icon: 'none',
              title: rangePrompt(maxRange),
              duration: 2000,
            });
          }
        }
        break;
      case 'multiple':
        if (currentDate.length > 0) {
          const hasIndex = (currentDate as string[]).findIndex(it => it === days[3]);
          if (isFirst) {
            state.currDateArray.push([...days]);
          } else if (hasIndex > -1) {
            // 已存在 => 删除
            (currentDate as string[]).splice(hasIndex, 1);
            state.currDateArray.splice(hasIndex, 1);
          } else {
            // 未存在 => 添加
            (currentDate as string[]).push(days[3]);
            state.currDateArray.push([...days]);
          }
        } else {
          (currentDate as string[]).push(days[3]);
          state.currDateArray = [[...days]];
        }
        break;
      case 'week':
        // eslint-disable-next-line no-case-declarations
        const weekArr = dateUtil.getWeekDate(y, m, `${day.day}`, firstDayOfWeek);
        if (propStartDate && dateUtil.compareDate(weekArr[0], propStartDate)) {
          weekArr.splice(0, 1, propStartDate);
        }
        if (propEndDate && dateUtil.compareDate(propEndDate, weekArr[1])) {
          weekArr.splice(1, 1, propEndDate);
        }

        // currentDate.splice(0) =>> 把原数组清空
        Array.isArray(currentDate) && currentDate.splice(0) && currentDate.push(...weekArr);
        state.currDateArray = [
          calendarUtil.formatResultDate(weekArr[0]),
          calendarUtil.formatResultDate(weekArr[1]),
        ];
        break;
      default:
    }

    if (!isFirst) {
      typeof onDayClick === 'function' && onDayClick(state.currDateArray);

      if (!poppable || !showConfirm) {
        confirm();
      }
    }

    setMonthsData(monthsData.slice());
  };

  const renderCurrentDate = () => {
    const defaultData: InputDate = getDefaultDate();
    const current = getCurrentIndex(defaultData);
    // console.log('renderCurrentDate defaultData =>>', defaultData, current);

    if (defaultData.length > 0) {
      // 设置当前选中日期
      switch (type) {
        case 'range':
          handleChooseDay(
            { day: defaultData[2], type: 'active' },
            monthsData[current.current],
            true,
          );
          handleChooseDay(
            { day: defaultData[5], type: 'active' },
            monthsData[current.lastCurrent],
            true,
          );
          break;
        case 'week':
          handleChooseDay(
            { day: defaultData[2], type: 'curr' },
            monthsData[current.current],
            true,
          );
          break;
        case 'multiple':
          [...currentDate].forEach((item: string) => {
            const dateArr = calendarUtil.splitDate(item);
            const currentIndex = monthsData.findIndex(it => {
              return it.title === monthTitle(+dateArr[0], +dateArr[1]);
            });
            handleChooseDay(
              { day: dateArr[2], type: 'active' },
              monthsData[currentIndex],
              true,
            );
          });
          break;
        case 'single':
          handleChooseDay(
            { day: defaultData[2], type: 'active' },
            monthsData[current.current],
            true,
          );
          break;
        default:
      }
    }

    return current.current;
  };


  // 监听月份是否出现在容器内 => 设置 subtitle
  const initRect = () => {
    contentObserver.current = Taro.createIntersectionObserver(
      Taro.getCurrentInstance().page!,
      {
        thresholds: [0, 0.1, 0.9, 1],
        observeAll: true,
      });
    
    contentObserver.current!.relativeTo(`.${calendarBodyClass.current}`);
    contentObserver.current!.observe(`.${calendarMonthClass.current}`, (res) => {
      if (res.boundingClientRect.top <= res.relativeRect.top) {
        // console.log(res, res.id, `#${calendarScrollViewId.current}`);
        const [, year, month] = (res as any).id.split('-');
        setYearMonthTitle(monthTitle(year, month));
      }
    });
  };
  

  /**
   * 初始化数据
   */
  const initData = () => {
    // 时间范围内存在多少个月
    const monthNum = calendarUtil.getMonthNum(startDates, endDates);
    // 设置月份数据，获取包含月份的所有数据，只需要 set 一次即可。
    getMonthData(startDates, monthNum, 'next');

    const current = renderCurrentDate();
    setReachedYearMonthInfo(current);
  };

  useEffect(() => {
    initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    nextTick(() => initRect());

    return () => {
      contentObserver.current?.disconnect();
      contentObserver.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    const curDate = resetDefaultValue() || [];
    setCurrentDate(curDate);

    // poppable && resetRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);


  const renderHeader = (): ReactNode => {
    const headerClasses = classNames({
      calendar__header: true,
    });

    const weeks = [
      ...weekdays.slice(firstDayOfWeek, 7),
      ...weekdays.slice(0, firstDayOfWeek),
    ];
  
    return (
      <View className={headerClasses}>
        {showTitle && <View className="calendar__header-title">{title || localeTitle}</View>}
        {headerButtons && <View className="calendar__header-buttons">{headerButtons}</View>}
        {showSubtitle && <View className="calendar__header-subtitle">{yearMonthTitle}</View>}
        <View className="calendar__weekdays">
          {
            weeks.map((week, idx) => <View className="calendar__weekday" key={idx}>{week}</View>)
          }
        </View>
      </View>
    );
  };

  const renderFooter = (): ReactNode => {
    return (
      <View className="calendar__footer">
        <View
          className="calendar-btn--confirm"
          onClick={() => handleConfirm()}
          style={{
            backgroundColor: color,
          }}
        >
          {confirmText}
        </View>
      </View>
    );
  };

  const renderContent = (): ReactNode => {
    // 是否有开始提示
    const isStartTip = (day: Day, month: MonthInfo) => {
      return (
        (type === 'range' || type === 'week')
        && day.type === 'active'
        && calendarUtil.isStart(calendarUtil.getCurrDate(day, month), currentDate as string[])
      );
    };

    // 是否有结束提示
    const isEndTip = (day: Day, month: MonthInfo) => {
      return (
        currentDate.length >= 2
        && (type === 'range' || type === 'week')
        && day.type === 'active'
        && calendarUtil.isEnd(calendarUtil.getCurrDate(day, month), currentDate as string[])
      );
    };
  
    return (
      <ScrollView
        id={calendarScrollViewId.current}
        className={`calendar__body ${calendarBodyClass.current}`}
        scrollY
        scrollWithAnimation={scrollWithAnimation}
        scrollIntoView={scrollIntoViewId}
        onScroll={() => {
          scrollIntoViewId && setScrollIntoViewId('');
        }}
        // style={{
        //   height: '100%',
        // }}
      >
        {
          monthsData.map((month, key) => {
            return (
              <View
                className={`calendar__month ${calendarMonthClass.current}`} 
                id={`month-${month.curData[0]}-${month.curData[1]}-${uuid.current}`}
                key={key}
              >
                <View className="calendar__month-title">{month.title}</View>
                <View className="calendar__month-days">
                  <View className="calendar__month-mark">{month.curData[1].replace(/\b(0+)/gi, '')}</View>
                  {
                      month.monthData.map((day, idx) => (
                        <View
                          className={[
                            'calendar__day',
                            calendarUtil.getDayClasses({
                              day,
                              month,
                              prefix: 'calendar__day',
                              startDate: propStartDate,
                              endDate: propEndDate,
                              type,
                              currentDate,
                              disableDate,
                            }),
                          ].join(' ')}
                          key={idx}
                          onClick={() => handleChooseDay(day, month)}
                          style={{
                            backgroundColor: calendarUtil.getDayBgColor({
                              day,
                              month,
                              currentDate,
                              type,
                              disableDate,
                              color,
                            }),
                            color: calendarUtil.isMiddle(
                              day,
                              month,
                              currentDate,
                              type,
                            ) ? color : undefined,
                          }}
                        >
                          <View className="calendar__day-text" data-desc="当前日期">
                            {
                              // 1. 非上一个月日期的直接显示.
                              // 2. 上一个月日期, 根据 showPrevMonthDay 设置是否显示
                              (day.type !== 'prev' || (day.type === 'prev' && showPrevMonthDay))
                              && (renderDay ? renderDay(day) : day.day)
                            }
                          </View>
                          {
                            // 头部提示信息
                            !isStartTip(day, month) && renderDayTop && (
                              <View className="calendar__day-info-top">
                                {renderDayTop(day)}
                              </View>
                            )
                          }
                          {
                            // 底部提示信息
                            !isStartTip(day, month) && !isEndTip(day, month)
                            && renderDayBottom && (
                              <View className="calendar__day-info-bottom">
                                {renderDayBottom(day)}
                              </View>
                            )
                          }
                          {
                            // 今天
                            !isStartTip(day, month) && !isEndTip(day, month) && !renderDayBottom
                            && day.type !== 'prev'
                            && showToday
                            && calendarUtil.isCurrDay(month, day.day) && (
                              <View className="calendar__day-info-curr">
                                {today}
                              </View>
                            )
                          }
                          {
                            // 期间-开始
                            isStartTip(day, month) && (
                              <View
                                className={`calendar__day-info ${
                                  calendarUtil.isStartAndEnd(currentDate as string[])
                                    ? 'calendar__day-info-top'
                                    : ''
                                }`}
                              >
                                {startText}
                              </View>
                            )
                          }
                          {
                            // 期间-结束
                            isEndTip(day, month) && (
                              <View className="calendar__day-info">{endText}</View>
                            )
                          }
                        </View>
                      ))
                    }
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    );
  };


  const rootClasses = classNames({
    calendar: true,
    [`${className}`]: className,
  });
  
  return (
    <View className={rootClasses}>
      {renderHeader()}
      {renderContent()}
      {(poppable && showConfirm) && renderFooter()}
    </View>
  );
});

export default Index;
