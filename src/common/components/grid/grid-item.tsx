import { Image, View } from '@tarojs/components';

import { GridItemProps } from './types';
import './index.scss';


const Index = (props: GridItemProps) => {
  const {
    text, icon, onClick, style, 
  } = props;

  return (
    <View
      className="grid-item"
      style={style}
      onClick={() => {
        typeof onClick === 'function' && onClick();
      }}
    >
      <View className="grid-item__content">
        {
          icon && (
            <View className="grid-item__icon">
              {
                typeof icon === 'string'
                  ? <Image src="icon" />
                  : icon
              }
            </View>
          )
        }
        {text && <View className="grid-item__text">{text}</View>}
      </View>
    </View>
  );
};

export default Index;
