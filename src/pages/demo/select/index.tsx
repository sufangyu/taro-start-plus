import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import { DemoBlock, Select, type SelectValue } from '@/common/components';

import './index.scss';

export default function Index() {
  const [value1, setValue1] = useState<SelectValue>('');
  const [values2, setValues2] = useState<SelectValue[]>(['1']);
  const [values3, setValues3] = useState<SelectValue[]>(['1', '2']);

  return (
    <View className="container safe-area-bottom">
      <DemoBlock title={`单选选择项 —（${value1}）`} simple>
        <View style={{ paddingLeft: Taro.pxTransform(32), paddingRight: Taro.pxTransform(32) }}>
          <Select
            values={[value1]}
            options={[
              { label: '单选1', description: '描述信息描述信息描述信息描述信息', value: '1' },
              { label: '单选2', description: '描述信息描述信息描述信息描述信息', value: '2' },
              { label: '单选3', description: '描述信息描述信息描述信息描述信息', value: '3' },
            ]}
            onChange={(value: SelectValue) => {
              setValue1(value ?? '');
            }}
          />
        </View>
      </DemoBlock>


      <DemoBlock title={`多选选择项 —（${values2}）`} simple>
        <View style={{ paddingLeft: Taro.pxTransform(32), paddingRight: Taro.pxTransform(32) }}>
          <Select 
            values={values2}
            multiple
            options={[
              { label: '多选1', description: '描述信息描述信息描述信息描述信息', value: '1' },
              { label: '多选2', description: '描述信息描述信息描述信息描述信息', value: '2' },
              { label: '多选3', description: '描述信息描述信息描述信息描述信息', value: '3' },
            ]}
            onChange={(values: SelectValue[]) => {
              setValues2(values ?? []);
            }}
          />
        </View>
      </DemoBlock>


      <DemoBlock title={`禁用项 —（${values3}）`} simple>
        <View style={{ paddingLeft: Taro.pxTransform(32), paddingRight: Taro.pxTransform(32) }}>
          <Select 
            values={values3}
            multiple
            options={[
              { label: '多选1', description: '描述信息描述信息描述信息描述信息', value: '1' },
              {
                label: '多选2', description: '描述信息描述信息描述信息描述信息', value: '2', disabled: true, 
              },
              { label: '多选3', description: '描述信息描述信息描述信息描述信息', value: '3' },
              {
                label: '多选4', description: '描述信息描述信息描述信息描述信息', value: '4', disabled: true, 
              },
            ]}
            onChange={(values: SelectValue[]) => {
              setValues3(values ?? []);
            }}
          />
        </View>
      </DemoBlock>


      <DemoBlock title={`横向多选选择项 —（${values2}）`} simple>
        <View 
          style={{
            marginLeft: Taro.pxTransform(32), 
            marginRight: Taro.pxTransform(32),
            // backgroundColor: 'red',
          }}
        >
          <Select 
            values={values2}
            multiple
            layout="horizontal"
            options={[
              { label: '多选1', value: '1' },
              { label: '多选2', value: '2' },
              { label: '多选3', value: '3' },
              { label: '多选4', value: '4' },
              { label: '多选5', value: '5' },
              // { label: '多选6', value: '6' },
            ]}
            onChange={(values: SelectValue[]) => {
              setValues2(values ?? []);
            }}
          />
        </View>
      </DemoBlock>

      <DemoBlock title={`小尺寸多选选择项 —（${values2}）`} simple>
        <View 
          style={{
            marginLeft: Taro.pxTransform(32), 
            marginRight: Taro.pxTransform(32),
            // backgroundColor: 'red',
          }}
        >
          <Select 
            values={values2}
            multiple
            layout="horizontal"
            size="mini"
            columnNum={4}
            options={[
              { label: '多选1', value: '1' },
              { label: '多选2', value: '2' },
              { label: '多选3', value: '3' },
              { label: '多选4', value: '4' },
              { label: '多选5', value: '5' },
              { label: '多选6', value: '6' },
            ]}
            onChange={(values: SelectValue[]) => {
              setValues2(values ?? []);
            }}
          />
        </View>
      </DemoBlock>


      <DemoBlock title={`只读 —（${values3}）`} simple>
        <View style={{ paddingLeft: Taro.pxTransform(32), paddingRight: Taro.pxTransform(32) }}>
          <Select 
            values={['1', '2', '3']}
            readOnly
            multiple
            options={[
              { label: '多选1', description: '描述信息描述信息描述信息描述信息', value: '1' },
              { label: '多选2', description: '描述信息描述信息描述信息描述信息', value: '2' },
              { label: '多选3', description: '描述信息描述信息描述信息描述信息', value: '3' },
            ]}
          />
        </View>
      </DemoBlock>

    </View>
  );
}
