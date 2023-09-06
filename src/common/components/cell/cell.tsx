import { Image, View } from '@tarojs/components';

import classNames from 'classnames';
import { ReactNode } from 'react';

import { Right, Down } from '../icon';

import { CellProps } from './types';
import './index.scss';


const Index = (props: CellProps) => {
  const {
    prefix,
    title,
    description,
    extra,
    arrow,
    arrowDirection = 'right',
    suffix,
    center,
    onClick,
  } = props;


  function renderSuffix(): ReactNode {
    const arrowIcon: Record<'right' | 'down', ReactNode> = {
      right: <Right fill="#969799" size={36} />,
      down: <Down fill="#969799" size={36} />,
    };

    return (
      <View className="cell__suffix">
        {
          suffix
            ? (typeof suffix === 'string' ? <Image src={suffix} /> : suffix)
            : arrowIcon[arrowDirection]
        }
      </View>
    );
  }

  const rootClasses = classNames({
    cell: true,
    'cell--center': center,
  });

  return (
    <View
      className={rootClasses}
      onClick={() => {
        typeof onClick === 'function' && onClick();
      }}
    >
      {
        prefix && (
          <View className="cell__prefix">
            {(typeof prefix === 'string' ? <Image src={prefix} /> : prefix) }
          </View>
        )
      }

      <View className="cell__content">
        {title && <View className="cell__title">{title}</View>}
        {description && <View className="cell__description">{description}</View>}
      </View>

      {extra && <View className="cell__extra">{extra}</View>}

      {(arrow || suffix) && renderSuffix()}
    </View>
  );
};

export default Index;
