export interface NumberKeyboardProps {
  /**
   * 是否展示. 默认 false
   */
  visible?: boolean;
  /**
   * 完成按钮文案，null 不展示. 默认 null
   */
  confirmText?: string | null;
  /**
   * 是否在点击确定按钮时自动关闭. 默认 true
   */
  closeOnConfirm?: boolean;
  /**
   * 自定义按钮
   */
  customKey?: string | [string, string];
  /**
   * 是否乱序键盘. 默认 false
   */
  randomOrder?: boolean;
  /**
   * 是否展示收起键盘箭头. 默认 true
   */
  showCloseButton?: boolean;
  /**
   * 键盘标题
   */
  title?: string;
  /**
   * 点击关闭时触发
   * @returns
   */
  onClose?: () => void;
  /**
   * 点击确定按钮时触发
   * @returns 
   */
  onConfirm?: () => void;
  /**
   * 删除内容回调
   * @returns 
   */
  onDelete?: () => void;
  /**
   * 输入内容回调
   * @param v 当前字符
   * @returns 
   */
  onInput?: (v: string) => void;
}
