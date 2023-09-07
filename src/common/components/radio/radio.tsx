import { View } from '@tarojs/components';

import classNames from 'classnames';
import { useState } from 'react';

import {
  Check, CheckOne, Round, RadioTwo, 
} from '../icon';

import { RadioProps, RadioStauts } from './types';
import './index.scss';


const iconSize = 48;
const iconColors = {
  checked: '#004fd4',
  unchecked: '#dcdcdc',
};


const Index = (props: RadioProps) => {
  const {
    children,
    label,
    description,
    value,
    icon = 'circle',
    placement = 'left',
    block = true,
    disabled = false,
    uncheck = false,
    checked = false,
    isGroup = false,
    defaultChecked = false,
    trueLabel = true,
    falseLabel = false,
    onChange,
  } = props;

  const [status, setStatus] = useState<RadioStauts>((checked || defaultChecked) ? 'checked' : 'unchecked');


  function renderIcon() {
    const iconStatus = isGroup ? checked : status === 'checked';
    
    if (typeof icon === 'function') {
      // TODO: 自定义图标
      return '';
    }

    switch (icon) {
      case 'check':
        return iconStatus
          ? <Check fill={iconColors.checked} size={iconSize} />
          : <Check fill="transparent" size={iconSize} />;
      case 'circle':
        return iconStatus
          ? <CheckOne theme="filled" fill={iconColors.checked} size={iconSize} />
          : <Round fill={iconColors.unchecked} size={iconSize} />;
      case 'dot':
        return iconStatus
          ? <RadioTwo theme="filled" fill={iconColors.checked} size={iconSize} />
          : <Round fill={iconColors.unchecked} size={iconSize} />;
      default:
        return '';
    }
  }


  const rootClasses = classNames({
    radio: true,
    [`radio--${placement}`]: true,
    'radio--disabled': disabled,
    'radio--block': block,
  });
  

  return (
    <View
      className={rootClasses}
      onClick={() => {
        if (disabled) {
          return;
        }

        const isChecked = status === 'checked';
        const nextVal = uncheck 
          ? (isChecked ? falseLabel : trueLabel)
          : trueLabel;
        const nextStatus: RadioStauts = uncheck
          ? (isChecked ? 'unchecked' : 'checked')
          : 'checked';

        setStatus(nextStatus);
        typeof onChange === 'function' && onChange(value ?? nextVal);
      }}
    >
      <View className="radio__icon">{renderIcon()}</View>
      <View className="radio__content">
        <View className="radio__label">{children ?? label}</View>
        {description && <View className="radio__description">{description}</View>}
      </View>
    </View>
  );
};

export default Index;
