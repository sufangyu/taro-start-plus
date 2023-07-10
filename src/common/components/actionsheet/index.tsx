import {
  ButtonProps, CommonEventFunction, ITouchEvent, View, 
} from '@tarojs/components';
import { FC } from 'react';
import classNames from 'classnames';

import Item from './item';
import './index.scss';
import { Action } from './types';

interface Props {
  visible: boolean;
  actions?: Action[];
  /** 标题 */
  title?: string;
  /** 选项上方的描述信息 */
  description?: string;
  /** 子元素 */
  children?: JSX.Element | JSX.Element[];
  /** 取消按钮文字 */
  cancelText?: string;
  /** 是否显示遮罩层 */
  overlay?: boolean;
  /** 点击背景蒙层后是否关闭 */
  closeOnOverlayClick?: boolean;
  /** 是否显示圆角 */
  round?: boolean;
  onClose?: ()=>void;
  onSelect?: (index: number) => void;
  onCancel?: ()=>void;
  
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

const Index: FC<Props> = (props: Props) => {
  const {
    visible,
    actions,
    title,
    description,
    cancelText,
    overlay,
    closeOnOverlayClick,
    round,
    onClose,
    onSelect,
    onCancel,

    onGetUserInfo,
    onGetPhoneNumber,
    onOpenSetting,
    onContact,
    onLaunchApp,
    onChooseAvatar,
    onError,
  } = props;

  const closeActionsheet = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  
  // 选择项
  const handleSelect = (index: number) => {
    if (typeof onSelect === 'function') {
      onSelect(index);
    }
    closeActionsheet();
  };
  
  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
    closeActionsheet();
  };


  const renderChildren = () => {
    const children:JSX.Element[] = [];

    actions?.forEach((item, index) => {
      children.push(
        <Item
          color={item.color}
          subname={item.subname}
          disabled={item.disabled}
          openType={item.openType}
          onClick={() => handleSelect(index)}
          onGetUserInfo={onGetUserInfo}
          onGetPhoneNumber={onGetPhoneNumber}
          onOpenSetting={onOpenSetting}
          onContact={onContact}
          onLaunchApp={onLaunchApp}
          onChooseAvatar={onChooseAvatar}
          onError={onError}
        >{item.name}
        </Item>,
      );
    });

    return children;
  };


  const { children } = props;
  const rootClass = classNames({
    actionsheet: true,
    'actionsheet--active': visible,
    'actionsheet--round': round,
  });

  return (
    <View
      className={rootClass}
      onTouchMove={(ev: ITouchEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
      }}
    >
      {
        // 遮罩层
        overlay && <View
          className="actionsheet__overlay"
          onClick={() => {
            if (closeOnOverlayClick) {
              closeActionsheet();
            }
          }}
        />
      }
      
      <View className="actionsheet__container">
        {
          (title || description)
          && (
            <View className="actionsheet__header">
              <View className="actionsheet__title">{title}</View>
              <View className="actionsheet__description">{description}</View>
            </View>
          )
        }

        <View className="actionsheet__body">
          {actions ? renderChildren() : children}
        </View>

        {
          // 取消按钮
          cancelText && (
            <View className="actionsheet__footer" onClick={handleCancel}>
              {cancelText}
            </View>
          )
        }
      </View>
    </View>
  );
};

Index.defaultProps = {
  title: '',
  description: '',
  overlay: true,
  closeOnOverlayClick: true,
  round: true,
  onClose: () => {},
  onSelect: () => {},
  onCancel: () => {},
  onGetUserInfo: () => {},
};

export default Index;
