import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  DemoBlock, HomeTwo, Rate, Space, 
} from '@/common/components';

import './index.scss';

export default function Index() {
  const showToast = (value: number) => {
    Taro.showToast({
      icon: 'none',
      title: `评分: ${value}`,
    });
  };

  return (
    <View className="container">
      <DemoBlock title="基础用法（实心、空心图标）">
        <Rate
          onChange={(value: number) => showToast(value)}
        />
      </DemoBlock>

      <DemoBlock title="半星评分">
        <Rate
          allowHalf
          onChange={(value: number) => showToast(value)} 
        />
      </DemoBlock>

      
      <DemoBlock title="带描述评分">
        <Space block align="center">
          <Rate
            allowHalf
            showText
            texts={['1分', '2分', '3分', '4分', '5分']} 
          />
        </Space>

        <Space block align="center">
          <Rate allowHalf showText />
        </Space>
      </DemoBlock>


      <DemoBlock title="允许清除">
        <Space block align="center">
          <Rate allowClear />
          <View style={{ fontSize: '12px' }}>可清除</View>
        </Space>

        <Space block align="center">
          <Rate allowClear={false} />
          <View style={{ fontSize: '12px' }}>不可清除</View>
        </Space>
      </DemoBlock>


      <DemoBlock title="只读">
        <View>
          <Rate disabled allowHalf defaultValue={3} />
        </View>
        <View>
          <Rate disabled allowHalf defaultValue={2.5} />
        </View>
      </DemoBlock>


      <DemoBlock title="自定义数量">
        <Rate count={4} />
      </DemoBlock>


      <DemoBlock title="自定义大小">
        <View>
          <Rate size={32} />
        </View>

        <View>
          <Rate size={16} />
        </View>
      </DemoBlock>

      <DemoBlock title="自定义颜色">
        <View>
          <Rate allowHalf color={['#FFC51C', '#E8E8E8']} />
        </View>
      </DemoBlock>
      

      <DemoBlock title="自定义字符和样式">
        <View>
          <Rate
            defaultValue={2.5}
            allowHalf
            character={<HomeTwo theme="filled" size={64} fill="#FFC51C" />}
            characterActive={<HomeTwo theme="filled" size={64} fill="#004fd4" />}
          />
        </View>

        <View>
          <Rate defaultValue={2.5} allowHalf character="A" />
        </View>
        
        <View>
          <Rate defaultValue={2.5} color={['#FFC51C', '#E8E8E8']} allowHalf character="好" />
        </View>
      </DemoBlock>
    </View>
  );
}
