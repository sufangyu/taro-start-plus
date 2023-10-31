import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import { Cell, DemoBlock, NumberKeyboard } from '@/common/components';

import './index.scss';

export default function Index() {
  const [visible, setVisible] = useState({
    default: false,
    withTitle: false,
    withConfirm: false,
    orderRandom: false,
    inputValue: false,

    customSingle: false,
    customMulti: false,
    customSingleWithConfirm: false,
    customMultiWithConfirm: false,

    overlayHidden: false,
    overlayBgColor: false,
    vibrate: false,
  });
  const [inputValue, setInputValue] = useState('');

  
  const toggleVisible = (key: keyof typeof visible, value: boolean) => {
    setVisible((prev) => {
      return {
        ...prev,
        [`${key}`]: value,
      };
    });
  };
  
  const showInputValue = (value: string) => {
    Taro.showToast({
      icon: 'none',
      title: `输入：${value}`,
    });
  };


  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基本用法" simple>
        <Cell
          title="默认键盘"
          arrow
          onClick={() => toggleVisible('default', true)}
        />
        <Cell
          title="带标题键盘"
          arrow
          onClick={() => toggleVisible('withTitle', true)}
        />
        <Cell
          title="带确认键盘"
          arrow
          onClick={() => toggleVisible('withConfirm', true)}
        />
        <Cell
          title="乱序键盘"
          arrow
          onClick={() => toggleVisible('orderRandom', true)}
        />
        <Cell
          title="输入内容"
          arrow
          extra={inputValue || '-'}
          onClick={() => toggleVisible('inputValue', true)}
        />
      </DemoBlock>

      <NumberKeyboard
        data-desc="默认键盘"
        visible={visible.default}
        onClose={() => toggleVisible('default', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard
        data-desc="带标题键盘"
        visible={visible.withTitle}
        title="数字键盘"
        onClose={() => toggleVisible('withTitle', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard 
        data-desc="带确认键盘"
        confirmText="确认"
        visible={visible.withConfirm}
        onClose={() => toggleVisible('withConfirm', false)}
        onInput={(value: string) => showInputValue(value)}
      />  
      <NumberKeyboard
        data-title="乱序键盘"
        visible={visible.orderRandom}
        randomOrder
        onClose={() => toggleVisible('orderRandom', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard
        data-title="输入内容"
        visible={visible.inputValue}
        randomOrder
        onClose={() => toggleVisible('inputValue', false)}
        onInput={(value: string) => setInputValue(v => v + value)}
        onDelete={() => setInputValue(v => v.slice(0, v.length - 1))}
      />


      <DemoBlock title="自定义用法" simple>
        <Cell
          title="自定义键盘 - 单个"
          arrow
          onClick={() => toggleVisible('customSingle', true)}
        />
        <Cell
          title="自定义键盘 - 多个"
          arrow
          onClick={() => toggleVisible('customMulti', true)}
        />
        <Cell
          title="自定义键盘 - 单个+确认"
          arrow
          onClick={() => toggleVisible('customSingleWithConfirm', true)}
        />
        <Cell
          title="自定义键盘 - 多个+确认"
          arrow
          onClick={() => toggleVisible('customMultiWithConfirm', true)}
        />
      </DemoBlock>
      <NumberKeyboard
        data-desc="自定义键盘 - 单个"
        visible={visible.customSingle} 
        customKey="X"
        onClose={() => toggleVisible('customSingle', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard
        data-desc="自定义键盘 - 多个"
        visible={visible.customMulti} 
        customKey={['-', '.']}
        onClose={() => toggleVisible('customMulti', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard
        data-desc="自定义键盘 - 单个+确认"
        visible={visible.customSingleWithConfirm}
        customKey="-"
        confirmText="确定"
        onClose={() => toggleVisible('customSingleWithConfirm', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard
        data-desc="自定义键盘 - 多个+确认"
        visible={visible.customMultiWithConfirm}
        customKey={['-', '.']}
        confirmText="确定"
        onClose={() => toggleVisible('customMultiWithConfirm', false)}
        onInput={(value: string) => showInputValue(value)}
      />


      <DemoBlock title="遮罩层&震动" simple>
        <Cell
          title="不显示遮罩层"
          arrow
          onClick={() => toggleVisible('overlayHidden', true)}
        />
        <Cell
          title="自定义遮罩层颜色"
          arrow
          onClick={() => toggleVisible('overlayBgColor', true)}
        />
        <Cell
          title="不震动"
          arrow
          onClick={() => toggleVisible('vibrate', true)}
        />
      </DemoBlock>
      <NumberKeyboard
        data-desc="不显示遮罩层"
        visible={visible.overlayHidden} 
        overlay={false}
        onClose={() => toggleVisible('overlayHidden', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard
        data-desc="自定义遮罩层颜色"
        visible={visible.overlayBgColor}
        overlayBgColor="rgba(255, 0, 0, 0.5)"
        onClose={() => toggleVisible('overlayBgColor', false)}
        onInput={(value: string) => showInputValue(value)}
      />
      <NumberKeyboard
        data-desc="不震动"
        visible={visible.vibrate}
        vibrate={false}
        onClose={() => toggleVisible('vibrate', false)}
        onInput={(value: string) => showInputValue(value)}
      />
    </View>
  );
}
