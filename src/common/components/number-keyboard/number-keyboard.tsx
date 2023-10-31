import { ITouchEvent, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';

import { arrayUtil } from '@/core/utils';

import { DeleteTwo, Down } from '../icon';
import { Popup } from '../popup';

import { NumberKeyboardProps } from './types';
import './index.scss';


const Index = (props: NumberKeyboardProps) => {
  const {
    visible = false,
    overlay = true,
    overlayBgColor,
    vibrate = true,
    confirmText,
    closeOnConfirm = true,
    customKey,
    randomOrder = false,
    showCloseButton = true,
    title,
    onClose,
    onConfirm,
    onDelete,
    onInput,
  } = props;

  const keys = useMemo(() => {
    const defaultKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const keyList = randomOrder ? arrayUtil.shuffle(defaultKeys) : defaultKeys;
    const customKeys = Array.isArray(customKey) ? customKey : [customKey];

    keyList.push('0');

    // 补充自定义键盘在 0 左右侧
    if (confirmText) {
      if (customKeys.length === 2) {
        keyList.splice(9, 0, customKeys?.pop() || '');
      }
      keyList.push(customKeys[0] || '');
    } else {
      keyList.splice(9, 0, customKeys[0] || '');
      keyList.push(customKeys[1] || 'BACKSPACE');      
    }

    return keyList;
  }, [confirmText, customKey, randomOrder]);


  const handleKeyPress = (ev: ITouchEvent, key: string) => {
    ev.preventDefault();

    if (key !== '' && vibrate) {
      Taro.vibrateShort({ type: 'heavy' });
    }

    switch (key) {
      case 'BACKSPACE':
        typeof onDelete === 'function' && onDelete();
        break;
      case 'OK':
        typeof onConfirm === 'function' && onConfirm();

        // 点击确定按钮时自动关闭
        if (closeOnConfirm) {
          typeof onClose === 'function' && onClose();
        }
        break;
      default:
        if (key !== '') {
          typeof onInput === 'function' && onInput(key);
        }
        break;
    }
  };


  const renderHeader = (): ReactNode => {
    if (!showCloseButton && !title) {
      return null;
    }
    
    return (
      <View
        className={classNames('number-keyboard__header', {
          'number-keyboard__header--with-title': !!title,
        })}
      >
        {title && <View className="number-keyboard__title">{title}</View>}
        {
          showCloseButton && (
            <View
              className="number-keyboard__close"
              onClick={() => {
                typeof onClose === 'function' && onClose();
              }}
            >
              <Down fill="#999" />
            </View>
          )
        }
      </View>
    );
  };


  const renderKey = (key: string | 'BACKSPACE', index: number): ReactNode => {
    const isNumberKey = /^\d$/.test(key);
    const keyClassName = classNames('number-keyboard__key', {
      'number-keyboard__key--number': isNumberKey,
      'number-keyboard__key--sign': !isNumberKey && key,
      'number-keyboard__key--mid': index === 9 && !!confirmText && keys.length < 12,
    });
    
    return (
      <View className={keyClassName} key={`${key}-${index}`} onClick={(ev) => handleKeyPress(ev, key)}>
        {key === 'BACKSPACE' ? <DeleteTwo size={48} strokeWidth={3} fill="#333" /> : key}
      </View>
    );
  };

  return (
    <Popup
      visible={visible}
      position="bottom"
      simple
      overlay={overlay}
      overlayBgColor={overlayBgColor}
      destroyOnClose
      onClosed={() => {
        typeof onClose === 'function' && onClose();
      }}
    >
      <View className="number-keyboard">
        {renderHeader()}

        <View className="number-keyboard__body">
          <View className="number-keyboard__main">
            {keys.map(renderKey)}
          </View>
          {
          !!confirmText && (
            <View className="number-keyboard__confirm">
              <View
                className="number-keyboard__key number-keyboard__key--extra key-bs"
                onClick={ev => handleKeyPress(ev, 'BACKSPACE')}
              >
                <DeleteTwo size={48} strokeWidth={3} fill="#333" />
              </View>
              <View
                className="number-keyboard__key number-keyboard__key--extra key-ok"
                onClick={ev => handleKeyPress(ev, 'OK')}
              >
                {confirmText}
              </View>
            </View>
          )
        }
        </View>

        <View className="number-keyboard__footer">
          <View className="safe-area safe-area-position-bottom" />
        </View>
      </View>
    </Popup>
  );
};

export default Index;
