import { ITouchEvent, View } from '@tarojs/components';
import '../index.scss';

interface Props {
  onClick?: (event: ITouchEvent) => void;
}

const ButtonRemove = (props:Props) => {
  return (<View className="button-remove" onClick={props?.onClick} />);
};

export default ButtonRemove;
