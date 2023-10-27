const inputNumberUtil = {
  /**
   * 处理小数点长度
   *
   * @param {(number | string)} rawValue 原值
   * @param {number} [precision=0] 小数点长度
   * @return {*}  {string}
   */
  toPrecision(rawValue: number | string, precision: number = 0): string {
    return Number(rawValue).toFixed(precision);
  },
  /**
   * 获取控制输入的正则限制
   *
   * @param {boolean} isInteger 是否整数（整数、整数+小数）
   * @param {boolean} isMinus 是否负数（）
   * @return {*}  {RegExp}
   */
  getRegexp(isInteger: boolean, isMinus: boolean): RegExp {
    const key = `${!!isInteger}-${!!isMinus}`;
    const map: Record<string, RegExp> = {
    // 组合总共以下四种情况
      'true-true': /[^0-9\\-]/g, // 正负整数
      'true-false': /[^0-9]/g, // 正整数
      'false-true': /[^0-9\\.-]/g, // 正负数（含整数和小数）
      'false-false': /[^0-9\\.]/g, // 正数（含整数和小数）
    };
    return map[key];
  },
  /**
   * 处理负数
   * @param rawValue 原始值
   * 
   * ```ts
   * // 处理情况
   * -0 => 0
   * - -- => -
   * -1.0-- => -1.0
   * --1.0-- => -1.0
   * ```
   */
  formatMinus(rawValue: string): string {
    let currentValue = rawValue;
  
    if (currentValue === '-0') {
      currentValue = '0';
    }

    const symbolStr = '-';
    if (currentValue !== symbolStr) {
      // 处理中间字符多余负数的负号
      const currentValueArr = currentValue.split(symbolStr);
      const nextValue = currentValueArr.join('');
      currentValue = currentValue.startsWith(symbolStr) ? `-${nextValue}` : nextValue;
    }
    
    return currentValue;
  },
  /**
   * 处理小数位
   *
   * @param {string} rawValue 原始值
   * @param {number} [precision=0] 小数位
   * @return {*}  {string}
   */
  formatDecimal(rawValue: string, precision: number = 0): string {
    let currentValue = rawValue;

    if (!rawValue || precision <= 0) {
      return currentValue;
    }
    
    // 处理开始结束字符是小数点
    if (currentValue.startsWith('.')) {
      currentValue = currentValue.slice(1);
    }
    if (currentValue.endsWith('.')) {
      currentValue = currentValue.slice(0, -1);
    }

    if (currentValue.includes('.')) {
      // 处理多余小数点
      const [firstValue, ...otherValue] = currentValue.split('.');
      currentValue = `${firstValue}.${otherValue.join('')}`;
    }
    return inputNumberUtil.toPrecision(currentValue, precision);
  },
  /**
   * 强制值是步长的倍数
   *
   * @param {string} rawValue
   * @param {number} step
   * @param {number} [precision=0]
   * @return {*}  {string}
   */
  formatStepStrictly(rawValue: string, step: number, precision: number = 0): string {
    let currentValue = rawValue;
    const mod = Number(currentValue) % step;
    // [value: 1, step: 0.2] 1.9 => 1.8
    if (mod !== 0) {
      currentValue = inputNumberUtil.toPrecision(
        (Math.round(Number(currentValue) / step) * step),
        precision,
      );
    }
    
    return inputNumberUtil.toPrecision(currentValue, precision);
  },
  /**
   * 获取处理后的值
   *
   * @param {({
   *     rawValue: string; 原始值
   *     precision: number; 小数位
   *     min: number | undefined; 最大值
   *     max: number | undefined; 最小值
   *     step: number; 数值改变步数
   *     stepStrictly: boolean; 是否只能输入 step 的倍数
   *   })} data
   * @return {*}  {string}
   */
  getFormatValue(data:{
    rawValue: string;
    precision: number;
    min: number | undefined;
    max: number | undefined;
    step: number;
    stepStrictly: boolean;
  }): string {
    const {
      rawValue, precision = 0, min, max, step = 1, stepStrictly = false, 
    } = data;
    const isInteger = precision === 0;
    const isMinus = true;
    const regexp = inputNumberUtil.getRegexp(isInteger, isMinus);
    let currentValue = rawValue
      .replace(regexp, '')
      .replace(/\.{2,}/g, '.') // 连续小数点只能保留一个
      .replace(/-{2,}/g, '-') // 连续负号只能保留一个
      .replace(/(\.\d{1,2})(.*)$/g, '$1') // 1.12.12312 => 1.12 || .12.32 => .12
      .replace(/^(-?)\./, '$10.') // 以 . 或 -. 开头的 => 0. || -. => -0.
      .replace(/^(-?)0([0-9]+)/, '$1$2'); // 正负整数部分不能以0开头

    // 处理小数点
    if (precision > 0) {
      currentValue = inputNumberUtil.formatDecimal(currentValue, precision);
    }

    // 处理负数
    if (isMinus) {
      currentValue = inputNumberUtil.formatMinus(currentValue);
    }


    // 处理最小、最大边界值
    if (min !== undefined && Number(currentValue) < min) {
      currentValue = inputNumberUtil.toPrecision(min, precision);
    }
    if (max !== undefined && Number(currentValue) > max) {
      currentValue = inputNumberUtil.toPrecision(max, precision);
    }

    // 处理是否只能输入 step 的倍数
    if (stepStrictly) {
      currentValue = inputNumberUtil.formatStepStrictly(currentValue, step, precision);
    }
  
    // console.log('getFormatValue =>>', rawValue, currentValue);
    return currentValue;
  },
};


export default inputNumberUtil;
