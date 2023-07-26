import { Button, View } from '@tarojs/components';

import { useState } from 'react';

import icMessage from '@/assets/images/icons/ic-hot.png';
import { Popover, PopoverPlacement } from '@/common/components';

import './index.scss';

export default function Index() {
  const [position, setPosition] = useState<PopoverPlacement>('bottom');

  const actions = [
    { text: '选项一', icon: icMessage },
    { text: '选项二', icon: icMessage },
    { text: '选项三', icon: icMessage, disabled: true },
    { text: '选项四', icon: icMessage },
  ];

  return (
    <View className="container">
      <View className="demo-title">基本用法</View>
      <View className="demo-content">
        <Popover theme="light" placement="bottom-start" actions={actions}>
          <Button size="mini" type="primary">浅色风格</Button>
        </Popover>

        <Popover theme="dark" actions={actions}>
          <Button size="mini" type="primary">深色风格</Button>
        </Popover>
      </View>

      <View className="demo-title">自定义内容</View>
      <View className="demo-content">
        <Popover placement="right" content={<View style={{ height: '60px', lineHeight: '60px' }}>自定义内容弹出气泡</View>}>
          <Button size="mini" type="primary">自定义内容</Button>
        </Popover>
      </View>

      <View className="demo-title">弹出位置</View>
      <View className="demo-content" style={{ textAlign: 'center', paddingTop: 32 }}>
        <Popover
          isShow
          overlay={false}
          placement={position}
          content={<View>弹出位置的弹出气泡</View>}
        >
          <View className="demo-popover-refer" />
        </Popover>

        <View style={{ marginTop: 64 }}>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('bottom-start')}>bottom-start</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('bottom')}>bottom</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('bottom-end')}>bottom-end</Button>

          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('top-start')}>top-start</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('top')}>top</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('top-end')}>top-end</Button>

          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('left-start')}>left-start</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('left')}>left</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('left-end')}>left-end</Button>

          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('right-start')}>right-start</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('right')}>right</Button>
          <Button size="mini" style={{ margin: '4px' }} onClick={() => setPosition('right-end')}>right-end</Button>
        </View>
      </View>

     
    </View>
  );
}
