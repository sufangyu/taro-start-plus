import { View } from '@tarojs/components';
import { ReactNode } from 'react';

import './index.scss';

interface Props {
  /** 标题 */
  title: string;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: ReactNode;
  /** class */
  className?: string;
  /** 点击事件 */
  onClick?: () => void;
}

const Tab = (props: Props) => {
  const { title, className, onClick } = props;

  return (
    <View className={className} onClick={() => typeof onClick === 'function' && onClick()}>
      <View>{title}</View>
    </View>
  );
};

export default Tab;
