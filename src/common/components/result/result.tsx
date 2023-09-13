import { Image, View } from '@tarojs/components';

import { ReactNode } from 'react';

import {
  icSuccess, icInfo, icWaiting, icError, icWarning, 
} from './imags';
import { ResultProps, ResultStatus } from './types';
import './index.scss';


const imageRecord: Record<ResultStatus, string> = {
  success: icSuccess,
  info: icInfo,
  waiting: icWaiting,
  error: icError,
  warning: icWarning,
};

const Index = (props: ResultProps) => {
  const {
    status = 'info', title, description, icon, actions,
  } = props;

  function renderIcon(): ReactNode {
    let imageNode: ReactNode;
    if (icon) {
      imageNode = typeof icon === 'string'
        ? <Image src={icon} />
        : icon;
    } else {
      imageNode = <Image src={imageRecord[status]} />;
    }
    return <View className="result__icon">{imageNode}</View>;
  }
  
  return (
    <View className={`result result--${status}`}>
      {renderIcon()}
      {title && <View className="result__title">{title}</View>}
      {description && <View className="result__description">{description}</View>}
      {actions && <View className="result__actions">{actions}</View>}
    </View>
  );
};

export default Index;
