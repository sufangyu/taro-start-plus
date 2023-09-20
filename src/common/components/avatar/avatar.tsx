import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import classNames from 'classnames';
import { useState } from 'react';

import defaultImg from './images/default.svg';
import { AvatarProps } from './types';
import './index.scss';

const Index = (props: AvatarProps) => {
  const {
    children, src, mode = 'scaleToFill', size = 'medium', round = false, 
    lazy = false, color, background, style = {}, fallbackSrc, onError, onClick,
  } = props;

  const [imgUrl, setImgUrl] = useState(src);
  const rootClasses = classNames({
    avatar: true,
    [`avatar--${size}`]: typeof size === 'string',
    'avatar--round': round,
  });
  // 自定义尺寸
  const sizeCustom = typeof size === 'number' ? Taro.pxTransform(size) : '';
  const fontSizeCustom = typeof size === 'number' ? Taro.pxTransform(size / 3) : '';
  
  return (
    <View
      className={rootClasses}
      style={{
        width: sizeCustom,
        height: sizeCustom,
        color: color ?? '',
        backgroundColor: background ?? '',
        fontSize: fontSizeCustom,
        ...style,
      }}
      onClick={() => {
        typeof onClick === 'function' && onClick();
      }}
    >
      {
        (imgUrl && !children) && <Image
          src={imgUrl}
          mode={mode}
          lazyLoad={lazy}
          onError={(ev) => {
            setImgUrl(fallbackSrc ?? defaultImg);
            typeof onError === 'function' && onError(ev);
          }}
        />
      }

      {
        // 字符、图标头像
        children && children
      }
    </View>
  );
};

export default Index;
