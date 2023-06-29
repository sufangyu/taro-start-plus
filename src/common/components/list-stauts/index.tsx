import { View } from '@tarojs/components';
import './index.scss';

interface Props {
  /** 提示文案 */
  text: string;
}

/**
 * 列表状态组件
 * @param props 
 * @returns 
 */
const Index = (props: Props) => {
  return (
    <View className='list-status'>
      {props.text}
    </View>
  );
};

export default Index;
