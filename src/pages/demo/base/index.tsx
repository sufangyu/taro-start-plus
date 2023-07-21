import { View, Text, Button } from '@tarojs/components';

import { useState } from 'react';

import './index.scss';
import Child from './components/child';

export default function Index() {
  const [count, setCount] = useState(0);

  const handleMinus = () => {
    setCount(count - 1);
  };

  return (
    <View className="container">
      <View className="demo">

        <View className="demo-title">父组件：state:</View>
        <Text>state: {count}</Text>
        <Button
          size="mini"
          onClick={() => setCount(count + 1)}
        >
          累加
        </Button>
        
      </View>

      {/* 组件 Props 属性 */}
      <View className="demo">
        <View className="demo-title">子组件：props</View>
        <Child
          count={count}
          onMinus={() => handleMinus()}
        />
      </View>
    </View>

  );
}
