import { Button, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import { Drag, FixedNav, PlayCycle } from '@/common/components';

import './index.scss';

export default function Index() {
  const options = [
    {
      text: '首页',
      icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png',
    },
    {
      text: '分类',
      icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/119490/8/9568/1798/5ef83e95E968c69a6/dd029326f7d5042e.png',
    },
    {
      text: '购物车',
      num: 2,
      icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/130725/4/3157/1704/5ef83e95Eb976644f/b36c6cfc1cc1a99d.png',
    },
    {
      text: '我的',
      icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/147573/29/1603/1721/5ef83e94E1393a678/5ddf1695ec989373.png',
    },
  ];
  
  const [visible, setVisible] = useState(false);

  const change = (value: boolean) => {
    console.log('显示 =>>', value);
  };
  const selected = (item: any, index: number) => {
    console.log('选择菜单 =>>', item);
    Taro.showToast({
      icon: 'success',
      title: `选择了第${index + 1}个`,
    });
  };
  
  return (
    <View className="container">
      <Button
        type="primary"
        onClick={() => {
          Taro.showToast({
            title: '被点击',
          });
        }}
      >
        点击我！
      </Button>
      
      <FixedNav
        data-desc="基础用法"
        options={options}
        position={{ top: '40px' }}
        inactiveText="基础用法"
        onChange={change}
        onSelect={selected}
      />


      <FixedNav
        data-desc="左侧展开"
        options={options}
        direciton="left"
        position={{ top: '140px' }}
        activeText="左侧收起"
        inactiveText="左侧展开"
        onChange={change}
        onSelect={selected}
      />


      <FixedNav
        data-desc="无遮罩层"
        options={options}
        position={{ top: '210px' }}
        overlay={false}
        onChange={change}
        onSelect={selected}
      />

      
      <FixedNav
        data-desc="自定义使用"
        direciton="left"
        position={{ top: '280px' }}
        visible={visible}
        inactiveText="自定义开"
        activeText="自定义关"
        btnIcon={<PlayCycle fill="#fff" />}
        onChange={(value: boolean) => setVisible(value)}
        onSelect={selected}
      >
        {
          new Array(5).fill('').map((_, idx) => {
            return (
              <View
                className="nav_list__item"
                key={idx} 
                onClick={() => {
                  setVisible(false);
                  Taro.showToast({
                    icon: 'success',
                    title: `选择了第${idx + 1}个`,
                  });
                }}
              >
                {idx + 1}
              </View>
            );
          })
        }
      </FixedNav>


      <Drag direction="y" style={{ right: '0px', bottom: '240px' }}>
        <FixedNav
          data-desc="支持拖拽，遮罩层因父级设置transform失效不显示"
          options={options}
          inactiveText="支持拖拽"
          onChange={change}
          onSelect={selected}
        />
      </Drag>
       
    </View>
  );
}
