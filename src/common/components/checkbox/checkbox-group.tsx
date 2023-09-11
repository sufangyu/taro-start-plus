import { View } from '@tarojs/components';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

import Checkbox from './checkbox';
import { CheboxkGroupProps, CheckAllStatus, CheckboxGroupValues } from './types';
import './index.scss';

const Index = (props: CheboxkGroupProps) => {
  const {
    children = [],
    defaultValues = [],
    block = true,
    disabled: disabledGroup,
    theme = 'default',
    onChange, 
  } = props;

  const [groupValues, setGroupValues] = useState<CheckboxGroupValues>(defaultValues);
  const [checkAllStatus, setCheckAllStatus] = useState<CheckAllStatus>('unchecked');
  const allValues = children
    .filter(it => !it.props.checkAll)
    .map(it => it.props.value) as CheckboxGroupValues;

  useEffect(() => {
    // 全选状态
    if (groupValues.length === 0) {
      setCheckAllStatus('unchecked');
    } else if (groupValues.length === allValues.length) {
      setCheckAllStatus('checked');
    } else {
      setCheckAllStatus('indeterminate');
    }

    setGroupValues(defaultValues);
  }, [groupValues, allValues, defaultValues]);


  const rootClasses = classNames({
    'checkbox-group': true,
    'checkbox-group--inline': !block,
    'checkbox-group--card': theme === 'card',
  });

  return (
    <View className={rootClasses}>
      {
        children.map((child, idx) => {
          const {
            children: checkboxChildren,
            label,
            description,
            value = '',
            icon,
            checkAll,
            disabled,
            placement,
          } = child.props;

          return (
            <Checkbox
              key={idx}
              label={label}
              description={description}
              icon={icon}
              placement={placement}
              block={block}
              isGroup
              checkAll={checkAll}
              checkAllStatus={checkAllStatus}
              disabled={disabled || disabledGroup}
              checked={groupValues.includes(value as 'string | number')}
              value={value}
              onChange={(val: string | number, isCheckAll: boolean) => {
                const index = groupValues.findIndex(it => it === val);
                let nextValues: CheckboxGroupValues = index !== -1
                  ? groupValues.filter(it => it !== val)
                  : [...groupValues, val];
                
                // 全选选项处理
                if (isCheckAll) {
                  nextValues = groupValues.length === allValues.length ? [] : [...allValues];
                }
               
                setGroupValues(nextValues);
                typeof onChange === 'function' && onChange(nextValues);
              }}
            >
              {checkboxChildren}
            </Checkbox>
          );
        })
      }
    </View>
  );
};

export default Index;
