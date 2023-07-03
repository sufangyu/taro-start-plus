// import { ButtonProps } from "@tarojs/components";

type 	OpenType = 'contact'
  | 'share'
  | 'getPhoneNumber'
  // | 'getRealtimePhoneNumber'
  | 'getUserInfo'
  | 'launchApp'
  | 'openSetting'
  | 'feedback'
  | 'chooseAvatar';


export interface Action {
  /** 标题 */
  name?: string;
  /** 二级标题 */
  subname?: string;
  /** 选项文字颜色 */
  color?: string;
  /** 是否为禁用状态 */
  disabled?: boolean;
  /** 开放能力，具体支持可参考: https://developers.weixin.qq.com/miniprogram/dev/component/button.html */
  openType?: OpenType;
}