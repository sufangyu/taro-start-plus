import { View, Image } from '@tarojs/components';

import { SwipeActionOption } from './types';

import './index.scss';

interface Props {
  option: SwipeActionOption;
  onClick?: () => void;
}

const SwipeAction = (props: Props) => {
  const { option, onClick } = props;
  return (
    <View
      className="swipe-action"
      style={option.style}
      onClick={() => { onClick && onClick(); }}
    >
      {
        !!option.icon && (
          typeof option.icon === 'string'
            ? <View className="swipe-action__icon"><Image src={option.icon!} /></View>
            : <View className="swipe-action__icon">{option.icon}</View>
        )
      }
      <View className="swipe-action__name">{option.text}</View>
    </View>
  );
};


export default SwipeAction;
