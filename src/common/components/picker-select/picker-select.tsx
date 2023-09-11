import { View } from '@tarojs/components';

import { ReactNode, useEffect, useState } from 'react';

import { Checkbox, CheckboxGroup } from '../checkbox';
import { Popup } from '../popup';
import { Radio, RadioGroup } from '../radio';

import { PickerSelectProps, optionValue } from './types';


const Index = (props: PickerSelectProps) => {
  const {
    children, title, conformText = '确定',
    type = 'radio', options, defaultValues,
    onCancel, onConform, 
  } = props;

  const [visible, setVisible] = useState(false);
  const [groupValues, setGroupValues] = useState(defaultValues ?? []);


  useEffect(() => {
    setGroupValues([...defaultValues]);
  }, [defaultValues]);

  function renderContent(): ReactNode {
    switch (type) {
      case 'radio':
        return (
          <RadioGroup
            defaultValue={groupValues[0]}
            onChange={(value: optionValue) => setGroupValues([value])}
          >
            {
              options.map((option) => (
                <Radio
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  checked={groupValues.includes(option.value!)}
                />
              ))
            }
          </RadioGroup>
        );
      case 'checkbox': 
        return (
          <CheckboxGroup
            defaultValues={groupValues}
            onChange={(values) => setGroupValues([...values])}
          >
            {
              options.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  checkAll={option.checkAll}
                  checked={groupValues.includes(option.value!)}
                />
              ))
            }
          </CheckboxGroup>
        );
      default:
    }

    return '';
  }

  return (
    <>
      <Popup
        visible={visible}
        position="bottom"
        title={title}
        round
        simple
        closeable
        closeIconPosition="top-left"
        extra={
          <View
            style={{ color: '#2151d1' }}
            onClick={() => {
              setVisible(false);
              setGroupValues([...defaultValues]);
              const cbData = type === 'radio' ? groupValues[0] : [...groupValues];
              typeof onConform === 'function' && onConform(cbData);
            }}
          >{conformText}
          </View>
        }
        onClosed={() => {
          setVisible(false);
          setGroupValues([...defaultValues]);
          typeof onCancel === 'function' && onCancel();
        }}
      >
        {renderContent()}
      </Popup>

      <View style={{ width: '100%' }} onClick={() => setVisible(true)}>{children}</View>
    </>
  );
};

export default Index;
