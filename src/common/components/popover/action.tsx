import { Image, View } from '@tarojs/components';

import { PopoverActionItem } from './types';
import './index.scss';


interface Props {
  action: PopoverActionItem;
  isLast?: boolean;
  /** 点击回调函数 */
  onClick?: () => void;
}

const Action = (props: Props) => {
  const { action, isLast, onClick } = props;

  return (
    <View
      className={`popover__action ${action.className ?? ''} ${action.disabled ? 'disabled' : ''} ${!isLast ? 'hairline--bottom' : ''}`}
      style={{
        color: action.color,
      }}
      onClick={() => {
        typeof onClick === 'function' && onClick();
      }}
    >
      {
        !!action.icon
        && (
          <View className="popover__action-icon">
            {typeof action.icon === 'string' ? <Image src={action.icon} /> : action.icon}
          </View>
        )
      }
      <View className="popover__action-text">{action.text}</View>
    </View>
  );
};

export default Action;
