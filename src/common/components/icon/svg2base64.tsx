import { Image } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { Icon } from '@icon-park/svg/lib/runtime';
import { ReactNode } from 'react';
import svg64 from 'svg64';

import { IconProps } from './types';

const svg2base64 = (originIcon: Icon, props: IconProps): ReactNode => {
  const { size = 32, className, onClick } = props;
  const base64Data = svg64(originIcon(props));
  
  return (<Image
    src={base64Data}
    className={className}
    style={{
      fontSize: Taro.pxTransform(size),
      width: '1em',
      height: '1em',
      lineHeight: 1,
      display: 'block',
    }}
    mode="widthFix"
    onClick={(ev) => {
      typeof onClick === 'function' && onClick(ev);
    }}
  />);
};

export default svg2base64;
