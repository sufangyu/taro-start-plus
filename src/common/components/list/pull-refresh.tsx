import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { ReactNode, useRef, useState } from 'react';

import './index.scss';
import { PullStatusEnum, PullStatusMessage } from './types';


interface Props {
  children?: ReactNode;
  /** 是否禁用下拉刷新. 默认 false */
  disabled?: boolean;
  /** 下拉的提示文案. 默认 '下拉刷新' */
  pullingText?: ReactNode;
  /** 释放的提示文案. 默认 '释放立即刷新' */
  canReleaseText?: ReactNode;
  /** 释放的提示文案. 默认 '加载中……' */
  refreshingText?: ReactNode;
  /** 完成时的提示文案. 默认 '刷新成功' */
  completeText?: ReactNode;
  /** 完成后延迟消失的时间，单位为 ms. 默认 500 */
  completeDelay?: number;
  /** 触发刷新需要下拉多少距离. 默认 60 */
  threshold?: number;
  /** 最大可下滑的距离. 默认 100 */
  maxMoveOffset?: number;
  /** 完成后是否震动 */
  isVibrate?: boolean;
  /** 触发刷新时的处理函数 */
  onRefresh?: () => Promise<any>;
}


/**
 * 下拉刷新
 *
 * @param {Props} props
 * @return {*} 
 */
const PullRefresh = (props: Props): ReactNode => {
  const {
    children,
    disabled = false,
    pullingText = PullStatusMessage.pulling,
    canReleaseText = PullStatusMessage.canRelease,
    refreshingText = PullStatusMessage.refreshing,
    completeText = PullStatusMessage.complete,
    threshold = 60,
    maxMoveOffset = 100,
    completeDelay = 500,
    isVibrate = false,
    onRefresh, 
  } = props;


  // 延迟消失的定时器
  const timeoutTimer = useRef<NodeJS.Timeout | null>(null);
  const transformY = useRef<number>(0);
  // 开始坐标
  const start = useRef({ x: 0, y: 0 });
  // 下拉刷新状态
  const pullStatus = useRef<PullStatusEnum>(PullStatusEnum.CPMPLETE);
  const [pullStatusText, setPullStatusText] = useState<ReactNode>(pullingText);
  const [trackStyles, setTrackStyles] = useState('');

  /** 重置状态 */
  const resetStatus = () => {
    setTrackStyles([
      'transition-duration: 300ms;',
      'transform: translate3d(0px, 0px, 0px)',
    ].join(''));

    transformY.current = 0;
    start.current = { x: 0, y: 0 };
  };


  const handleTouchStart = (ev: any) => {
    const touch = (ev as TouchEvent).touches[0];
    start.current = {
      x: touch.clientX, 
      y: touch.clientY,
    };
  };

  const handleTouchMove = (ev: any) => {
    // 处理加载数据中 or 禁用状态 => 不能再次拖拽
    if (pullStatus.current === PullStatusEnum.REFRESHING || disabled) {
      return;
    }

    const touch = (ev as TouchEvent).touches[0];
    const deltaY = touch.clientY - start.current.y;

    // 下拉阻尼感效果
    const step1 = threshold / 2;
    const step2 = threshold;
    if (deltaY > 0 && deltaY < step1) {
      transformY.current = deltaY;
    } else if (deltaY >= step1 && deltaY < step2) {
      // 超出第一界限的后续部分内容以指定倍数滑动距离累加
      transformY.current = step1 + (deltaY - step1) * 0.5;
    } else if (deltaY >= step2) {
      transformY.current = (step1 + (step2 - step1) * 0.5) + (deltaY - step2) * 0.2;
    }
    // 防止超出范围
    transformY.current = Math.min(maxMoveOffset, transformY.current);

    if (transformY.current <= threshold) {
      pullStatus.current = PullStatusEnum.PULLING;
      setPullStatusText(pullingText);
    } else {
      pullStatus.current = PullStatusEnum.CAN_RELEASE;
      setPullStatusText(canReleaseText);
    }

    setTrackStyles([
      'transition-duration: 0ms;',
      `transform: translate3d(0px, ${Taro.pxTransform(transformY.current * 2)}, 0px)`,
    ].join(''));
  };

  const handleTouchEnd = async () => {
    if (pullStatus.current !== PullStatusEnum.CAN_RELEASE) {
      resetStatus();
      return;
    }

    pullStatus.current = PullStatusEnum.REFRESHING;
    setPullStatusText(refreshingText);

    typeof onRefresh === 'function' && await onRefresh();
    // console.log('收起下拉刷新');

    pullStatus.current = PullStatusEnum.CPMPLETE;
    setPullStatusText(completeText);

    if (isVibrate) {
      Taro.vibrateShort();
    }

    timeoutTimer.current && clearTimeout(timeoutTimer.current);
    timeoutTimer.current = setTimeout(() => {
      timeoutTimer.current = null;
      resetStatus();
    }, completeDelay);
  };
  
  
  return (
    <View
      className="pull-refresh"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <View
        className="pull-refresh__track"
        style={trackStyles}
      >
        <View className="pull-refresh__head">
          <View className="pull-refresh__text">{pullStatusText}</View>
        </View>
        {children}
      </View>
    </View>
  );
};

export default PullRefresh;
