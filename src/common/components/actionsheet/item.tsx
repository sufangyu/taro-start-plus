import {
  Button, View, ButtonProps, CommonEventFunction, 
} from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';
import { Action } from './types';

interface Props extends Action {
  /** 子元素 */
  children?: JSX.Element | JSX.Element[] | string;
  /** 点击触发时间 */
  onClick?: Function;
  /** 用户点击该按钮时，会返回获取到的用户信息 */
  onGetUserInfo?: CommonEventFunction<ButtonProps.onGetUserInfoEventDetail>;
  /** 获取用户手机号回调 */
  onGetPhoneNumber?: CommonEventFunction<ButtonProps.onGetPhoneNumberEventDetail>;
  /** 在打开授权设置页后回调 */
  onOpenSetting?: CommonEventFunction<ButtonProps.onOpenSettingEventDetail>;
  /** 客服消息回调 */
  onContact?: CommonEventFunction<ButtonProps.onContactEventDetail>;
  /** 打开 APP 成功的回调 */
  onLaunchApp?: CommonEventFunction;
  /** 获取用户头像回调 */
  onChooseAvatar?: CommonEventFunction;
  /** 当使用开放能力时，发生错误的回调 */
  onError?: CommonEventFunction;
}

const Index = (props: Props) => {
  const {
    color, subname, disabled, openType,
    onClick,
    onGetUserInfo,
    onGetPhoneNumber,
    onOpenSetting,
    onContact,
    onLaunchApp,
    onChooseAvatar,
    onError,
  } = props;

  const handleClick = (): void => {
    if (disabled) {
      return;
    }

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  const { children } = props;
  const rootClass = classNames({
    actionsheet__item: true,
    'actionsheet__item--disabled': disabled,
    'actionsheet__item--open': openType,
  });

  return (
    <View
      className={rootClass}
      onClick={handleClick}
    >
      {
        openType
          ? (
            <Button
              openType={openType}
              onGetUserInfo={onGetUserInfo}
              onGetPhoneNumber={onGetPhoneNumber}
              onOpenSetting={onOpenSetting}
              onContact={onContact}
              onLaunchApp={onLaunchApp}
              onChooseAvatar={onChooseAvatar}
              onError={onError}
            >
              { children}
            </Button>
          )
          : (
            <>
              <View style={{ color }}>
                { children}
              </View>
              {subname && <View className="subname">{subname}</View>}
            </>
          )
      }
    </View>
  );
};

export default Index;
