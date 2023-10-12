import { View } from '@tarojs/components';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { BasicComponent, basicComponentDefaults } from '@/core/types';

import { Price, PriceFormat, PriceProps } from './types';
import './index.scss';

const Index = (props: PriceProps & BasicComponent) => {
  const {
    style,
    className,
    price = 0,
    size = 'normal',
    needSymbol = true,
    symbol = '&yen;',
    position = 'before',
    precision = 2,
    thousands = false,
    strikeThrough = false,
  } = {
    ...basicComponentDefaults,
    ...props,
  };

  const [priceInteger, setPriceInteger] = useState('');
  const [priceDecimal, setPriceDecimal] = useState('');


  /**
   * 格式化价格的整数位、小数位
   * @param priceRaw 原始价格
   * @param digits 小数位数
   * @param isThousands 是否格式化千位数
   * @demo
   * ```ts
   *  formatPrice(0); // {integer: '0', decimal: ''}
   *  formatPrice(0, 2); // {integer: '0', decimal: '00'}
   *  formatPrice(15213.1221, 0); // {integer: '15213', decimal: ''}
   *  formatPrice(15213.1221, 1); // {integer: '15213', decimal: '1'}
   *  formatPrice(15213.1221, 2); // {integer: '15213, decimal: '12'}
   *  formatPrice(88888, 2); // {integer: '88888', decimal: '00'}
   *  formatPrice(6666.000, 0); // {integer: '6666', decimal: ''}
   *  formatPrice(6666.000, 1); // {integer: '6666', decimal: '0'}
   * ```
   * @returns 
   */
  const formatPrice = (priceRaw: Price, digits = 0, isThousands = false): PriceFormat => {
    const result: PriceFormat = {
      integer: '',
      decimal: '',
    };

    let priceNum = Number(priceRaw);
    // 兼容处理无法格式化成数字的情况
    if (Number.isNaN(priceNum)) {
      console.warn(`价格${priceRaw}无法格式化成数字, 初始化值为0`);
      priceNum = Number('0');
    }
    const priceStr = priceNum.toFixed(digits);
    const [integer, decimal = ''] = priceStr.split('.');
    
    result.integer = isThousands ? integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : integer;
    result.decimal = decimal;
    // console.log(`
    //   ${priceRaw}格式${digits}位小数结果 => 整数位: ${result.integer}, 小数位: ${result.decimal}
    // `);
    
    return result;
  };

  useEffect(() => {
    const result = formatPrice(price, precision, thousands);
    setPriceDecimal(result.decimal);
    setPriceInteger(result.integer);
  }, [precision, thousands, price]);


  /**
   * 特殊符号转换
   * @param url 
   * @returns 
   */
  const replaceSpecialChar = (symbolStr: string) => {
    let result: string;
    result = symbolStr.replace(/&quot;/g, '"');
    result = result.replace(/&amp;/g, '&');
    result = result.replace(/&lt;/g, '<');
    result = result.replace(/&gt;/g, '>');
    result = result.replace(/&nbsp;/g, ' ');
    result = result.replace(/&yen;/g, '￥');
    return result;
  };
  
  const getShowSymbol = () => {
    return { __html: symbol ? replaceSpecialChar(symbol) : '' };
  };
  
  const renderSymbol = () => {
    return (
      <View
        className={`price-symbol price-symbol--${size}`}
        dangerouslySetInnerHTML={getShowSymbol()}
      />
    );
  };


  const rootClasses = classNames({
    price: true,
    [`${className}`]: className,
    'price--strike': strikeThrough,
  });
  
  return (
    <View className={rootClasses} style={style}>
      {(needSymbol && symbol && position === 'before') ? renderSymbol() : null}

      <View data-desc="整数部分" className={`price-integer price-integer--${size}`}>
        {priceInteger}
      </View>

      { 
        precision !== 0 && (
          <>
            <View data-desc="小数点" className={`price-decimal price-decimal--${size}`}>.</View>
            <View data-desc="小数部分" className={`price-decimal price-decimal--${size}`}>
              {priceDecimal}
            </View>
          </>
        )
      }

      {(needSymbol && symbol && position === 'after') ? renderSymbol() : null}

      {
        strikeThrough && <View
          className="price-line"
          style={{
            backgroundColor: style?.color,
          }}
        />
      }
    </View>
  );
};

export default Index;
