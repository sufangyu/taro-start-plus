/* eslint-disable react-hooks/exhaustive-deps */
import { Input, View } from '@tarojs/components';

import classNames from 'classnames';
import NP from 'number-precision';
import {
  ReactNode, useLayoutEffect, useRef, useState, 
} from 'react';

import { BasicComponent, basicComponentDefaults } from '@/core/types';

import {
  Down, Minus, Plus, Up, 
} from '../icon';

import { InputNumberProps } from './types';
import inputNumberUtil from './util';
import './index.scss';

const Index = (props: InputNumberProps & BasicComponent) => {
  const {
    className,
    style,
    width,
    defaultValue,
    align = 'center',
    min,
    max,
    step = 1,
    stepStrictly = false,
    precision = 0,
    size = 'default',
    disabled = false,
    controls = true,
    controlsPosition = '',
    placeholder = '请输入',
    prefix,
    suffix,
    onChange,
    onBlur,
    onFocus,
  } = {
    ...basicComponentDefaults,
    ...props,
  };

  const initValue = defaultValue?.toFixed(precision);
  const [value, setValue] = useState<string | undefined>(initValue);
  const oldValue = useRef<string | undefined>(initValue);

  // FIX: 当 input 的 type 为 digit 时，无法手动改变 value 的值
  // https://github.com/NervJS/taro/issues/11759
  // 参考: https://juejin.cn/post/7029946995389235237
  useLayoutEffect(() => {
    const rawValue = value ?? '';
    const newValue = inputNumberUtil.getFormatValue({
      rawValue, precision, min, max, step, stepStrictly,
    });
    setValue(newValue);

    typeof onChange === 'function' && onChange(newValue, oldValue.current);
    oldValue.current = newValue;
  }, [value]);
  

  const handleDecrease = () => {
    const newValue = NP.minus(Number(value), step);
    setValue(`${newValue}`);
  };


  const handleIncrease = () => {
    const newValue = NP.plus(Number(value), step);
    setValue(`${newValue}`);
  };

  const renderIcon = (type: 'decrease' | 'increase'): ReactNode => {
    let icon: ReactNode;
    switch (type) {
      case 'decrease':
        // 减
        icon = controlsPosition === 'right' ? <Down fill="#808080" size={28} /> : <Minus fill="#808080" />;
        break;
      case 'increase':
        // 加
        icon = controlsPosition === 'right' ? <Up fill="#808080" size={28} /> : <Plus fill="#808080" />;
        break;
      default:
    }
    return icon;
  };

  const rootClasses = classNames({
    'input-number': true,
    'input-number--disabled': disabled,
    'input-number-controls--hidden': !controls,
    'input-number-controls--right': controlsPosition === 'right',
    [`input-number-size--${size}`]: true,
    [`input-number-align--${align}`]: true,
    [`${className}`]: true,
  });

  const placeholderStyle = {
    small: 'font-size: 12px;',
    default: 'font-size: 14px;',
    large: 'font-size: 16px;',
  };

  return (
    <View className={rootClasses} style={{ width, ...style }}>
      
      {
        controls && (
          <View className="input-number__decrease" onClick={handleDecrease}>
            {renderIcon('decrease')}
          </View>
        )
      }
      <View className="input-number__wrapper">
        {prefix && <View className="input-number__prefix">{prefix}</View>}
        <Input
          className="input-number__input"
          value={value ?? ''}
          controlled
          type={precision > 0 ? 'digit' : 'number'}
          placeholder={placeholder}
          placeholderStyle={`${placeholderStyle[size]}color: #999;`}
          disabled={disabled}
          onFocus={(ev) => {
            typeof onFocus === 'function' && onFocus(ev);
          }}
          onBlur={(ev) => {
            typeof onBlur === 'function' && onBlur(ev);
          }}
          onInput={(ev) => setValue(ev.detail.value)}
        />
        {suffix && <View className="input-number__suffix">{suffix}</View>}
      </View>
      {
        controls && (
          <View className="input-number__increase" onClick={handleIncrease}>
            {renderIcon('increase')}
          </View>
        )
      }
    </View>
  );
};

export default Index;

