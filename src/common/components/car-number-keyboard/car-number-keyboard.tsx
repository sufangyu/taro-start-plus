import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';

import { DeleteTwo } from '../icon';
import { Popup } from '../popup';

import {
  CarNumberKeyboardProps, Key, KeyRow, KeyboardType, 
} from './types';

import './index.scss';


// 车牌规则
// - 大陆车牌: 首字母必须为汉字 蓝牌7位，新能源8位
// - 港澳车牌: 2~6位 全部可输入为字母或数字

const keyboardEnChar = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
const keyboardZhChar = '京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新使领警学港澳';

const Index = (props: CarNumberKeyboardProps) => {
  const {
    visible = false,
    vibrate = true,
    overlay = false,
    closeText = '完成',
    disableChars = ['I', 'O'],
    type = 'ZH',
    onInput,
    onDelete,
    onToggle,
    onClose,
  } = props;

  const [show, setShow] = useState(visible);
  const [disableChar] = useState(disableChars);
  const [keyboardType, setKeyboardType] = useState<KeyboardType>(type);

  const [keyList, setKeyList] = useState<KeyRow[]>([]);

  // 初始化键盘
  const initKeyList = (curKeyboardType: KeyboardType) => {
    const resultKeyList: KeyRow[] = [];
    let firstRow: KeyRow = [];
    let secondRow: KeyRow = [];
    let thereRow: KeyRow = [];
    let fourRow: KeyRow = [];

    if (curKeyboardType === 'ZH') {
      firstRow = keyboardZhChar.split('').slice(0, 10).map(val => ({ type: 'normal', value: val }));
      secondRow = keyboardZhChar.split('').slice(10, 20).map(val => ({ type: 'normal', value: val }));
      thereRow = keyboardZhChar.split('').slice(20, 30).map(val => ({ type: 'normal', value: val }));
      fourRow = keyboardZhChar.split('').slice(30, 37).map(val => ({ type: 'normal', value: val }));
      fourRow.push({ type: 'backspace', value: 'BACKSPACE' });
      fourRow.unshift({ type: 'toggle', value: 'ABC' });
      resultKeyList.push(firstRow, secondRow, thereRow, fourRow);
    } else if (curKeyboardType === 'EN') {
      firstRow = keyboardEnChar.split('').slice(0, 10).map(val => ({ type: 'normal', value: val }));
      secondRow = keyboardEnChar.split('').slice(10, 20).map(val => ({ type: 'normal', value: val }));
      thereRow = keyboardEnChar.split('').slice(20, 29).map(val => ({ type: 'normal', value: val }));
      fourRow = keyboardEnChar.split('').slice(29, 36).map(val => ({ type: 'normal', value: val }));
      fourRow.push({ type: 'backspace', value: 'BACKSPACE' });
      fourRow.unshift({ type: 'toggle', value: '中文' });
      resultKeyList.push(firstRow, secondRow, thereRow, fourRow);
    }

    setKeyList([...resultKeyList]);
  };

  const handleKeyPress = (key: Key) => {
    if (disableChar.includes(key.value)) {
      return;
    }

    // 震动
    if (vibrate) {
      Taro.vibrateShort({
        type: 'light',
      });
    }
    
    switch (key.type) {
      case 'normal':
        typeof onInput === 'function' && onInput(key.value);
        break;
      case 'backspace':
        typeof onDelete === 'function' && onDelete();
        break;
      case 'toggle':
        // eslint-disable-next-line no-case-declarations
        const nextKeyboardType = keyboardType === 'ZH' ? 'EN' : 'ZH';
        setKeyboardType(nextKeyboardType);
        // initKeyList(nextKeyboardType);
        typeof onToggle === 'function' && onToggle(nextKeyboardType);
        break;
      default:
    }
  };

  const handleClose = () => {
    setShow(false);

    typeof onClose === 'function' && onClose();
  };

  useEffect(() => {
    // console.log('visible, type', visible, type);
    setShow(visible);
    setKeyboardType(type);
    initKeyList(type);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, type]);

  const renderKeyboard = (): ReactNode => {
    return keyList.map((keys, rowIndex) => {
      return (
        <View className="key-row" key={`row-${rowIndex}`}>
          {
            keys.map((key, columnIndex) => {
              return (
                <View
                  className={classNames('key', {
                    key__toggle: key.type === 'toggle',
                    key__backspace: key.type === 'backspace',
                    'key--disabled': disableChar.includes(key.value),
                  })}
                  key={`${rowIndex}-${columnIndex}`}
                  onClick={() => handleKeyPress(key)}
                >
                  {key.type === 'backspace' ? <DeleteTwo fill="#333" size={40} /> : key.value}
                </View>
              );
            })
          }
        </View>
      );
    });
  };
  
  
  return (
    <Popup
      visible={show}
      overlay={overlay}
      position="bottom"
      simple
    >
      <View className="car-number-keyboard">
        <View
          className="car-number-keyboard__header"
          onClick={() => handleClose()}
        >
          {closeText}
        </View>
        <View className="car-number-keyboard__body">
          {renderKeyboard()}
        </View>
      </View>
    </Popup>
  );
};

export default Index;
