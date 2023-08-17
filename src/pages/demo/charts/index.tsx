import { View } from '@tarojs/components';
import { useReady } from '@tarojs/taro';

import {
  Area, Axis, Chart, Interval,
  Legend, Line, Point, Tooltip,
} from '@antv/f2';
import { useState } from 'react';

import { DemoBlock, F2Canvas } from '@/common/components';
import './index.scss';


export default function Index() {
  // 折线图数据
  const [lineData, setLineDate] = useState<{day: string; value: number}[]>([]);

  // 柱状图数据
  const columnData = [
    {
      year: '1951 年',
      sales: 38,
    },
    {
      year: '1952 年',
      sales: 52,
    },
    {
      year: '1956 年',
      sales: 61,
    },
    {
      year: '1957 年',
      sales: 145,
    },
    {
      year: '1958 年',
      sales: 48,
    },
    {
      year: '1959 年',
      sales: 38,
    },
    {
      year: '1960 年',
      sales: 38,
    },
    {
      year: '1962 年',
      sales: 38,
    },
  ];

  // 饼图数据
  const pieData = [
    {
      name: '长津湖',
      percent: 0.4,
      a: '1',
    },
    {
      name: '我和我的父辈',
      percent: 0.2,
      a: '1',
    },
    {
      name: '失控玩家',
      percent: 0.18,
      a: '1',
    },
    {
      name: '宝可梦',
      percent: 0.15,
      a: '1',
    },
    {
      name: '峰爆',
      percent: 0.05,
      a: '1',
    },
    {
      name: '其他',
      percent: 0.02,
      a: '1',
    },
  ];
  
  // 环形图数据
  const ringData = [
    {
      name: '股票类',
      percent: 83.59,
      a: '1',
    },
    {
      name: '债券类',
      percent: 2.17,
      a: '1',
    },
    {
      name: '现金类',
      percent: 14.24,
      a: '1',
    },
  ];
  const map = {};
  ringData.forEach((obj) => {
    map[obj.name] = `${obj.percent}%`;
  });

  // 漏斗图数据
  const funnelData = [
    { action: '浏览网站', pv: 50000, percent: 1 },
    { action: '放入购物车', pv: 35000, percent: 0.7 },
    { action: '生成订单', pv: 25000, percent: 0.5 },
    { action: '支付订单', pv: 15000, percent: 0.3 },
    { action: '完成交易', pv: 8000, percent: 0.16 },
  ];


  useReady(() => {
    setTimeout(() => {
      setLineDate([
        {
          day: '周一',
          value: 300,
        },
        {
          day: '周二',
          value: 400,
        },
        {
          day: '周三',
          value: 350,
        },
        {
          day: '周四',
          value: 500,
        },
        {
          day: '周五',
          value: 490,
        },
        {
          day: '周六',
          value: 600,
        },
        {
          day: '周日',
          value: 900,
        },
  
      ]);
    }, 1500);
  });


  return (
    <View className="container">
      <DemoBlock title="基础折线图">
        <F2Canvas height={400}>
          <Chart data={lineData}>
            <Axis
              field="day"
              tickCount={7}
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line x="day" y="value" shape="smooth" />
            <Point x="day" y="value" />
            <Tooltip showCrosshairs />
          </Chart>
        </F2Canvas>
      </DemoBlock>

      <DemoBlock title="基础面积图">
        <F2Canvas height={400}>
          <Chart
            data={lineData}
            scale={{
              day: {
                type: 'cat',
                // tickCount: 3,
              },
              value: {
                min: 0,
              },
            }}
          >
            <Axis
              field="day"
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" />
            <Area x="day" y="value" color="l(90) 0:#1890FF 1:#f7f7f7" shape="smooth" />
            <Line x="day" y="value" color="l(90) 0:#1890FF 1:#f7f7f7" shape="smooth" />
            <Tooltip showCrosshairs />
          </Chart>
        </F2Canvas>
      </DemoBlock>

      <DemoBlock title="基础柱状图">
        <F2Canvas height={400}>
          <Chart
            data={columnData}
            scale={{
              sales: {
                tickCount: 5,
              },
            }}
          >
            <Axis field="year" />
            <Axis field="sales" />
            <Interval x="year" y="sales" />
            <Tooltip showCrosshairs />
          </Chart>
        </F2Canvas>
      </DemoBlock>

      <DemoBlock title="基础饼图">
        <F2Canvas height={400}>
          <Chart
            data={pieData}
            coord={{
              transposed: true,
              type: 'polar',
            }}
          >
            <Interval
              x="a"
              y="percent"
              adjust="stack"
              color={{
                field: 'name',
                range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
              }}
            />
            <Legend position="right" />
          </Chart>
        </F2Canvas>
      </DemoBlock>


      <DemoBlock title="基础环形图">
        <F2Canvas height={400}>
          <Chart
            data={ringData}
            scale={{
              percent: {
                formatter: (val: number | string) => `${val}%`,
              },
            }}
            coord={{
              type: 'polar',
              transposed: true,
              innerRadius: 0.7,
              radius: 0.85,
            }}
          >
            <Interval
              x="a"
              y="percent"
              adjust="stack"
              color={{
                field: 'name',
                range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
              }}
              style={{
                radius: [10, 7, 4, 2],
              }}
            />
            <Legend
              position="right"
              itemFormatter={(_val, name) => {
                return map[name];
              }}
            />
          </Chart>
        </F2Canvas>
      </DemoBlock>


      <DemoBlock title="基础漏斗图">
        <F2Canvas height={500}>
          <Chart
            data={funnelData}
            coord={{
              transposed: true,
            }}
            scale={{
              percent: {
                min: 0,
              },
              action: {
                range: [1, 0],
              },
            }}
          >
            <Interval
              x="action"
              y="percent"
              adjust="symmetric"
              shape="funnel"
              color={{
                field: 'action',
                range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
              }}
              style={{
                stroke: '#fff',
                lineWidth: 2,
              }}
              showLabel
              labelCfg={{
                offsetX: 10,
                label: (data, color) => {
                  return {
                    text: data.action,
                    fill: color,
                  };
                },
                guide: (data) => {
                  return {
                    text: `${(data.percent * 100).toFixed(0)}%`,
                    fill: '#fff',
                  };
                },
              }}
            />
            <Legend />
          </Chart>

        </F2Canvas>
      </DemoBlock>

    </View>
  );
}
