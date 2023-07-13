import {
  View, Image, Button,
} from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import { OpenedPosition, SwipeActionOption, SwipeCell } from '@/common/components';
import icDel from '@/assets/images/icons/ic-del-w.png';
import icCollect from '@/assets/images/icons/ic-collect-w.png';
import './index.scss';


export default function Index() {
  const OPTIONS_LEFT: SwipeActionOption[] = [
    {
      text: '选择',
      style: { backgroundColor: '#58be6a' }, 
    },
  ];
  const OPTIONS_RIGHT: SwipeActionOption[] = [
    {
      text: '删除',
      icon: icDel,
      style: { backgroundColor: '#ee0a24' }, 
    },
    {
      text: '收藏',
      icon: <Image src={icCollect} />,
      style: { backgroundColor: '#07c160' }, 
    },
  ];

  const [listSingle, setListSingle] = useState([
    {
      title: '单元格内容 1',
      openedPosition: '',
      optionsLeft: OPTIONS_LEFT,
      optionsRight: OPTIONS_RIGHT,
    },
    {
      title: '单元格内容 2',
      openedPosition: '',
      optionsLeft: OPTIONS_LEFT,
      optionsRight: OPTIONS_RIGHT,
    },
    {
      title: '单元格内容 3',
      openedPosition: '',
      optionsLeft: OPTIONS_LEFT,
      optionsRight: OPTIONS_RIGHT,
    },
  ]);

  const [openedPosition, setOpenedPosition] = useState<OpenedPosition>('');


  // 点击操作项回调
  const handleClick = (item: SwipeActionOption, idx: number) => {
    Taro.showToast({
      title: `点了${item.text}按钮，inedx: ${idx}`,
      icon: 'none',
    });
  };

  const handleOpened = (): void => {
    Taro.showToast({ title: '触发打开' });
  };

  const handleClosed = (): void => {
    Taro.showToast({ title: '触发关闭' });
  };


  // 处理只打开一项目
  const handleSingleOpen = (index: number, position = '') => {
    const list = listSingle.map((item, idx) => {
      item.openedPosition = idx === index ? position : '';
      return item;
    });

    setListSingle(list);
  };

  return (
    <View className="container">
      <View className="demo-title">基本用法</View>
      <View className="demo-content">
        <SwipeCell
          extraClass="swipe-cell-demo"
          leftOptions={OPTIONS_LEFT}
          rightOptions={OPTIONS_RIGHT}
          onClick={handleClick}
          autoClose={false}
        >
          <View className="swipe-cell-demo__detail">一般用法场景</View>
        </SwipeCell>
      </View>

      <View className="demo-title">禁止滑动</View>
      <View className="demo-content">
        <SwipeCell
          extraClass="swipe-cell-demo"
          leftOptions={OPTIONS_LEFT}
          rightOptions={OPTIONS_RIGHT}
          onClick={handleClick}
          autoClose={false}
          disabled
        >
          <View className="swipe-cell-demo__detail">禁止滑动场景</View>
        </SwipeCell>
      </View>

      <View className="demo-title">自动关闭</View>
      <View className="demo-content">
        <SwipeCell
          extraClass="swipe-cell-demo"
          leftOptions={OPTIONS_LEFT}
          rightOptions={OPTIONS_RIGHT}
          onClick={handleClick}
          autoClose
        >
          <View className="swipe-cell-demo__detail">点击按钮自动关闭</View>
        </SwipeCell>
      </View>

      <View className="demo-title">开启和关闭事件</View>
      <View className="demo-content">
        <SwipeCell
          extraClass="swipe-cell-demo"
          leftOptions={OPTIONS_LEFT}
          rightOptions={OPTIONS_RIGHT}
          onClick={handleClick}
          onOpened={handleOpened}
          onClosed={handleClosed}
          autoClose
        >
          <View className="swipe-cell-demo__detail">开启和关闭时触发事件</View>
        </SwipeCell>
      </View>

      <View className="demo-title">使用变量控制开关</View>
      <View className="demo-content">
        <View className="demo-controller">
          <Button size="mini" plain type={openedPosition === '' ? 'primary' : 'default'} onClick={() => setOpenedPosition('')}>关闭</Button>
          <Button size="mini" plain type={openedPosition === 'left' ? 'primary' : 'default'} onClick={() => setOpenedPosition('left')}>打开左侧</Button>
          <Button size="mini" plain type={openedPosition === 'right' ? 'primary' : 'default'} onClick={() => setOpenedPosition('right')}>打开右侧</Button>
        </View>
        
        <SwipeCell
          extraClass="swipe-cell-demo"
          leftOptions={OPTIONS_LEFT}
          rightOptions={OPTIONS_RIGHT}
          onClick={handleClick}
          openedPosition={openedPosition}
          autoClose
        >
          <View className="swipe-cell-demo__detail">点击按钮自动关闭</View>
        </SwipeCell>
      </View>

      <View className="demo-title">列表</View>
      <View className="demo-content">
        {
          listSingle.map((item) => {
            return (
              <SwipeCell
                extraClass="swipe-cell-demo"
                leftOptions={item.optionsLeft}
                rightOptions={item.optionsRight}
                onClick={handleClick}
              >
                <View className="swipe-cell-demo__detail">{item.title}</View>
              </SwipeCell>
            );
          })
        }
      </View>

      <View className="demo-title">列表（只显示一个）</View>
      <View className="demo-content">
        {
          listSingle.map((item, idx) => {
            return (
              <SwipeCell
                extraClass="swipe-cell-demo"
                leftOptions={item.optionsLeft}
                rightOptions={item.optionsRight}
                openedPosition={item.openedPosition as any}
                onOpened={(position) => {
                  handleSingleOpen(idx, position);
                }}
                onClick={handleClick}
              >
                <View className="swipe-cell-demo__detail">{item.title}</View>
              </SwipeCell>
            );
          })
        }
      </View>
    </View>
  );
}
