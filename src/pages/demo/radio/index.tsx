import { View } from '@tarojs/components';

import { useState } from 'react';

import { DemoBlock, Radio, RadioGroup } from '@/common/components';

import './index.scss';

export default function Index() {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState<'YES' | 'NO'>('YES');

  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="单独使用" simple>
        <Radio
          label="默认选中单选框" 
          value={value1}
          defaultChecked
          onChange={(val: number) => { 
            console.log('默认选中单选框 onChange', val);
            setValue1(val);
          }}
        />
        <Radio
          defaultChecked={value2}
          onChange={(val: boolean) => {
            console.log('未选中单选框 onChange', val); 
            setValue2(val); 
          }}
        >
          默认未选中单选框 - {`${value2}`}
        </Radio>
        <Radio 
          defaultChecked
          uncheck
          trueLabel="YES"
          falseLabel="NO"
          onChange={(val: 'YES' | 'NO') => {
            console.log('可取消选中单选框 onChange', val);
            setValue3(val); 
          }}
        >
          可取消选中单选框 - {value3}
        </Radio>

        <Radio
          onChange={(val) => {
            console.log('单选长标题 onChange', val);
          }}
        >
          单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题
        </Radio>
        <Radio
          description="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
          onChange={(val) => {
            console.log('描述信息 onChange', val);
          }}
        >
          标题+描述单选框
        </Radio>
      </DemoBlock>


      <DemoBlock title="纵向单选框组" simple>
        <RadioGroup
          defaultValue="1"
          onChange={(val) => {
            console.log('纵向单选框组 =>', val);
          }}
        >
          <Radio label="单选框选项 1" value="1" />
          <Radio label="单选框选项 2" value="2" />
          <Radio label="单选框选项 3" value="3" />
        </RadioGroup>
      </DemoBlock>
      

      <DemoBlock title="横向单选框组" simple>
        <RadioGroup
          defaultValue="1"
          block={false}
          onChange={(val) => {
            console.log('纵向单选框组 =>', val);
          }}
        >
          <Radio label="单选标题" value="1" />
          <Radio label="单选标题" value="2" />
          <Radio label="上限四字" value="3" />
        </RadioGroup>
      </DemoBlock>
      

      <DemoBlock title="组件样式" simple>
        <Radio icon="circle" label="单选框" uncheck defaultChecked />
        <Radio icon="dot" label="单选框" uncheck defaultChecked />
        <Radio icon="check" label="单选框" uncheck defaultChecked />
      </DemoBlock>

      
      <DemoBlock title="勾选显示位置" simple>
        <Radio placement="left" uncheck defaultChecked>勾选位置在左侧</Radio>
        <Radio placement="right" uncheck defaultChecked>勾选位置在右侧</Radio>
      </DemoBlock>
      

      <DemoBlock title="非通栏单选样式" simple>
        <RadioGroup defaultValue="1" theme="card">
          <Radio label="单选框选项 1" value="1" />
          <Radio label="单选框选项 2" value="2" />
          <Radio label="单选框选项 3" value="3" />
          <Radio label="被禁用选项" value="4" disabled />
        </RadioGroup>
      </DemoBlock>


      <DemoBlock title="禁用状态" simple>
        <RadioGroup
          defaultValue="1"
          disabled
        >
          <Radio label="单选框选项 1" value="1" />
          <Radio label="单选框选项 2" value="2" />
          <Radio label="单选框选项 3" value="3" />
        </RadioGroup>
      </DemoBlock>
    </View>
  );
}
