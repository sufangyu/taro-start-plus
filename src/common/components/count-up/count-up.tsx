import { View } from '@tarojs/components';

import { CountUp as CountUpJs } from 'countup.js';
import React, { useEffect, useRef } from 'react';

import { BasicComponent, basicComponentDefaults } from '@/core/types';

import { CountUpProps, CountUpRef } from './types';
import './index.scss';


const Index = React.forwardRef<CountUpRef, CountUpProps & BasicComponent>((props, ref) => {
  const {
    style,
    className,
    start = 0, 
    end,
    startOnMount = true,
  } = {
    ...basicComponentDefaults, 
    ...props, 
  };
  
  const countupRef = useRef<HTMLElement>(null);
  let countUpAnim: CountUpJs;

  const initCountUp = () => {
    countUpAnim = new CountUpJs(countupRef.current!, end, {
      ...props,
      startVal: start,
    });
    
    if (!countUpAnim.error) {
      startOnMount && countUpAnim.start();
    } else {
      console.warn(countUpAnim.error);
    }
  };

  useEffect(() => {
    initCountUp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // 对外暴露的方法
  React.useImperativeHandle(ref, () => ({
    update(value: number) {
      countUpAnim.update(value);
    },
    start(cb) {
      countUpAnim.start(cb && cb());
    },
    reset() {
      countUpAnim.reset();
    },
    pauseResume() {
      countUpAnim.pauseResume();
    },
  }));
  
  return (
    <View ref={countupRef} className={`count-up ${className}`} style={style}>
      {
        typeof start !== 'undefined' ? start : ''
      }
    </View>
  );
});

export default Index;
