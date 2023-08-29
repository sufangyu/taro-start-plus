import {
  HomeTwo as originHomeTwo,
  Close as originClose,
  CloseSmall as originCloseSmall,
  VolumeNotice as originVolumeNotice,
  Right as originRight,
  Light as originLeft,
  Up as originUp,
  Down as originDown,
} from '@icon-park/svg';

import svg2base64 from './svg2base64';
import { IconProps } from './types';

const HomeTwo = (props: IconProps) => svg2base64(originHomeTwo, props);
const Close = (props: IconProps) => svg2base64(originClose, props);
const CloseSmall = (props: IconProps) => svg2base64(originCloseSmall, props);
const VolumeNotice = (props: IconProps) => svg2base64(originVolumeNotice, props);
const Right = (props: IconProps) => svg2base64(originRight, props);
const Left = (props: IconProps) => svg2base64(originLeft, props);
const Up = (props: IconProps) => svg2base64(originUp, props);
const Down = (props: IconProps) => svg2base64(originDown, props);

export {
  HomeTwo,
  Close, 
  CloseSmall,
  VolumeNotice,
  Right,
  Left,
  Up,
  Down,
};
