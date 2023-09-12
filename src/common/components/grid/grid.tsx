import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import classNames from 'classnames';

import GridItem from './grid-item';
import { GridProps } from './types';
import './index.scss';

const Index = (props: GridProps) => {
  const { 
    children,
    columnNum = 4,
    gutter = 0,
    border = true,
    square = false,
    theme = 'default',
  } = props;

  const childrenElements = Array.isArray(children) ? children : [children];

  const flexBasis = 100 / columnNum;
  const rootClasses = classNames({
    grid: true,
    [`grid--${theme}`]: true,
    'grid--border': border,
    'grid--square': square,
  });

  return (
    <View
      className={rootClasses}
      style={{
        paddingLeft: gutter ? Taro.pxTransform(gutter) : '',
        marginTop: gutter ? `-${Taro.pxTransform(gutter)}` : '',
      }}
    >
      {
        childrenElements.map((child, idx) => (
          <GridItem
            style={{
              flexBasis: `${flexBasis}%`,
              paddingTop: square ? `${flexBasis}%` : '',
              paddingRight: gutter ? Taro.pxTransform(gutter) : '',
              marginTop: gutter ? Taro.pxTransform(gutter) : '',
            }}
            icon={child.props.icon}
            text={child.props.text}
            onClick={child.props.onClick}
            key={idx}
          />
        ))
      }
    </View>
  );
};

export default Index;
