import { Image } from '@tarojs/components';

import { Icon } from '@icon-park/svg/lib/runtime';
import { ReactNode } from 'react';
import svg64 from 'svg64';

import { IconProps } from './types';

const svg2base64 = (originIcon: Icon, props: IconProps): ReactNode => {
  const { size = 32 } = props;
  const base64Data = svg64(originIcon(props));
  
  return (<Image
    src={base64Data}
    style={{
      fontSize: size,
      width: '1em',
      height: '1em',
    }}
    mode="widthFix"
  />);
};

export default svg2base64;
