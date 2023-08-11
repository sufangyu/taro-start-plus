import { View, Image } from '@tarojs/components';

import classNames from 'classnames';
import { ReactNode } from 'react';


import { StepItemProps, StepStatus } from './props';

import './index.scss';


const Index = (props: StepItemProps) => {
  const {
    title, description, children, icon,
    status = 'default', index = 0, theme,
  } = props;

  const classes = classNames({
    'steps-item': true,
    [`steps-item--${status}`]: true,
  });
  
  /**
   * 渲染指示器
   * @returns 
   */
  function renderIndicator():ReactNode {
    if (theme === 'default') {
      if (icon) {
        const iconContent = typeof icon === 'string'
          ? <Image src={`${icon}`} mode="aspectFill" />
          : icon;
        return (
          <View className="steps-item__icon">
            {iconContent}
          </View>
        );
      }

      return (
        <View className="steps-item__circle">
          {
            (['finish', 'error'] as StepStatus[]).includes(status)
              ? <View className={`steps-item__indicator--${status}`} />
              : (index + 1)
          }
        </View>
      );
    }

    return <View className="steps-item__dot" />;
  }

  return (
    <View className={classes}>
      <View className="steps-item__indicator">
        {renderIndicator()}
      </View>
      <View className="steps-item__content">
        <View className="steps-item__title">{title}</View>
        <View className="steps-item__description">
          {description}
          {children}
        </View>
      </View>
    </View>
  );
};

export default Index;
