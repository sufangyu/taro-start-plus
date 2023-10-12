/**
 * 价格类型
 */
export type Price = number | string;


/**
 * 价格格式化
 */
export interface PriceFormat {
  /** 整数部分 */
  integer: string;
  /** 小数部分 */
  decimal: string;
}

export interface PriceProps {
  /**
   * 价格数量. 默认 0
   */
  price?: Price;
  /**
   * 价格显示尺寸. 默认 'normal'
   */
  size?: 'large' | 'normal' | 'small';
  /**
   * 是否需要加上 symbol 符号. 默认 true
   */
  needSymbol?: boolean;
  /**
   * 符号类型. 默认 '&yen;'
   */
  symbol?: string;
  /**
   * 符号显示在价格前或者后. 默认 'before'
   */
  position?: 'before' | 'after';
  /**
   * 小数位位数量. 默认 2
   */
  precision?: number;
  /**
   * 是否按照千分号形式显示. 默认 false
   */
  thousands?: boolean;
  /**
   * 是否展示划线价. 默认 false
   */
  strikeThrough?: boolean;
}
