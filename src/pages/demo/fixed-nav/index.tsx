import { Button, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import {
  Badge,
  CategoryManagement,
  Drag, FixedNav, HomeTwo, People, PlayCycle, ShoppingCart, 
} from '@/common/components';

import './index.scss';

export default function Index() {
  const options = [
    {
      text: '首页',
      icon: <HomeTwo />,
    },
    {
      text: '分类',
      icon: <CategoryManagement />,
    },
    {
      text: '购物车',
      num: 2,
      icon: <Badge count={25} offset={[4, -16]}><ShoppingCart /></Badge>,
    },
    {
      text: '我的',
      icon: <People />,
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
