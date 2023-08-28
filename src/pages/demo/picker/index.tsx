import { View } from '@tarojs/components';

import { useState } from 'react';

import { ConfirmCallBack, DemoBlock, PickerBase } from '@/common/components';

import './index.scss';


const columns = [
  [
    { value: 0, label: '男' },
    { value: 1, label: '女' },
  ],
  [
    { value: 0, label: '已婚' }, 
    { value: 1, label: '未婚' },
  ],
  [
    { value: 0, label: '在职' }, 
    { value: 1, label: '离职' },
  ],
];

const options = [
  {
    label: '动物',
    value: 1,
    children: [
      {
        label: '鱼',
        value: 11,
        children: [
          { label: '草鱼', value: 111 },
          { label: '鲫鱼', value: 112 },
          { label: '鲢鱼', value: 113 },
        ],
      },
      {
        label: '蛇',
        value: 12,
        children: [
          { label: '蟒蛇', value: 121 },
          { label: '眼镜蛇', value: 122 },
          { label: '水蛇', value: 123 },
        ],
      },
    ],
  },
  {
    label: '植物',
    value: 2,
    children: [
      {
        label: '树',
        value: 21,
        children: [
          { label: '梧桐树', value: 211 },
          { label: '银杏树', value: 212 },
          { label: '杉树', value: 213 },
        ],
      },
      {
        label: '花',
        value: 22,
        children: [
          { label: '玫瑰', value: 221 },
          { label: '紫罗兰', value: 222 },
          { label: '菊花', value: 223 },
          { label: '牡丹', value: 224 },
        ],
      },
    ],
  },
];

export default function Index() {
  const [result1, setResult1] = useState<ConfirmCallBack>({
    choosedResult: [], choosedIndexValues: [],
  });
  const [result2, setResult2] = useState<ConfirmCallBack>({
    choosedResult: [], choosedIndexValues: [],
  });
  const [result3, setResult3] = useState<ConfirmCallBack>({
    choosedResult: [], choosedIndexValues: [],
  });
  const [result4, setResult4] = useState<ConfirmCallBack>({
    choosedResult: [], choosedIndexValues: [],
  });
  const [result5, setResult5] = useState<ConfirmCallBack>({
    choosedResult: [], choosedIndexValues: [],
  });
  const [result6, setResult6] = useState<ConfirmCallBack>({
    choosedResult: [], choosedIndexValues: [],
  });

  return (
    <View className="container">
      <DemoBlock title="单列非联动 Picker">
        <PickerBase
          columns={[
            ['太阳', '月亮', '星星'],
          ]}
          height={360}
          indicatorStyle="height: 40px; background: rgba(0,0,0,0.05);" 
          onConfirm={({ choosedResult, choosedIndexValues }) => {
            console.log(choosedResult, choosedIndexValues);
            setResult1({
              choosedResult,
              choosedIndexValues,
            });
          }}
        >
          <view className="picker-result">
            当前选择：{result1.choosedIndexValues?.join(',')}
          </view>
        </PickerBase>
      </DemoBlock>

      <DemoBlock title="多列非联动 Picker">
        <PickerBase
          columns={[
            ['男', '女'], 
            ['已婚', '未婚'],
            ['在职', '离职'],
          ]}
          titleText="标题"
          onConfirm={({ choosedResult, choosedIndexValues }) => {
            console.log(choosedResult, choosedIndexValues);
            setResult2({
              choosedResult,
              choosedIndexValues,
            });
          }}
        >
          <view className="picker-result">
            当前选择：{result2.choosedIndexValues?.join(',')}
          </view>
        </PickerBase>
      </DemoBlock>

      <DemoBlock title="多列非联动 Picker（返回对象）">
        <PickerBase
          columns={columns}
          titleText="标题，长文本的标题长文本的标题长文本的标题长文本的标题"
          onConfirm={({ choosedResult, choosedIndexValues }) => {
            console.log(choosedResult, choosedIndexValues);
            setResult3({
              choosedResult,
              choosedIndexValues,
            });
          }}
        >
          <view className="picker-result">
            当前选择： {result3.choosedIndexValues?.join(',')} 
          </view>
        </PickerBase>
      </DemoBlock>
      
      
      <DemoBlock title="多列非联动 Picker（默认选择）">
        <PickerBase
          columns={columns}
          defaultValues={[0, 1, 1]}
          // defaultValues={[{ value: 0 }, { value: 1 }, { value: 1 }]}
          onConfirm={({ choosedResult, choosedIndexValues }) => {
            console.log(choosedResult, choosedIndexValues);
            setResult4({
              choosedResult,
              choosedIndexValues,
            });
          }}
        >
          <view className="picker-result">
            当前选择：{result4.choosedIndexValues?.join(',')}
          </view>
        </PickerBase>
      </DemoBlock>
     

      {/* ============ 联动 ============ */}
      <DemoBlock title="多列联动 Picker">
        <PickerBase
          mode="cascade"
          options={options}
          onConfirm={({ choosedResult, choosedIndexValues }) => {
            console.log(choosedResult, choosedIndexValues);
            setResult5({
              choosedResult,
              choosedIndexValues,
            });
          }}
        >
          <view className="picker-result">
            当前选择：{result5.choosedIndexValues?.join(',')}
          </view>
        </PickerBase>
      </DemoBlock>

      <DemoBlock title="多列联动 Picker（默认选择）">
        <PickerBase
          mode="cascade"
          options={options}
          defaultValues={[{ value: 2 }, { value: 21 }, { value: 213 }]}
          // defaultValues={[1, 1, 2]}
          onConfirm={({ choosedResult, choosedIndexValues }) => {
            console.log(choosedResult, choosedIndexValues);
            setResult6({
              choosedResult,
              choosedIndexValues,
            });
          }}
        >
          <view className="picker-result">
            当前选择：{result6.choosedIndexValues?.join(',')}
          </view>
        </PickerBase>
      </DemoBlock>

    </View>
  );
}
