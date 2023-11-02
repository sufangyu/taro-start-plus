/**
 * 键盘类型
 * 
 * - ZH: 中文
 * - EN: 数字 & 英文
 */
export type KeyboardType = 'ZH' | 'EN';

/**
 * 按键
 */
export interface Key {
  type: 'normal' | 'backspace' | 'toggle';
  value: string;
}

/**
 * 每行按键列表
 */
export type KeyRow = Key[];


export interface CarNumberKeyboardProps {
  /**
   * 键盘是否显示. 默认 false
   */
  visible?: boolean;
  /**
   * 是否震动. 默认 true
   */
  vibrate?: boolean;
  /**
   * 是否显示遮罩层. 默认 false
   */
  overlay?: boolean;
  /**
   * 关闭文案. 默认 '完成'
   */
  closeText?: string;
  /**
   * 禁用的字符列表. 默认 ['I', 'O']
   */
  disableChars?: string[];
  /**
   * 键盘类型. 默认 'ZH'
   */
  type?: KeyboardType;
  /**
   * 输入回调函数
   * @param val 输入值
   * @returns 
   */
  onInput?: (val: string) => void;
  /**
   * 删除回调函数
   * @returns 
   */
  onDelete?: () => void;
  /**
   * 切换键盘类型
   * @param keyboardType 键盘类型
   * @returns 
   */
  onToggle?: (keyboardType: KeyboardType) => void;
  /**
   * 关闭回调函数
   * @returns 
   */
  onClose?: () => void;
}
