import { View } from '@tarojs/components';

import classNames from 'classnames';
import { useState } from 'react';

import { CarNumberKeyboard, DemoBlock, KeyboardType } from '@/common/components';

import './index.scss';

export default function Index() {
  const [visible, setVisible] = useState(false);
  const [keyboardType, setKeyboardType] = useState<KeyboardType>('ZH');

  // 大陆车牌 首字母必须为汉字 蓝牌7位，新能源8位
  // 港澳车牌 2~6位 全部可输入为字母或数字
  const [carNumber, setCarNumber] = useState<string[]>(['', '', '', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(-1);

  const gerCarNumberShow = (): string => {
    const result = [...carNumber];
    result.splice(2, 0, ' ');
    return result.join('');
  };

  /**
   * 切换键盘类型
   * @param index 
   */
  const toggleKeyboardType = (index: number) => {
    if (index <= 0) {
      setKeyboardType('ZH');
    } else {
      setKeyboardType('EN');
    }
  };

  const handlePressInput = (index: number) => {
    toggleKeyboardType(index);

    setVisible(true);
    setActiveIndex(index);
  };

  return (
    <View className="container">
      
      <DemoBlock title="请输入车牌号码">
        <View className="car-number-result">结果：{gerCarNumberShow()}</View>
        <View className="car-number-input">
          {
          carNumber.map((num, idx) => {
            const isProvince = idx === 0;
            const isNewSource = idx === carNumber.length - 1;

            return (
              <View
                className={classNames('car-number-input__item ', {
                  active: idx === activeIndex,
                  'is-new-source': isNewSource && num === '',
                  'is-province': isProvince && num === '',
                })}
                key={idx}
                onClick={() => handlePressInput(idx)}
              >
                {
                  (isProvince && num === '' && idx !== activeIndex)
                    ? '省'
                    : (isNewSource && num === '' && idx !== activeIndex) ? '新能源' : num
                }

              </View>
            );
          })
        }
        </View>
      </DemoBlock>

      <CarNumberKeyboard
        visible={visible}
        type={keyboardType}
        onClose={() => {
          console.log('onClose callback');
          
          setVisible(false);
          setActiveIndex(-1);
        }}
        onInput={(val: string) => {
          const newCarNumber = [...carNumber];
          newCarNumber[activeIndex] = val;
          setCarNumber(newCarNumber);

          // 下一项输入
          let nextActiveIndex = activeIndex + 1;
          // 第一项未输入
          const nextEmptyIndex = newCarNumber.findIndex(num => num === '');
          if (nextActiveIndex >= newCarNumber.length) {
            // 从头开始遍历未输入
            nextActiveIndex = nextEmptyIndex;
          }
          
          if (nextEmptyIndex <= -1) {
            // 全部项都输入值 =>> 关闭输入框, activeIndex 重置 -1
            nextActiveIndex = nextEmptyIndex;
            setVisible(false);
          }

          setActiveIndex(nextActiveIndex);
          toggleKeyboardType(nextActiveIndex);
        }}
        onDelete={() => {
          if (activeIndex < 0) {
            return;
          }
          
          const newCarNumber = [...carNumber];
          newCarNumber[activeIndex] = '';
          setCarNumber(newCarNumber);
          
          // 上一项输入
          const nextActiveIndex = Math.max(activeIndex - 1, 0);
          setActiveIndex(nextActiveIndex);
          toggleKeyboardType(nextActiveIndex);
        }}
        onToggle={(type) => {
          setKeyboardType(type);
        }}
      />
    </View>
  );
}
