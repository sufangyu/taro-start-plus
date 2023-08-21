import { ITouchEvent } from '@tarojs/components';

import { ReactNode } from 'react';

/** 内置主题。可选项：info/success/warning/error */
export type NoticeBarTheme = 'info' | 'success' | 'warning' | 'error';

export interface NoticeBarProps {
  /**
   * 通知文本内容
   */
  content: ReactNode;
  /**
   * 是否显示前置内容
   */
  showPrefix?: boolean;
  /**
   * 左侧广播图标
   */
  icon?: ReactNode;
  /**
   * 额外操作区域，显示在关闭按钮左侧
   */
  extra?: ReactNode;
  /**
   * 通知栏模式，可选值为 closeable link
   */
  mode?: 'link' | 'closeable';
  /**
   * 内置主题。可选项：info/success/warning/error
   */
  theme?: NoticeBarTheme;
  /**
   * 通知文本颜色
   */
  color?: string;
  /**
   * 滚动条背景
   */
  background?: string;
  /**
   * 动画延迟时间，单位 ms. 默认 1
   */
  delay?: number;
  /**
   * 滚动速率 (px/s)。默认 60
   */
  speed?: number;
  /**
   * 是否开启滚动播放，内容长度溢出时默认开启
   */
  scrollable?: boolean;
  /**
   * 是否开启文本换行，只在禁用滚动时生效
   */
  wrapable?: boolean;
  /**
   * 点击通知栏时触发
   * @returns 
   */
  onClick?: (ev: ITouchEvent) => void;
  /**
   * 关闭通知栏时触发
   * @returns 
   */
  onClose?: (ev: ITouchEvent) => void;
}
