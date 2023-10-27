import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  AddOne, CategoryManagement, Check, CheckOne, Close, CloseOne, CloseSmall, Down, 
  Grid, GridItem, HomeTwo, Left, Minus, People, PlayCycle, Plus, PreviewClose, PreviewOpen, 
  RadioTwo, ReduceOne, Right, Round, ShoppingCart, Star, Up, VolumeNotice, 
} from '@/common/components';
import './index.scss';

export default function Index() {
  const size = 48;
  
  const iconList = [
    { icon: <HomeTwo size={size} />, label: 'HomeTwo' },
    { icon: <People size={size} />, label: 'People' },
    { icon: <ShoppingCart size={size} />, label: 'ShoppingCart' },
    { icon: <CategoryManagement size={size} />, label: 'Category Management' },
    { icon: <Close size={size} />, label: 'Close' },
    { icon: <CloseOne size={size} />, label: 'CloseOne' },
    { icon: <CloseSmall size={size} />, label: 'CloseSmall' },
    { icon: <VolumeNotice size={size} />, label: 'VolumeNotice' },
    { icon: <AddOne size={size} />, label: 'AddOne' },
    { icon: <Right size={size} />, label: 'Right' },
    { icon: <Left size={size} />, label: 'Left' },
    { icon: <Up size={size} />, label: 'Up' },
    { icon: <Down size={size} />, label: 'Down' },
    { icon: <Check size={size} />, label: 'Check' },
    { icon: <CheckOne size={size} />, label: 'CheckOne' },
    { icon: <Round size={size} />, label: 'Round' },
    { icon: <RadioTwo size={size} />, label: 'RadioTwo' },
    { icon: <ReduceOne size={size} />, label: 'ReduceOne' },
    { icon: <PreviewClose size={size} />, label: 'PreviewClose' },
    { icon: <PreviewOpen size={size} />, label: 'PreviewOpen' },
    { icon: <PlayCycle size={size} />, label: 'PlayCycle' },
    { icon: <Star size={size} />, label: 'Star' },
    { icon: <Plus size={size} />, label: 'Plus' },
    { icon: <Minus size={size} />, label: 'Minus' },
  ];


  const copyElement = (tagName: string) => {
    Taro.setClipboardData({
      data: `<${tagName} />`,
    });
  };

  return (
    <View className="container">
      <Grid square>
        {
          iconList.map((it, idx) => (
            <GridItem
              key={idx}
              text={it.label}
              icon={it.icon}
              onClick={() => copyElement(it.label.replace(/\s*/g, ''))}
            />),
          )
        }
      </Grid>

      <View
        style={{
          textAlign: 'center',
          paddingTop: '32px',
          opacity: 0.6,
          fontSize: '12px',
        }}
        data-desc="https://iconpark.oceanengine.com/official"
      >
        该组件是把 iconpark svg 转成 base64 后用 image 显示实现
      </View>
    </View>
  );
}
