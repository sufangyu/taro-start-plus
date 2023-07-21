import { Block, ITouchEvent, View } from '@tarojs/components';

import { useEffect, useRef, useState } from 'react';

import { viewUtil } from '@/core/utils';

import { IndexItem } from './types';
import './index.scss';


interface Props {
  indexItems: IndexItem[];
  /** 是否用弹框显示当前 key. 默认: true */
  isShowToast?: boolean;
  /**
   * 定位对于的索引
   *
   * @memberof Props
   */
  onActive: (index: number) => void;
}

/**
 * 右侧导航信息
 * - height: 右侧导航高度
 * - startTop: 右侧导航距离顶部高度
 * - itemHeight: 右侧导航元素高度
 */
const sidebar = {
  isInit: false,
  height: 0,
  startTop: 0,
  itemHeight: 0,
};


/**
 * 侧边索引列表
 * @param props 
 * @returns 
 */
export const Sidebar = (props: Props) => {
  const { indexItems = [], isShowToast = true, onActive } = props;

  const timeoutTimer = useRef<NodeJS.Timeout | null>(null);
  const currentIndex = useRef(-1);
  const [tipText, setTipText] = useState('');


  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    initData();
  });


  /**
   * 初始化数据（索引列表菜单的高度信息）
   *
   */
  function initData():void {
    viewUtil.delayQuerySelector('.index-bar__sidebar').then(rect => {
      const len = indexItems?.length ?? 0;
      sidebar.isInit = true;
      sidebar.height = rect[0].height;
      sidebar.startTop = rect[0].top;
      sidebar.itemHeight = Math.ceil(sidebar.height / (len + 1));
    });
  }

  // 延迟关闭提示 toast
  const delayCloseIndexToast = () => {
    timeoutTimer.current && clearTimeout(timeoutTimer.current);
    timeoutTimer.current = setTimeout(() => {
      setTipText('');
      timeoutTimer.current = null;
    }, 300);
  };


  const handleTouchMove = (ev: ITouchEvent): void => {
    ev.stopPropagation();
    ev.preventDefault();

    const { pageY } = ev.touches[0];
    const index = Math.floor((pageY - sidebar.startTop) / sidebar.itemHeight);

    if (index >= 0 && index < indexItems.length && currentIndex.current !== index) {
      currentIndex.current = index;
      setTipText(`${indexItems[index].toast ?? indexItems[index].key}`);

      onActive(index);
    }
  };

  const handleTouchEnd = (): void => {
    delayCloseIndexToast();
    currentIndex.current = -1;
  };
 

  return (
    <>
      <View
        className="index-bar__sidebar"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        catchMove
      >
        {
        indexItems?.map((item, idx) => {
          return (
            <View
              key={`sidebar-index-${idx}`}
              className="index-bar__index"
              onClick={() => {
                setTipText(`${indexItems[idx].toast ?? indexItems[idx].key}`);
                onActive(idx);

                delayCloseIndexToast();
              }}
            >
              {item.title}
            </View>
          );
        })
      }
      </View>

      {/*
        问题：ScrollView 会在同级节点发生增删情况下会自动会滚ScrollView到顶部, 这是Taro自身bug.
        方案：使用 Block 组件包裹ScrollView的同级节点，那么更新节点时候就是单独对数组某个元素更新。这样就不会影响到ScrollView元素。
        https://blog.csdn.net/qq_33490514/article/details/122238134
      */}
      <Block>
        {/* 索引提示 */}
        {(isShowToast && tipText) && <View className="index-bar__index-toast">{tipText}</View>}
      </Block>
    </>
  ); 
};
