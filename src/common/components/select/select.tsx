import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useEffect, useState } from 'react';

import { Check } from '../icon';

import { SelectOption, SelectProps, SelectValue } from './types';
import './index.scss';

const Index = (props: SelectProps) => {
  const {
    options = [], values = [], multiple = false, size = 'normal', readOnly = false,
    layout = 'vertical', columnNum = 3, disabled = false, onChange, 
  } = props;

  const [selectValues, setSelectValues] = useState<SelectValue[]>(values);
  
  useEffect(() => {
    setSelectValues(values);
  }, [values]);

  const handleSelect = (option: SelectOption) => {
    let newSelectValues: SelectValue[];
    const isExited = selectValues.some(value => value === option.value);

    if (multiple) {
      // 多选
      if (isExited) {
        newSelectValues = selectValues.filter(value => value !== option.value);
      } else {
        newSelectValues = [...selectValues, option.value];
      }
    } else {
      // 单选
      newSelectValues = isExited ? [] : [option.value];
    }
    setSelectValues(newSelectValues);

    const cbData = multiple ? newSelectValues : newSelectValues[0];
    typeof onChange === 'function' && onChange(cbData);
  };

  // 横向布局每列的宽度基准
  const flexBasis = 100 / columnNum;
  const space = Taro.pxTransform(24);
  const isHorizontal = layout === 'horizontal';

  return (
    <View className="select-wrapper">
      <View
        className={`select select--${layout} select--${size}`}
        style={{
          marginLeft: isHorizontal ? `-${space}` : '',
          marginRight: isHorizontal ? `-${space}` : '',
        }}
      >
        {
          options.map((option, index) => {
            const isSelected = selectValues.includes(option.value);
            return (
              <View 
                style={{
                  flexBasis: `${flexBasis}%`,
                  // paddingRight: (index + 1) % columnNum !== 0 ? space : '',
                  paddingTop: (index + 1) > columnNum ? space : '',
                }}
                className={
                  [
                    'select-item',
                    `${(disabled || option.disabled) ? 'select-item--disabled' : ''}`,
                    `${isSelected ? 'select-item--selected' : ''}`,
                  ].join(' ')
                }
                key={option.value}
                onClick={() => {
                  if (disabled || option.disabled || readOnly) {
                    return;
                  }

                  handleSelect(option);
                }}
              >
                <View className="select-item__content">
                  {
                  isSelected && (
                    <View className="select-item__icon">
                      <Check fill="#fff" size={24} />
                    </View>
                  )
                }
                  <View className="select-item__title">{option.label}</View>
                  {option.description && <View className="select-item__description">{option.description}</View>}
                </View>
              </View>
            );
          })
        }
      </View>
    </View>
  );
};

export default Index;
