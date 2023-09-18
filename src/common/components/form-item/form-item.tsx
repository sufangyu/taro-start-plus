import { View } from '@tarojs/components';

import classNames from 'classnames';
import { ReactNode } from 'react';

import { Right } from '../icon';

import { FormItemProps } from './types';
import './index.scss';

const Index = (props: FormItemProps) => {
  const {
    children, prefix, extra, label, titleExtra,
    layout = 'horizontal', disabled = false, required = false,
    readOnly = false, content, contentAlign = 'right', arrow = true,
  } = props;

  const rootClasses = classNames({
    'form-item': true,
    [`form-item--${layout}`]: true,
    'form-item--required': required,
    'form-item--disabled': disabled,
    'form-item--readonly': readOnly,
    [`form-item__content--${contentAlign}`]: true,
  });


  function renderTitle():ReactNode {
    if (!prefix && !label) {
      return '';
    }

    return (
      <View className="form-item__title">
        {prefix && <View className="form-item__prefix">{prefix}</View>}
        {label && <View className="form-item__label">{label}</View>}
        {titleExtra && <View className="form-item__title__extra">{titleExtra}</View>}
      </View>
    );
  }

  return (
    <View className={rootClasses}>
      {renderTitle()}

      <View className="form-item__content">
        <View className="form-item__children">
          {readOnly ? content : children}
        </View>
        {(extra && !readOnly) && <View className="form-item__extra">{extra}</View>}

        {
          (readOnly && arrow)
          && <View className="form-item__extra"><Right fill="#999" size={40} /></View>
        }
      </View>

    </View>
  );
};

export default Index;
