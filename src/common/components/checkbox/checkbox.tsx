import { View } from '@tarojs/components';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

import {
  Check, CheckOne, Round, ReduceOne, 
} from '../icon';

import { CheckboxProps, CheckboxStauts } from './types';
import './index.scss';

const iconSize = 48;
const iconColors = {
  checked: '#004fd4',
  unchecked: '#dcdcdc',
};

const Index = (props: CheckboxProps) => {
  const {
    children,
    label,
    description,
    value,
    icon = 'circle',
    placement = 'left',
    block = true,
    defaultChecked = false,
    disabled = false,
    checked = false,
    isGroup = false,
    checkAll = false,
    checkAllStatus,
    trueLabel = true,
    falseLabel = false,
    onChange,
  } = props;

  const [status, setStatus] = useState<CheckboxStauts>((checked || defaultChecked) ? 'checked' : 'unchecked');

  useEffect(() => {
    // 监听在多选框组时状态后续的更新
    isGroup && setStatus(checked ? 'checked' : 'unchecked');
  }, [checked, checkAll, isGroup]);


  function renderIcon() {
    const isChecked = status === 'checked';
    
    if (typeof icon === 'function') {
      // TODO: 自定义图标
      return '';
    }

    // 全选选项状态
    if (checkAll) {
      switch (checkAllStatus) {
        case 'unchecked':
          return <Round fill={iconColors.unchecked} size={iconSize} />;
        case 'checked':
          return <CheckOne theme="filled" fill={iconColors.checked} size={iconSize} />;
        case 'indeterminate':
          return <ReduceOne theme="filled" fill={iconColors.checked} size={iconSize} />;
        default:
          return '';
      }
    }
    
    switch (icon) {
      case 'check':
        return isChecked
          ? <Check fill={iconColors.checked} size={iconSize} />
          : <Check fill="transparent" size={iconSize} />;
      case 'circle':
        return isChecked
          ? <CheckOne theme="filled" fill={iconColors.checked} size={iconSize} />
          : <Round fill={iconColors.unchecked} size={iconSize} />;
      default:
        return '';
    } 
  }
  
  const rootClasses = classNames({
    checkbox: true,
    [`checkbox--${placement}`]: true,
    'checkbox--disabled': disabled,
    'checkbox--block': block,
  });
  
  return (
    <View 
      className={rootClasses}
      onClick={() => {
        if (disabled) {
          return;
        }

        const isChecked = status === 'checked';
        const nextVal = isChecked ? falseLabel : trueLabel;
        const nextStatus: CheckboxStauts = isChecked ? 'unchecked' : 'checked';

        setStatus(nextStatus);
        typeof onChange === 'function' && onChange(
          checkAll ? nextVal : (value ?? nextVal),
          checkAll,
        );
      }}
    >
      <View className="checkbox__icon">{renderIcon()}</View>
      <View className="checkbox__content">
        <View className="checkbox__label">{children ?? label}</View>
        {description && <View className="checkbox__description">{description}</View>}
      </View>
    </View>
  );
};

export default Index;
