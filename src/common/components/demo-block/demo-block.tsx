import { View } from '@tarojs/components';

import { ReactNode } from 'react';

import './index.scss';

interface Props {
  title: string;
  children: ReactNode;
  simple?: boolean;
  card?: boolean;
}

/**
 * 列表状态组件
 * @param props 
 * @returns 
 */
const Index = (props: Props) => {
  const {
    title, children, simple = false, card = false, 
  } = props;
  
  return (
    <View className={`demo-block ${simple ? 'demo-block--simple' : ''} ${card ? 'demo-block--card' : ''}`}>
      <View className="demo-block__title">{title}</View>
      <View className="demo-block__content">{children}</View>
    </View>
  );
};

export default Index;
