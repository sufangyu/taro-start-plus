// 参考: https://github.com/domisooo/taro-f2-react
import {
  ITouchEvent, CanvasTouchEvent, Canvas,
} from '@tarojs/components';
import Taro, { createSelectorQuery, getSystemInfoSync } from '@tarojs/taro';

import { Canvas as FFCanvas } from '@antv/f2';
import {
  ReactNode, memo, useEffect, useRef, 
} from 'react';

import { baseUtil } from '@/core/utils';

import useUnmount from './use-unmount';

interface F2CanvasProps {
  children?: ReactNode;
  /** 高度 */
  height?: number | string;
  /** 宽度 */
  width?: number | string;
}

type CanvasEvent = ITouchEvent | CanvasTouchEvent;

interface CanvasElement {
  dispatchEvent: (type: string, event: CanvasEvent) => void;
}

function wrapEvent(e: CanvasEvent) {
  if (e && !e.preventDefault) {
    e.preventDefault = function _pd() {};
  }
  return e;
}


const F2Canvas = (props: F2CanvasProps) => {
  const {
    children, width: containerWidth = '100%', height: containerHeight = 260, 
  } = props;

  const uuid = baseUtil.uuid();
  const idRef = useRef(`f2-canvas-${uuid}`);
  const canvasRef = useRef<typeof Canvas>();
  const ffCanvasRef = useRef<FFCanvas>();
  const canvasElRef = useRef<CanvasElement>();
  const childrenRef = useRef<ReactNode>();

  useEffect(() => {
    childrenRef.current = children;
    ffCanvasRef.current?.update({ children });
  }, [children]);

  useUnmount(() => {
    ffCanvasRef.current?.destroy();
  });

  const renderCanvas = () => {
    const query = createSelectorQuery();
    query
      .select(`#${idRef.current}`)
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        const { node, width, height } = res[0];
        const { pixelRatio } = getSystemInfoSync();
        // 高清设置
        if (node) {
          node.width = width * pixelRatio;
          node.height = height * pixelRatio;
        }
        const context = node.getContext('2d');
        const canvas = new FFCanvas({
          pixelRatio,
          width,
          height,
          context,
          children: childrenRef.current,
          createImage: () => node.createImage(), // fix: 解决图片元素不渲染的问题
        });
        canvas.render();
        if (canvas) {
          ffCanvasRef.current = canvas;
          canvasElRef.current = canvas.canvas.get('el');
        }
      });
  };

  useEffect(() => {
    if (canvasRef.current) {
      // tips2:延迟是为了确保能获取到 node 对象，
      // 直接获取会出现 node 为 null 的情况//tips2:延迟是为了确保能获取到 node 对象，直接获取会出现 node 为 null 的情况
      setTimeout(renderCanvas);
    }
  }, [canvasRef]);

  const handleClick = (e: ITouchEvent) => {
    const canvasEl = canvasElRef.current;
    if (!canvasEl) {
      return;
    }

    const event = wrapEvent(e);

    // 包装成 touch 对象
    // event.touches = [e.detail];
    // 问题：Legend无法点击。（https://github.com/antvis/F2/issues/1517）
    // 原因：小程序 e.detail 对象返回的是距离顶部 x,y 距离，f2内 isInBBox 判断的则是相对距离。
    // 修改：将 x，y 均减去距离顶部距离，这样就能和 f2 内 x，y 对齐
    event.touches = [{
      ...e.detail,
      x: e.detail.x - (e.target as HTMLElement).offsetLeft,
      y: e.detail.y - (e.target as HTMLElement).offsetTop,
    }];
  
    canvasEl.dispatchEvent('click', event);
  };

  const handleTouchStart = (e: CanvasTouchEvent) => {
    const canvasEl = canvasElRef.current;
    if (!canvasEl) {
      return;
    }

    canvasEl.dispatchEvent('touchstart', wrapEvent(e));
  };

  const handleTouchMove = (e: CanvasTouchEvent) => {
    const canvasEl = canvasElRef.current;
    if (!canvasEl) {
      return;
    }
    canvasEl.dispatchEvent('touchmove', wrapEvent(e));
  };

  const handleTouchEnd = (e: CanvasTouchEvent) => {
    const canvasEl = canvasElRef.current;
    if (!canvasEl) {
      return;
    }
    canvasEl.dispatchEvent('touchend', wrapEvent(e));
  };

  return (
    <Canvas
      id={idRef.current}
      ref={canvasRef}
      type="2d"
      style={{
        width: typeof containerWidth === 'string' ? containerWidth : Taro.pxTransform(containerWidth),
        height: typeof containerHeight === 'string' ? containerHeight : Taro.pxTransform(containerHeight),
        display: 'block',
        padding: 0,
        margin: 0,
      }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default memo(F2Canvas);

