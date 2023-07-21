import {
  View, Text, Button, Image, 
} from '@tarojs/components';

import icMessage from '@/assets/images/icons/ic-message.png';
import { Badge } from '@/common/components';

import './index.scss';

const Message = () => {
  return (
    <View className="icon-message">
      <Image src={icMessage} />
    </View>
  );
};

export default function Index() {
  return (
    <View className="container">
      <View className="demo-title">红点徽标</View>
      <View className="demo-content">
        <Badge dot>
          <Text>消息</Text>
        </Badge>
        <Badge dot>
          <Message />
        </Badge>
        <Badge dot>
          <Button size="mini" type="primary">按钮</Button>
        </Badge>
      </View>

      
      <View className="demo-title">数字徽标</View>
      <View className="demo-content">
        <Badge count={888} offset={[-2, -6]}>
          <Text>消息</Text>
        </Badge>
        <Badge count="2">
          <Message />
        </Badge>
        <Badge count={8}>
          <Button size="mini" type="primary">按钮</Button>
        </Badge>
      </View>

      <View className="demo-title">自定义徽标</View>
      <View className="demo-content">
        <Badge count="NEW" offset={[-2, -6]}>
          <Message />
        </Badge>
      </View>

      <View className="demo-title">徽标样式</View>
      <View className="demo-content">
        <Badge count="2" shape="circle">
          <Message />
        </Badge>
        <Badge count="2" shape="square">
          <Message />
        </Badge>
        <Badge count="NEW" shape="bubble" offset={[-2, -6]}>
          <Message />
        </Badge>
      </View>

      <View className="demo-title">独立使用</View>
      <View className="demo-content">
        <Badge count={1000} />
        <Badge count="新消息!" />
      </View>

      <View className="demo-title">自定义颜色和偏移量</View>
      <View className="demo-content">
        <Badge dot color="#007fff" offset={[64, 64]}>
          <Message />
        </Badge>
        <Badge dot color="#97ce74" offset={[0, 64]}>
          <Message />
        </Badge>
        <Badge dot color="#eb5232" offset={[0, 0]}>
          <Message />
        </Badge>
        <Badge dot color="#f2a93b" offset={[64, 0]}>
          <Message />
        </Badge>
      </View>
    </View>
  );
}
