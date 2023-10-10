import { View } from '@tarojs/components';

import { useRef, useState } from 'react';

import {
  Calendar, CalendarRef, Cell, Day, DemoBlock, Space, 
} from '@/common/components';
import { dateUtil } from '@/core/utils';

import './index.scss';

const padZero = (d: number | string) => {
  return Number(d) <= 9 ? `0${d}` : d;
};

const customColor = ''; // #2151d1

export default function Index() {
  const d = new Date();
  const currDay = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  const [dateSingle, setDateSingle] = useState(currDay);
  const [dateMulti, setDateMulti] = useState(['2023/09/27', '2023/09/28']); // 
  const [dateRange, setDateRange] = useState(['2023-01-13', '2023-01-23']); // 
  const [dateWeek, setDateWeek] = useState<string[]>(['2023-09-18', '2023-09-24']);
  const [dateDayDisabled, setDateDayDisabled] = useState<string[]>([]);
  const [dateRangeCustom, setDateRangeCustom] = useState(['2023-06-10', '2023-06-16']);
  const [dateRangeButtons, setDateRangeButtons] = useState(['2023-07-10', '2023-07-19']);
  const [visible, setVisible] = useState({
    simple: false,
    multi: false,
    range: false,
    rangeMax: false,
    week: false,
    dayDisabled: false,

    simpleQuick: false,
    rangeQuick: false,

    colorCustom: false,
    rangeCustom: false,
    dayCustom: false,
    buttonCustom: false,
  });

  const calendarRef = useRef<CalendarRef>(null);

  const handleDaySelect = (data: string[]) => {
    console.log('handleDaySelect =>>', data);
  };

  const toggleVisible = (key: string, value: boolean) => {
    setVisible((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  
  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基本用法" simple card>
        <Cell
          title="选择单个日期"
          arrow
          center
          description={dateSingle ? `${dateSingle}` : '请选择'}
          onClick={() => toggleVisible('simple', true)}
        />
        <Calendar
          visible={visible.simple}
          color={customColor}
          defaultValue={dateSingle}
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            setDateSingle(value[3]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('simple', false)}
        />

        <Cell
          title="选择多个日期"
          arrow
          center
          description={dateMulti.length ? `${dateMulti}` : '请选择'}
          onClick={() => toggleVisible('multi', true)}
        />
        <Calendar
          visible={visible.multi}
          color={customColor}
          type="multiple"
          defaultValue={dateMulti}
          startDate="2023-01-01"
          endDate="2024-09-10"
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const dateArr = value.map((item: any) => item[3]);
            setDateMulti([...dateArr]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('multi', false)}
        />

        <Cell
          title="选择日期区间"
          arrow
          center
          description={dateRange.length ? `${dateRange}` : '请选择'}
          onClick={() => toggleVisible('range', true)}
        />
        <Calendar
          visible={visible.range}
          color={customColor}
          type="range"
          defaultValue={dateRange}
          startDate="2022-12-22"
          endDate="2024-01-08"
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateRange([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('range', false)}
        />

        <Cell
          title="选择日期区间(限制选择天数)"
          arrow
          center
          description={dateRange.length ? `${dateRange}` : '请选择'}
          onClick={() => toggleVisible('rangeMax', true)}
        />
        <Calendar
          visible={visible.rangeMax}
          type="range"
          maxRange={3}
          defaultValue={dateRange}
          startDate="2022-12-22"
          endDate="2024-01-08"
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateRange([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('rangeMax', false)}
        />

        <Cell
          title="选择周"
          arrow
          center
          description={dateWeek.length ? `${dateWeek}` : '请选择'}
          onClick={() => toggleVisible('week', true)}
        />
        <Calendar
          visible={visible.week}
          color={customColor}
          type="week"
          defaultValue={dateWeek}
          startDate="2023-01-01"
          endDate="2024-09-10"
          firstDayOfWeek={1}
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateWeek([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('week', false)}
        />

        <Cell
          title="日期不可选择"
          arrow
          center
          description={dateDayDisabled.length ? `${dateDayDisabled}` : '请选择'}
          onClick={() => toggleVisible('dayDisabled', true)}
        />
        <Calendar
          visible={visible.dayDisabled}
          type="range"
          defaultValue={dateDayDisabled}
          startDate="2023-01-01"
          endDate="2024-09-10"
          firstDayOfWeek={1}
          disableDate={(day) => {
            return day.year === 2023
                && (day.month === 9 || day.month === 10)
                && (day.day === 14 || day.day === 26);
          }}
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateDayDisabled([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('dayDisabled', false)}
        />
      </DemoBlock>


      <DemoBlock title="快速选择" simple card>
        <Cell
          title="选择单个日期"
          arrow
          center
          description={dateSingle ? `${dateSingle}` : '请选择'}
          onClick={() => toggleVisible('simpleQuick', true)}
        />
        <Calendar
          visible={visible.simpleQuick}
          defaultValue={dateSingle}
          showConfirm={false}
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            setDateSingle(value[3]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('simpleQuick', false)}
        />

        <Cell
          title="选择日期区间"
          arrow
          center
          description={dateRange.length ? `${dateRange}` : '请选择'}
          onClick={() => toggleVisible('rangeQuick', true)}
        />
        <Calendar
          visible={visible.rangeQuick}
          type="range"
          defaultValue={dateRange}
          showConfirm={false}
          startDate="2022-12-22"
          endDate="2024-01-08"
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateRange([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('rangeQuick', false)}
        />
      </DemoBlock>


      <DemoBlock title="自定义日历" simple card>
        <Cell
          title="自定义主题"
          arrow
          center
          description={dateRange.length ? `${dateRange}` : '请选择'}
          onClick={() => toggleVisible('colorCustom', true)}
        />
        <Calendar
          visible={visible.colorCustom}
          type="range"
          defaultValue={dateRange}
          startDate="2023-1-1"
          endDate="2023-1-31"
          color="#2151d1"
          disableDate={(day) => {
            return day.year === 2023
              && (day.month === 1)
              && (day.day === 16 || day.day === 20);
          }}
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateRange([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('colorCustom', false)}
        />

        <Cell
          title="自定义日期范围"
          arrow
          center
          description={dateRange.length ? `${dateRange}` : '请选择'}
          onClick={() => toggleVisible('rangeCustom', true)}
        />
        <Calendar
          visible={visible.rangeCustom}
          type="range"
          defaultValue={dateRange}
          showPrevMonthDay={false}
          startDate="2022-12-22"
          endDate="2023-12-15"
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateRange([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('rangeCustom', false)}
        />

        <Cell
          title="自定义日期文案"
          arrow
          center
          description={dateRange.length ? `${dateRange}` : '请选择'}
          onClick={() => toggleVisible('dayCustom', true)}
        />
        <Calendar
          visible={visible.dayCustom}
          type="range"
          defaultValue={dateRangeCustom}
          startDate="2023-02-22"
          endDate="2023-08-20"
          startText="入店"
          endText="离店"
          confirmText="完成"
          showToday
          renderDay={(day: Day) => <>{padZero(day.day)}</>}
          renderDayTop={(day: Day) => {
            let currDate = '';
            if (day && day.day === 10) {
              currDate = '😄';
            }
            return <View>{currDate}</View>;
          }}
          renderDayBottom={(day: Day) => {
            let currDate = '';
            if (day && day.day === 10) {
              currDate = '纪念日';
            }
            return <View>{currDate}</View>;
          }}
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateRangeCustom([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('dayCustom', false)}
        />


        <Cell
          title="自定义按钮"
          arrow
          center
          description={dateRange.length ? `${dateRange}` : '请选择'}
          onClick={() => toggleVisible('buttonCustom', true)}
        />
        <Calendar
          visible={visible.buttonCustom}
          ref={calendarRef}
          type="range"
          defaultValue={dateRangeButtons}
          startDate="2022-12-22"
          endDate="2024-12-31"
          showToday={false}
          showPrevMonthDay={false}
          headerButtons={
            <Space style={{ padding: '0 15px' }} className="space-test">
              <View
                className="btn"
                onClick={() => {
                  calendarRef.current?.scrollToDate('2023-04-01');
                }}
              >
                去某月（4月）
              </View>
              <View
                className="btn"
                onClick={() => {
                  const curDate = [dateUtil.date2Str(new Date()), dateUtil.getDay(6)];
                  setDateRangeButtons(curDate);
                  calendarRef.current?.scrollToDate(curDate[0]);
                }}
              >
                最近7天
              </View>
              <View
                className="btn"
                onClick={() => {
                  const curDate = new Date();
                  const year = curDate.getFullYear();
                  let month: number | string = curDate.getMonth() + 1;
                  month = month < 10 ? `0${month}` : `${month}`;
                  const yearMonth = `${year}-${month}`;
                  const currMonthDays = dateUtil.getMonthDays(`${year}`, `${month}`);
                  setDateRangeButtons([`${yearMonth}-01`, `${yearMonth}-${currMonthDays}`]);
                  if (calendarRef.current) {
                    calendarRef.current?.scrollToDate(`${yearMonth}-01`);
                  }
                }}
              >
                当月
              </View>
            </Space>
            }
          onConfirm={(value: string[]) => {
            console.log('选择结果:', value);
            const [start, end] = value;
            setDateRangeButtons([...[start[3], end[3]]]);
          }}
          onDayClick={handleDaySelect}
          onClosed={() => toggleVisible('buttonCustom', false)}
        />
      </DemoBlock>


      <DemoBlock title="平铺展示" simple card>
        <View style={{ height: '540px' }}>
          <Calendar
            title="日历"
            poppable={false}
            type="range"
            defaultValue={dateRange}
            startDate="2022-12-22"
            endDate="2024-01-08"
            onConfirm={(value: string[]) => {
              console.log('选择结果:', value);
              const [start, end] = value;
              setDateRange([...[start[3], end[3]]]);
            }}
            onDayClick={handleDaySelect}
            onClosed={() => toggleVisible('range', false)}
          />
        </View>
      </DemoBlock>

    </View>
  );
}
