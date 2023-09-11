import { View } from '@tarojs/components';

import classNames from 'classnames';

import { Right } from '../icon';

import { FormPlaceholderProps } from './types';
import './index.scss';

const Index = (props: FormPlaceholderProps) => {
  const {
    children, align = 'left', arrow = true, isPlaceholder = true, 
  } = props;

  const rootClasses = classNames({
    'form-placeholder': true,
    [`form-placeholder--${align}`]: true,
    'form-placeholder--is-placeholder': isPlaceholder,
  });

  return (
    <View className={rootClasses}>
      <View className="form-placeholder__text">{children}</View>
      {
        arrow && <View className="form-placeholder__extra"><Right fill="#999" size={40} /></View>
      }
    </View>
  );
};

export default Index;
