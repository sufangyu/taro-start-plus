import React, { ReactNode, useRef } from 'react';

import { Popup } from '../popup';

import CalendarAchieve from './calendar-achieve';
import { CalendarProps, CalendarRef } from './types';

import './index.scss';

const Index = React.forwardRef<
  CalendarRef,
  CalendarProps & Omit<React.HTMLAttributes<HTMLDivElement>, ''>
>((props, ref) => {
  const {
    className,
    color,
    visible = false,
    poppable = true,
    type,
    firstDayOfWeek,
    title,
    showTitle,
    showSubtitle,
    showPrevMonthDay,
    scrollAnimation,
    headerButtons,
    defaultValue,
    startDate,
    endDate,
    showToday,
    startText,
    endText,
    showConfirm,
    confirmText,
    disableDate,
    renderDay,
    renderDayTop,
    renderDayBottom,
    onDayClick,
    onConfirm,
    onClosed,

    // type = range
    maxRange,
    showRangePrompt,
    rangePrompt,
  } = props;


  const calendarRef = useRef<CalendarRef>(null);


  const choose = (param: string[]) => {
    typeof onClosed === 'function' && onClosed();
    typeof onConfirm === 'function' && onConfirm(param);
  };

  /**
   * 处理默认值问题
   */
  const setDefaultShowMonth = () => {
    if (calendarRef.current?.setDefaultShowMonth) {
      calendarRef.current.setDefaultShowMonth(defaultValue, true);
    }
  };


  // 对外暴露的方法
  React.useImperativeHandle(ref, () => ({
    /**
     * 滚动带指定日期
     *
     * @param {string} date 日期. 如: '2023-04-01'
     */
    scrollToDate(date: string) {
      calendarRef.current?.scrollToDate(date);
    },
  }));

  const renderCalendar = (): ReactNode => {
    return (
      <CalendarAchieve
        ref={calendarRef}
        className={className}
        type={type}
        poppable={poppable}
        title={title}
        color={color}
        showTitle={showTitle}
        showSubtitle={showSubtitle}
        showPrevMonthDay={showPrevMonthDay}
        scrollAnimation={scrollAnimation}
        firstDayOfWeek={firstDayOfWeek}
        headerButtons={headerButtons}
        defaultValue={defaultValue}
        startDate={startDate}
        endDate={endDate}
        showToday={showToday}
        startText={startText}
        endText={endText}
        confirmText={confirmText}
        showConfirm={showConfirm}
        disableDate={disableDate}
        renderDay={renderDay}
        renderDayTop={renderDayTop}
        renderDayBottom={renderDayBottom}
        onDayClick={onDayClick}
        onConfirm={choose}
        // type = range
        maxRange={maxRange}
        showRangePrompt={showRangePrompt}
        rangePrompt={rangePrompt}
      />
    );
  };
  
  return (
    poppable
      ? (
        <Popup
          visible={visible}
          position="bottom"
          closeable
          round
          simple
          onClosed={() => {
            // 关闭时 处理默认值问题
            setDefaultShowMonth();
            typeof onClosed === 'function' && onClosed();
          }}
          style={{ height: '85vh' }}
        >
          {renderCalendar()}
        </Popup>
      )
      : (renderCalendar())
  );
});

export default Index;
