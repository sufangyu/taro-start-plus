import { View } from '@tarojs/components';
import { ReactNode } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';

import './index.scss';


interface Props {
  children?: ReactNode;
  /** 拓展自定义 className */
  extralClass?: string;
  /** 主题颜色（需考虑文案白色） */
  color?: string;
  /** 徽标右上角内容。可以是数字，也可以是文字。如：'new'/3/99+ */
  count?: string | number;
  /** count 为数字时, 封顶的数字值, 超过用 `${maxCount}+` 显示。如：99+ */
  maxCount?: number;
  // /** 徽标内容，示例：content='自定义内容' */
  // content?: string;
  /** 是否为红点 */
  dot?: boolean;
  /** 设置状态点的位置偏移，示例：[-10, 20]  */
  offset?: number[] | string[];
  /** 形状. circle: 圆形; square: 方形; bubble: 气泡  */
  shape?: 'circle' | 'square' | 'bubble';
  /** 当数值为 0 时，是否展示徽标 */
  showZero?: boolean;


}

const Index = (props: Props) => {
  const {
    children, extralClass, color, count, maxCount = 99,
    dot = false, offset, shape = 'circle', showZero = false,
  } = props;

  
  const badgeClasses = classNames({
    badge__content: true,
    'badge__content--fixed': children,
    'badge__content--content': !dot,
    'badge__content--dot': dot,
    'badge__content--show-zero': showZero && count === 0,
    [`badge__content--${shape}`]: true,
  });


  return (
    <View className={`badge__wrapper ${extralClass ?? ''}`}>
      {children}
      <View
        className={badgeClasses}
        style={{
          top: offset && Taro.pxTransform(Number(offset[0])),
          right: offset && Taro.pxTransform(Number(offset[1])),
          backgroundColor: color,
        }}
      >
        {
          !dot && (
            typeof count === 'number'
              ? (count > maxCount ? `${maxCount}+` : count)
              : count
          )
        }
      </View>
    </View>
  );
};

export default Index;
