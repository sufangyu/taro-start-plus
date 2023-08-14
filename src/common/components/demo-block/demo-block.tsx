import { View } from '@tarojs/components';

import { ReactNode } from 'react';

import './index.scss';

interface Props {
  title: string;
  children: ReactNode;
}

/**
 * 列表状态组件
 * @param props 
 * @returns 
 */
const Index = (props: Props) => {
  const { title, children } = props;
  
  return (
    <View className="demo-block">
      <View className="demo-block__title">{title}</View>
      <View className="demo-block__content">{children}</View>
    </View>
  );
};

export default Index;
