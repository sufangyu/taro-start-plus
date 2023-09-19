import { View } from '@tarojs/components';

import { ReactNode } from 'react';

import { DemoBlock, Space } from '@/common/components';

import './index.scss';


const Button = (props: {children: ReactNode; widthAuto?: boolean}) => {
  const { children, widthAuto = false } = props;
  return (
    <View
      className="button-demo"
      style={{
        minWidth: widthAuto ? 'auto' : '',
      }}
    >
      {children}
    </View>
  );
};

export default function Index() {
  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="水平方向的间距">
        <Space>
          {
            new Array(3).fill('').map((_, idx) => <Button key={idx}>按钮{idx + 1}</Button>)
          }
        </Space>
      </DemoBlock>


      <DemoBlock title="水平方向的间距">
        <Space wrap>
          {
            new Array(10).fill('').map((_, idx) => <Button key={idx}>按钮{idx + 1}</Button>)
          }
        </Space>
      </DemoBlock>

      <DemoBlock title="垂直方向的间距">
        <Space direction="vertical">
          {
            new Array(3).fill('').map((_, idx) => <Button key={idx}>按钮{idx + 1}</Button>)
          }
        </Space>
      </DemoBlock>

      
      <DemoBlock title="自定义间距大小（统一设置）">
        <Space wrap gap={40}>
          {
            new Array(6).fill('').map((_, idx) => <Button key={idx}>按钮{idx + 1}</Button>)
          }
        </Space>
      </DemoBlock>


      <DemoBlock title="自定义间距大小（分开设置）">
        <Space wrap gapHorizontal={60} gapVertical={40}>
          {
            new Array(6).fill('').map((_, idx) => <Button key={idx}>按钮{idx + 1}</Button>)
          }
        </Space>
      </DemoBlock>


      <DemoBlock title="渲染为块级元素">
        <Space direction="vertical" block>
          {
            new Array(3).fill('').map((_, idx) => <Button key={idx}>按钮{idx + 1}</Button>)
          }
        </Space>
      </DemoBlock>


      <DemoBlock title="主轴对齐方式">
        <Space justify="center" block>
          <Button widthAuto>1</Button>
          <Button widthAuto>
            <View>2</View><View>2</View>
          </Button>
          <Button widthAuto>
            <View>3</View><View>3</View><View>3</View>
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title="交叉轴对齐方式">
        <Space align="end">
          <Button widthAuto>1</Button>
          <Button widthAuto>
            <View>2</View><View>2</View>
          </Button>
          <Button widthAuto>
            <View>3</View><View>3</View><View>3</View>
          </Button>
        </Space>
      </DemoBlock>
      
    </View>
  );
}
