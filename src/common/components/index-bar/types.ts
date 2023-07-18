import { ReactNode } from 'react';

export interface IndexItem {
  /** 标识 */
  key: (string | number);
  /** title */
  title: (string | number | ReactNode);
  /** 定位/选择提示 */
  toast?: string;
}
