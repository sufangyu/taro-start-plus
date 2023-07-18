import { ScrollView, View } from '@tarojs/components';
import {
  FC, ReactNode, useEffect, useRef, useState, 
} from 'react';
import Taro from '@tarojs/taro';
import { viewUtil } from '@/core/utils';

import { Sidebar } from './sidebar';
import { IndexItem } from './types';
import './index.scss';


/**
 * A~Z 索引列表
 *
 * @return {*} 
 */
const getIndexList = (): IndexItem[] => {
  const list: IndexItem[] = [];
  const charCodeOfA = 'A'.charCodeAt(0);

  for (let i = 0; i < 26; i += 1) {
    const key = String.fromCharCode(charCodeOfA + i);
    list.push({
      key,
      title: key,
      toast: key,
    });
  }

  return list;
};
  
const systemInfo = Taro.getSystemInfoSync();
const isWEB = Taro.getEnv() === Taro.ENV_TYPE.WEB;

interface Props {
  children?: ReactNode;
  /** 自定义区域（头部）. 第一项 view 需要加 ID 属性, 用于定位 */
  customArea?: ReactNode;
  /** 是否开启跳转过渡动画: 默认: false */
  animation?: boolean;
  /** 是否切换 key 的震动，只在微信小程序有效. 默认: true */
  isVibrate?: boolean;
  /** 是否用弹框显示当前 key. 默认: true */
  isShowToast?:boolean;
  /** 索引字符列表. 默认: A~Z */
  indexItems?: IndexItem[];
}

const Index: FC<Props> = (props: Props) => {
  const {
    children, customArea, animation, isVibrate, isShowToast, indexItems,
  } = props;

  const [scrollIntoView, setScrollIntoView] = useState('');
  const [scrollTop, setScrollTop] = useState(0);
  const listId = useRef(`list-${new Date().getTime()}`);
  const listRef = useRef<HTMLElement|null>(null);

  useEffect(() => {
    if (isWEB) {
      listRef.current = document.getElementById(listId.current);
    }
  }, []);

  
  const handleJumpTarget = (index: number): void => {
    const { key } = indexItems![index];
    const targetView = `index-bar-list-${key}`;

    // 震动
    if (isVibrate && systemInfo.platform !== 'devtools') {
      Taro.vibrateShort({
        type: 'light',
      });
    }

    if (isWEB) {
      viewUtil.delayQuerySelector('.index-bar', 0).then((rect) => {
        const targetEle = listRef.current?.children[index];
        const targetOffsetTop = targetEle instanceof HTMLElement ? targetEle.offsetTop : 0;
        // rect[0].top => 索引列表的 top 偏移量
        const top = targetOffsetTop - rect[0].top;
        setScrollTop(top);
      });
      
      return;
    }

    setScrollIntoView(targetView);
  };
  

  return (
    <View className="index-bar">
      <ScrollView
        id={listId.current}
        className="index-bar__body"
        scrollY
        scrollTop={isWEB ? scrollTop : undefined}
        scrollIntoView={!isWEB ? scrollIntoView : ''}
        scrollWithAnimation={animation}
      >
        {customArea}
        {children}
      </ScrollView>

      <Sidebar
        indexItems={indexItems!}
        isShowToast={isShowToast}
        onActive={(index) => handleJumpTarget(index)}
      />
    </View>
  );
};

Index.defaultProps = {
  children: [],
  animation: false,
  isVibrate: true,
  isShowToast: true,
  indexItems: getIndexList(),
};

export default Index;
