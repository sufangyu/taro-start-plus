import {
  HomeTwo as originHomeTwo,
  Close as originClose,
  CloseSmall as originCloseSmall,
  VolumeNotice as originVolumeNotice,
  Right as originRight,
} from '@icon-park/svg';

import svg2base64 from './svg2base64';
import { IconProps } from './types';

const HomeTwo = (props: IconProps) => svg2base64(originHomeTwo, props);
const Close = (props: IconProps) => svg2base64(originClose, props);
const CloseSmall = (props: IconProps) => svg2base64(originCloseSmall, props);
const VolumeNotice = (props: IconProps) => svg2base64(originVolumeNotice, props);
const Right = (props: IconProps) => svg2base64(originRight, props);

export {
  HomeTwo,
  Close, 
  CloseSmall,
  VolumeNotice,
  Right,
};
