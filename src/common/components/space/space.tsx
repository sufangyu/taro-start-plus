import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import classNames from 'classnames';

import { SpaceProps } from './types';
import './index.scss';

const Index = (props: SpaceProps) => {
  const {
    children, direction = 'horizontal', block = false, wrap = false,
    justify, align, gap = 16, gapHorizontal, gapVertical,
  } = props;

  const spaceChildren = Array.isArray(children) ? children : [children];
  // 换行（在 horizontal 时有效）
  const isWrap = wrap && direction === 'horizontal';
  // 水平间距
  const spaceHorizontal = Taro.pxTransform(gapHorizontal ?? gap);
  // 垂直间距
  const spaceVertical = Taro.pxTransform(gapVertical ?? gap);

  const rootClasses = classNames({
    space: true,
    [`space--${direction}`]: true,
    'space--block': block,
    'space--wrap': isWrap,
    [`space-justify--${justify}`]: justify,
    [`space-align--${align}`]: align,
  });
  
  return (
    <View
      className={rootClasses}
      style={{
        marginBottom: isWrap ? `-${spaceVertical}` : '',
      }}
    >
      {
        spaceChildren.map((spaceItem, idx) => {
          return (
            <View
              className="space-item"
              key={idx}
              style={{
                // 水平
                marginRight: direction === 'horizontal' ? spaceHorizontal : '',
                paddingBottom: isWrap ? spaceVertical : '',

                // 垂直
                marginBottom: direction === 'vertical' ? spaceVertical : '',
              }}
            >
              {spaceItem}
            </View>
          );
        })
      }
    </View>
  );
};

export default Index;
