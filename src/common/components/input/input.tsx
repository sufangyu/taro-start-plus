/* eslint-disable react/jsx-props-no-spreading */
import {
  View, Input, type InputProps, BaseEventOrig, 
} from '@tarojs/components';

import { useState } from 'react';

import { CloseOne } from '../icon';

import './index.scss';


interface Props extends InputProps {
  /**
   * 是否可以清除输入框值
   */
  clearable?: boolean;
}

const Index = (props: Props) => {
  const {
    value, clearable, onInput, onFocus, onBlur, 
  } = props;
  const [focus, setFocus] = useState(false);

  return (
    <View className="input-wrapper">
      <Input
        value={value}
        {...props}
        onFocus={(ev) => {
          setFocus(true);
          typeof onFocus === 'function' && onFocus(ev);
        }}
        onBlur={(ev) => {
          setFocus(false);
          typeof onBlur === 'function' && onBlur(ev);
        }}
      />

      {
        (clearable && focus && value) && (
          <View
            className="icon-clear"
            onTouchStart={() => {
              typeof onInput === 'function' && onInput({
                detail: { value: '' },
              } as BaseEventOrig<InputProps.inputEventDetail>);
            }}
          >
            <CloseOne theme="filled" fill="#999" />
          </View>
        )
      }
      
    </View>
  );
};

export default Index;
