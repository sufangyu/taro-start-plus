import { View } from '@tarojs/components';

import classNames from 'classnames';

import { CellGroupProps } from './types';
import './index.scss';


const Index = (props: CellGroupProps) => {
  const {
    children, title, inset = false, 
  } = props;

  const rootClasses = classNames({
    'cell-group': true,
    'cell-group--inset': inset,
  });

  return (
    <View className={rootClasses}>
      {title && <View className="cell-group__title">{title}</View>}
      <View className="cell-group__content">
        {children}
      </View>
    </View>
  );
};

export default Index;
