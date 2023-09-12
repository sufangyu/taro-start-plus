import { View } from '@tarojs/components';

import { useState } from 'react';

import { DemoBlock, Checkbox, CheckboxGroup } from '@/common/components';
import './index.scss';

export default function Index() {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState<'YES' | 'NO'>('NO');
  const [valuesGroup, setValuesGroup] = useState<string[]>([]);

  
  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="单独使用" simple>
        <Checkbox
          label="默认选中多选框" 
          defaultChecked={value1 === 1}
          onChange={(val: number) => { 
            console.log('默认选中多选框 onChange', val);
            setValue1(val);
          }}
        />
        <Checkbox
          defaultChecked={value2 === 'YES'}
          trueLabel="YES"
          falseLabel="NO"
          onChange={(val: 'YES' | 'NO') => {
            console.log('未选中多选框 onChange', val);
            setValue2(val); 
          }}
        >
          未选中多选框 - {value2}
        </Checkbox>

        <Checkbox
          onChange={(val) => {
            console.log('单选长标题 onChange', val);
          }}
        >
          单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题单选长标题
        </Checkbox>
        <Checkbox
          onChange={(val) => {
            console.log('描述信息 onChange', val);
          }}
          description="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
        >
          单选标题+描述多选框
        </Checkbox>
      </DemoBlock>


      <DemoBlock title="纵向多选框组" simple>
        <CheckboxGroup
          defaultValues={valuesGroup}
          onChange={(values: string[]) => {
            console.log('纵向多选框组 =>', values);
            setValuesGroup([...values]);
          }}
        >
          <Checkbox label="多选框选项 1" value="1" />
          <Checkbox label="多选框选项 2" value="2" />
          <Checkbox label="多选框选项 3" value="3" />
        </CheckboxGroup>
      </DemoBlock>

      <DemoBlock title="带全选多选框组" simple>
        <CheckboxGroup
          defaultValues={valuesGroup}
          onChange={(values: string[]) => {
            console.log('纵向多选框组 =>', values);
            setValuesGroup([...values]);
          }}
        >
          <Checkbox label="全选" checkAll />
          <Checkbox label="多选框选项 1" value="1" />
          <Checkbox label="多选框选项 2" value="2" />
          <Checkbox label="多选框选项 3" value="3" />
        </CheckboxGroup>
      </DemoBlock>


      <DemoBlock title="横向多选框组" simple>
        <CheckboxGroup
          defaultValues={valuesGroup}
          block={false}
          onChange={(values: string[]) => {
            console.log('纵向多选框组 =>', values);
            setValuesGroup([...values]);
          }}
        >
          <Checkbox label="多选标题1" value="1" />
          <Checkbox label="多选标题2" value="2" />
          <Checkbox label="多选标题3" value="3" />
        </CheckboxGroup>
      </DemoBlock>


      <DemoBlock title="组件样式" simple>
        <Checkbox icon="circle" label="多选框" defaultChecked />
        <Checkbox icon="check" label="多选框" defaultChecked />
      </DemoBlock>


      <DemoBlock title="勾选显示位置" simple>
        <Checkbox placement="left" defaultChecked>勾选位置在左侧</Checkbox>
        <Checkbox placement="right" defaultChecked>勾选位置在右侧</Checkbox>
      </DemoBlock>


      <DemoBlock title="非通栏单选样式" simple>
        <CheckboxGroup
          defaultValues={valuesGroup}
          theme="card"
          onChange={(values: string[]) => {
            console.log('纵向多选框组 =>', values);
            setValuesGroup([...values]);
          }}
        >
          <Checkbox label="多选框选项 1" value="1" />
          <Checkbox label="多选框选项 2" value="2" />
          <Checkbox label="多选框选项 3" value="3" />
          <Checkbox label="被禁用选项" value="4" disabled />
        </CheckboxGroup>
      </DemoBlock>


      <DemoBlock title="禁用状态" simple>
        <CheckboxGroup defaultValues={['1']} disabled>
          <Checkbox label="单选框选项 1" value="1" />
          <Checkbox label="单选框选项 2" value="2" />
          <Checkbox label="单选框选项 3" value="3" />
        </CheckboxGroup>
      </DemoBlock>
    </View>
  );
}
