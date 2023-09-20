import { BaseEventOrig, View } from '@tarojs/components';
import { createSelectorQuery, getSystemInfoSync } from '@tarojs/taro';

import React, { useEffect, useRef, useState } from 'react';

import { baseUtil } from '@/core/utils';

import { DragProps } from './types';
import './index.scss';

const Index = (props: DragProps) => {
  const {
    children, direction = 'all', attract = false, style = {},
    boundary = {
      top: 0, left: 0, right: 0, bottom: 0,
    },
  } = props;

  const uniqueClassName = `drag-${baseUtil.uuid()}`;
  const myDrag = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [currstyle, setCurrStyle] = useState({});
  const [boundaryState, setBoundaryState] = useState(boundary);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const axisCache = useRef({ x: 0, y: 0 });
  const transformCache = useRef({ x: 0, y: 0 });
  const translateX = useRef(0);
  const translateY = useRef(0);
  // 左右两屏的中线
  const middleLine = useRef(0);

  // 获取信息
  const getInfo = () => {
    const el = myDrag.current;
    if (!el) {
      return;
    }

    const {
      top, left, bottom, right, 
    } = boundary;
    const { screenWidth, windowHeight } = getSystemInfoSync();
    createSelectorQuery()
      .select(`.${uniqueClassName}`)
      .boundingClientRect((rec: any) => {
        console.log(screenWidth, windowHeight);
        console.log(rec);
    
        setBoundaryState({
          top: -rec.top + top,
          left: -rec.left + left,
          bottom: windowHeight - rec.height - rec.top - bottom,
          right: screenWidth - rec.width - rec.left - right,
        });

        middleLine.current = screenWidth - rec.width - rec.left - (screenWidth - rec.width) / 2;
      })
      .exec();
  };

  useEffect(() => {
    timer.current = setTimeout(() => {
      getInfo();
    }, 300);

    return () => {
      timer.current && clearTimeout(timer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const touchStart = (ev: BaseEventOrig<React.TouchEvent>) => {
    const touchEv = ev as unknown as React.TouchEvent;
    const touches = touchEv.touches[0];
    axisCache.current = { x: touches.clientX, y: touches.clientY };
    transformCache.current = { x: translateX.current, y: translateY.current };
  };

  const touchMove = (ev: BaseEventOrig<React.TouchEvent>) => {
    const touchEv = ev as unknown as React.TouchEvent;
    if (touchEv.touches.length !== 1 || !dragRef.current) {
      return;
    }

    const touch = touchEv.touches[0];
    const x = touch.clientX - axisCache.current.x;
    const y = touch.clientY - axisCache.current.y;
    translateX.current = x + transformCache.current.x;
    translateY.current = y + transformCache.current.y;

    // 边界判断
    if (translateX.current < boundaryState.left) {
      translateX.current = boundaryState.left;
    } else if (translateX.current > boundaryState.right) {
      translateX.current = boundaryState.right;
    }

    if (translateY.current < boundaryState.top) {
      translateY.current = boundaryState.top;
    } else if (translateY.current > boundaryState.bottom) {
      translateY.current = boundaryState.bottom;
    }

    const transform = `translate3d(${direction !== 'y' ? translateX.current : 0}px,
      ${direction !== 'x' ? translateY.current : 0}px,
      0px
    )`;

    setCurrStyle({ transform });
  };

  const touchEnd = () => {
    if (!dragRef.current) {
      return;
    }

    // 吸边
    if (direction !== 'y' && attract) {
      console.log(boundaryState);

      if (translateX.current < middleLine.current) {
        translateX.current = boundaryState.left;
      } else {
        translateX.current = boundaryState.right;
      }
      const transform = `translate3d(${translateX.current}px,
        ${direction !== 'x' ? `${translateY.current}px` : 0},
        0
      )`;
      setCurrStyle({ transform });
    }
  };
  
  return (
    <View
      className={`drag ${uniqueClassName}`}
      ref={myDrag}
      style={style}
    >
      <View
        ref={dragRef}
        onTouchStart={(event) => touchStart(event)}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        style={currstyle}
      >
        {children}
      </View>
    </View>
  );
};

export default Index;

