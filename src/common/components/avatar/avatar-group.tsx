/* eslint-disable react/jsx-props-no-spreading */
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import Avatar from './avatar';
import { AvatarGroupProps } from './types';

import './index.scss';

const Index = (props: AvatarGroupProps) => {
  const {
    children, cascading = 'left-up', max = 3, size = 'medium', 
    collapseAvatar, collapseColor, collapseBackground, onCollapseClick,
  } = props;

  const groupChildren = Array.isArray(children) ? children : [children];
  // 基础层级
  const baseZIndex = 20;
  // 重叠宽度
  const overlapWidth = typeof size === 'number' ? Taro.pxTransform(size / 4) : 0;
  
  return (
    <View
      className={`avatar-group avatar-group--${cascading} avatar-group--${size}`}
      style={{
        paddingLeft: typeof size === 'number' ? overlapWidth : '',
      }}
    >
      {
        groupChildren.map((child, idx) => {
          return (idx < max)
            ? <Avatar
                key={idx}
                size={size}
                {...child.props}
                round
                style={{
                  zIndex: cascading === 'left-up' ? baseZIndex - idx : baseZIndex + idx,
                  marginLeft: typeof size === 'number' ? `-${overlapWidth}` : '',
                }}
            />
            : null;
        })
      }
      {
        // 头像折叠元素
        groupChildren.length > max
          ? (
            <Avatar
              size={size}
              round
              color={collapseColor}
              background={collapseBackground}
              style={{
                zIndex: cascading === 'left-up' ? baseZIndex - max : baseZIndex + max,
                marginLeft: typeof size === 'number' ? `-${overlapWidth}` : '',
              }}
              onClick={() => {
                typeof onCollapseClick === 'function' && onCollapseClick();
              }}
            >
              {collapseAvatar ?? `+${groupChildren.length - max}`}
            </Avatar>
          )
          : null
      }
    </View>
  );
};

export default Index;
