import { Button, View } from '@tarojs/components';

import { useRef } from 'react';

import { CountUp, CountUpRef, DemoBlock } from '@/common/components';
import './index.scss';

export default function Index() {
  const countupRef = useRef<CountUpRef>(null);


  return (
    <View className="container">
      <DemoBlock title="基础使用">
        <View style={{ textAlign: 'center' }}>
          <CountUp
            start={100}
            end={26739.19}
          />
        </View>
      </DemoBlock>


      <DemoBlock title="高级用法">
        <View style={{ textAlign: 'center' }}>
          <CountUp
            style={{
              fontSize: '24px',
            }}
            ref={countupRef}
            start={100}
            end={26739.19}
            startOnMount={false}
            onStartCallback={() => {
              console.log('开始滚动');
            }}
            onCompleteCallback={() => {
              console.log('滚动结束');
            }}
          />

          <View style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <Button type="primary" size="mini" onClick={() => countupRef.current?.start()}>开始</Button>
            <Button type="primary" size="mini" onClick={() => countupRef.current?.pauseResume()}>暂停/恢复</Button>
            <Button type="primary" size="mini" onClick={() => countupRef.current?.update(43928)}>更新</Button>
            <Button type="primary" size="mini" onClick={() => countupRef.current?.reset()}>重置</Button>
          </View>
        </View>
      </DemoBlock>
    </View>
  );
}
