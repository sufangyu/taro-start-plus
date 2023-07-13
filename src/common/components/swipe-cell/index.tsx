/* eslint-disable no-use-before-define */
import { View } from '@tarojs/components';
import {
  FC, ReactNode, useEffect, useState, 
} from 'react';
import { OpenedPosition, SwipeActionOption } from './types';
import SwipeAction from './action';
import { range, getDirection } from './utils';

import './index.scss';


export interface PropsCell {
  children: ReactNode;
  /** 拓展 className */
  extraClass?: string;
  /** 左侧 action 的配置项 */
  leftOptions?: SwipeActionOption[];
  /** 右侧 action 的配置项 */
  rightOptions?: SwipeActionOption[];
  /** aciton item 宽度, 用于计算打开时的偏移量. 默认是 70 */
  actionItemWidth?: number;
  /** 打开操作的位置. 为空表示关闭 */
  openedPosition?: OpenedPosition;
  /** 是否禁止滑动 */
  disabled?: boolean;
  /** 点击选项时,是否自动关闭 */
  autoClose?: boolean;
  /** 点击触发事件(action item 触发) */
  onClick?: (item: SwipeActionOption, index: number) => void;
  /** 完全打开时触发 */
  onOpened?: (position: OpenedPosition) => void;
  /** 完全关闭时触发 */
  onClosed?: () => void;
}


// 触发 open 的距离倍数（1/3）
const THRESHOLD = 0.3;

// 开始位置
const start = { x: 0, y: 0 };
// 滑动偏移量（俩坐标的差值, 可以是负数）
const delta = { x: 0, y: 0 };
// 滑动距离(绝对距离)
const distance = { x: 0, y: 0 };
// 开始偏移量
let startOffset = 0;
// 是否拖拽中
let dragging = false;
// 当前打开位置
let curOpenPosition: OpenedPosition = '';


const Index: FC<PropsCell> = (props: PropsCell) => {
  const {
    children, extraClass, disabled, openedPosition, actionItemWidth = 70,
    leftOptions = [], rightOptions = [], autoClose = true, onClick, onOpened, onClosed,
  } = props;
  // 左侧、右侧打开的距离（item 个数 * item 宽度）
  const leftWidth = actionItemWidth * leftOptions.length;
  const rightWidth = actionItemWidth * rightOptions.length;

  const [wrapperStyle, setWrapperStyle] = useState('');
  // 滑动方向
  const [direction, setDirection] = useState<'horizontal' | 'vertical' | ''>('');
  // 滑动偏移量
  const [offset, setOffset] = useState(0);

  
  useEffect(() => {
    // 处理初始化
    if (openedPosition === 'left') {
      open('left', true);
    } else if (openedPosition === 'right') {
      open('right', true);
    } else {
      close(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedPosition]);


  /** 重置状态 */
  const resetTouchStatus = () => {
    setDirection('');
    delta.x = 0;
    delta.y = 0;
    distance.x = 0;
    distance.y = 0;
  };


  /**
   * 打开 action
   *
   * @param {OpenedPosition} position 打开位置. '' 表示关闭
   * @param {boolean} [isInit=false] 是否初始化
   */
  const open = (position: OpenedPosition, isInit: boolean = false) => {
    let moveOffset = 0;
    if (position === 'left') {
      moveOffset = leftWidth;
    } else if (position === 'right') {
      moveOffset = -rightWidth;
    }
    setOffset(moveOffset);
    swipeMove(moveOffset);
    curOpenPosition = position;

    // 初始化不触发 open 回调
    (typeof onOpened === 'function' && !isInit) && onOpened(position);
  };


  /**
   * 关闭
   *
   * @param {boolean} [isInit=false] 是否初始化
   */
  const close = (isInit: boolean = false): void => {
    swipeMove(0);

    if (!isInit && ['left', 'right'].includes(curOpenPosition) && typeof onClosed === 'function') {
      onClosed();
    }

    curOpenPosition = '';
  };


  /**
   * 点击 action 回调
   *
   * @param {SwipeActionOption} item 当前 item 项
   * @param {number} index 序号
   */
  const handleActionClick = (item: SwipeActionOption, index: number) => {
    onClick && onClick(item, index);
  };


  // 拖拽滑动
  const swipeMove = (curOffset: number = 0) => {
    const moveOffset = range(curOffset, -rightWidth, leftWidth);
    const transform = `translate3d(${moveOffset}px, 0, 0)`;
    const transition = dragging
      ? 'none'
      : 'transform 0.6s cubic-bezier(0.18, 0.89, 0.32, 1)';
    
    setOffset(moveOffset);
    setWrapperStyle([
      `-webkit-transform: ${transform};`,
      `-webkit-transition: ${transition};`,
      `transform: ${transform};`,
      `transition: ${transition};`,
    ].join(''));
  };

  // 滑动松开处理打开 or 关闭
  const swipeLeaveTransition = () => {
    if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
      open('right');
    } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
      open('left');
    } else {
      close();
    }
  };


  const handleStartDrag = (ev: any) => {
    if (disabled) {
      return;
    }
    
    resetTouchStatus();

    startOffset = offset;
    const touch = (ev as TouchEvent).touches[0];
    start.x = touch.clientX;
    start.y = touch.clientY;
  };

  const handleMoveDrag = (ev: any) => {
    if (disabled) {  
      return;
    }

    const touch = (ev as TouchEvent).touches[0];
    delta.x = touch.clientX - start.x;
    delta.y = touch.clientY - start.y;
    distance.x = Math.abs(delta.x);
    distance.y = Math.abs(delta.y);
    const curDirection = direction || getDirection(distance.x, distance.y);
    setDirection(curDirection);

    if (direction !== 'horizontal') {
      return;
    }
    dragging = true;
    swipeMove(startOffset + delta.x);
  };

  const handleEndDrag = () => {
    if (disabled) {
      return;
    }

    dragging = false;
    swipeLeaveTransition();
  };

  // 点击关闭
  const handleClick = () => {
    if (!offset) {
      return;
    }

    autoClose && close();
  };


  // 渲染操作内容
  const renderActions = (options: SwipeActionOption[] = []) => {
    return options.map((option, idx) => {
      return <SwipeAction option={option} onClick={() => handleActionClick(option, idx)} />;
    });
  };


  return (
    <View
      className={`"swipe-cell ${extraClass ?? ''}"`}
      onTouchStart={handleStartDrag}
      onTouchMove={handleMoveDrag}
      onTouchEnd={handleEndDrag}
      onClick={handleClick}
    >
      <View
        className="swipe-cell__wrapper"
        style={`${wrapperStyle}`}
      >
        <View className="swipe-cell__left">{renderActions(leftOptions)}</View>
        {children}
        <View className="swipe-cell__right">{renderActions(rightOptions)}</View>
      </View>
    </View>
  );
};


export default Index;
