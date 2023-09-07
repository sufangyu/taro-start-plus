import { View } from '@tarojs/components';

import classNames from 'classnames';
import { useState } from 'react';

import Radio from './radio';
import { RadioGroupProps, RadioValue } from './types';

import './index.scss';

const Index = (props: RadioGroupProps) => {
  const {
    children = [],
    defaultValue,
    block = true,
    disabled: disabledGroup,
    theme = 'default',
    onChange, 
  } = props;

  const [groupValue, setGroupValue] = useState<RadioValue>(defaultValue);

  const rootClasses = classNames({
    'radio-group': true,
    'radio-group--inline': !block,
    'radio-group--card': theme === 'card',
  });

  return (
    <View className={rootClasses}>
      {
        children.map((child, idx) => {
          const {
            children: radoiChildren,
            label,
            description,
            value,
            icon,
            disabled,
            placement,
          } = child.props;

          return (
            <Radio
              key={idx}
              isGroup
              label={label}
              description={description}
              icon={icon}
              placement={placement}
              block={block}
              disabled={disabled || disabledGroup}
              checked={value === groupValue}
              value={value}
              onChange={(val) => {
                setGroupValue(val);
                typeof onChange === 'function' && onChange(val);
              }}
            >
              {radoiChildren}
            </Radio>
          );
        })
      }
    </View>
  );
};

export default Index;
