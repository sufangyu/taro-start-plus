import { Button, View } from '@tarojs/components';

import { useRef } from 'react';

import { DropdownItem, DropdownOption } from './types';

import './index.scss';


interface Props extends DropdownItem {
  /**
   * 选择选项回调
   * @param idx 
   * @returns 
   */
  onChange?: (idx: number, values?: (number | string)[]) => void;
  /**
   * 重置回调
   * @param values 
   * @returns 
   */
  onReset?: (values: (number | string)[]) => void;
  /**
   * 确认回调
   * @param values 
   * @returns 
   */
  onConfirm?: (values: (number | string)[]) => void;
}

const Item = (props: Props) => {
  const {
    multiple = false, optionsColumns = 1, options = [], value,
    onChange, onReset, onConfirm,
  } = props;

  const selectValues = useRef<(number | string)[]>(
    multiple ? value as [] : [value as number | string],
  );

  /**
   * 改变/选择选项
   * @param option 选项
   * @param index 序号
   */
  const handleChange = (option: DropdownOption, index: number) => {
    const isExisted = selectValues.current.some(it => it === option.value);

    if (isExisted) {
      selectValues.current = selectValues.current.filter(it => it !== option.value);
    } else {
      selectValues.current = selectValues.current.concat(option.value);
    }

    typeof onChange === 'function' && onChange(index, selectValues.current);
  };

  const handleFooterActions = (action: 'reset' | 'confirm') => {
    switch (action) {
      case 'reset':
        selectValues.current = [];
        typeof onReset === 'function' && onReset(selectValues.current);
        break;
      case 'confirm':
        typeof onConfirm === 'function' && onConfirm(selectValues.current);
        break;
      default:
    }
  };


  const renderContent = () => {
    if (multiple) {
      // 多选（1、2、3列）
      return (
        <>
          <View
            className={`dropdown-item__checkbox-group columns-${optionsColumns}`}
          >
            {
            options.map((option, idx) => {
              return (
                <View 
                  key={`dropdown-item-checkbox-${idx}`}
                  className={
                    `
                    dropdown-item__checkbox
                    ${selectValues.current.includes(option.value) ? 'active' : ''}
                    ${option.disabled ? 'disabled' : ''}
                    `
                  }
                  onClick={() => {
                    if (option.disabled) {
                      return;
                    }

                    handleChange(option, idx);
                  }}
                >
                  {option.text}
                </View>
              );
            })
          }
          </View>
          <View className="dropdown-item__footer">
            <Button
              className={`button--light ${selectValues.current.length === 0 ? 'disabled' : ''}`}
              onClick={() => handleFooterActions('reset')}
            >
              重置
            </Button>
            <Button 
              className={`button--primary ${selectValues.current.length === 0 ? 'disabled' : ''}`}
              onClick={() => handleFooterActions('confirm')}
            >
              确认
            </Button>
          </View>
        </>
      );
    }
    
    return options.map((option, idx) => {
      return (
        <View 
          className={`
            dropdown-item__option
            ${option.value === value ? 'active' : ''}
            ${option.disabled ? 'disabled' : ''}
          `}
          key={`option-${idx}`}
          onClick={() => {
            if (option.disabled) {
              return;
            }
            
            typeof onChange === 'function' && onChange(idx);
          }}
        >
          <View className="option-value" />
          <View className="option-title">{option.text}</View>
        </View>
      );
    });
  };

  return (
    <View className="dropdown-item">
      {renderContent()}
    </View>
  );
};

export default Item;
