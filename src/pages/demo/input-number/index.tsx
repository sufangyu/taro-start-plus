import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { DemoBlock, InputNumber, Space } from '@/common/components';

import './index.scss';

export default function Index() {
  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基础用法">
        <Space block direction="vertical">
          <InputNumber />
          <InputNumber defaultValue={1} />
        </Space>
      </DemoBlock>


      <DemoBlock title="数字精度（小数位）">
        <InputNumber defaultValue={1} precision={2} />
      </DemoBlock>


      <DemoBlock title="数值改变步数">
        <InputNumber defaultValue={1} precision={2} step={0.1} />
      </DemoBlock>


      <DemoBlock title="严格改变步数">
        <InputNumber defaultValue={1} precision={1} step={0.2} stepStrictly />
      </DemoBlock>


      <DemoBlock title="最小最大限制">
        <Space block direction="vertical">
          <InputNumber defaultValue={6} min={0} max={20} />
          <InputNumber defaultValue={3.00} precision={2} min={0} max={20} />
        </Space>
      </DemoBlock>


      <DemoBlock title="控制按钮位置">
        <Space block direction="vertical">
          <InputNumber controlsPosition="right" size="small" />
          <InputNumber controlsPosition="right" size="default" />
          <InputNumber controlsPosition="right" size="large" />
        </Space>
      </DemoBlock>


      <DemoBlock title="不使用控制按钮">
        <InputNumber controls={false} precision={2} />
      </DemoBlock>


      <DemoBlock title="不同尺寸">
        <Space align="center">
          <InputNumber defaultValue={6} width={Taro.pxTransform(220)} size="small" />
          <InputNumber defaultValue={6} width={Taro.pxTransform(220)} size="default" />
          <InputNumber defaultValue={6} width={Taro.pxTransform(220)} size="large" />
        </Space>
      </DemoBlock>


      <DemoBlock title="不同对齐方式">
        <Space align="center">
          <InputNumber defaultValue={6} align="left" width={Taro.pxTransform(220)} size="small" />
          <InputNumber defaultValue={6} align="center" width={Taro.pxTransform(220)} size="default" />
          <InputNumber defaultValue={6} align="right" width={Taro.pxTransform(220)} size="large" />
        </Space>
      </DemoBlock>


      <DemoBlock title="设置前置后置">
        <Space block direction="vertical">
          <InputNumber defaultValue={10} precision={2} prefix="¥" width={Taro.pxTransform(480)} />
          <InputNumber defaultValue={10} precision={2} suffix="%" width={Taro.pxTransform(480)} />
          <InputNumber prefix="机器:" suffix="台" width={Taro.pxTransform(480)} />
        </Space>
      </DemoBlock>

      
      <DemoBlock title="指定宽度">
        <Space block direction="vertical">
          <InputNumber width={Taro.pxTransform(320)} />
          <InputNumber width={Taro.pxTransform(480)} />
        </Space>
      </DemoBlock>


      <DemoBlock title="回调事件">
        <Space block direction="vertical">
          <InputNumber
            defaultValue={8}
            onFocus={(ev) => {
              console.log('onFocus =>>', ev);
            }}
            onBlur={(ev) => {
              console.log('onBlur =>>', ev);
            }}
            onChange={(currentValue, oldValue) => {
              console.log('onChange =>>', currentValue, oldValue);
            }}
          />
        </Space>
      </DemoBlock>
    </View>
  );
}
