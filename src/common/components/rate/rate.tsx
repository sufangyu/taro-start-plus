import { View } from '@tarojs/components';

import { ReactNode, useState } from 'react';

import { BasicComponent, basicComponentDefaults } from '@/core/types';

import { Star } from '../icon';

import { RateProps } from './types';
import './index.scss';

const Index = (props: RateProps & BasicComponent) => {
  const {
    style,
    className,
    color,
    size,
    allowHalf = false,
    allowClear = true,
    count = 5,
    disabled = false,
    showText = false,
    texts = ['极差', '失望', '一般', '满意', '惊喜'],
    defaultValue = 0,
    character,
    characterActive,
    onChange,
  } = {
    ...basicComponentDefaults,
    ...props,
  };

  const iconSize = size ?? 24;
  const [activeColor = '#ED7B2F', defaultColor = '#E3E6EB'] = color || [];
  const [score, setScore] = useState(defaultValue);

  /**
   * 设置评分分数
   * 
   * @param curScore 分数
   * @returns 
   */
  const handleSetScore = (curScore: number) => {
    if (disabled) {
      return;
    }

    const nextScore = allowClear ? (curScore === score ? 0 : curScore) : curScore;
    setScore(nextScore);

    typeof onChange === 'function' && onChange(nextScore);
  };


  const renderHalfContent = (index: number): ReactNode => {
    // 全分是否高亮
    const isActive = (index + 1) <= score;
    // 半分是否高亮
    const isActiveHalf = (index + 0.5) <= score;

    return (
      <>
        <View
          data-half={isActiveHalf}
          className={`rate-star rate-star__half ${isActiveHalf ? 'rate-star--active' : ''}`}
          style={{
            color: color ? (isActiveHalf ? activeColor : defaultColor) : '',
          }}
          onClick={() => {
            handleSetScore(index + 0.5);
          }}
        >
          {
            (character && (isActiveHalf ? (characterActive || character) : character))
            ?? <Star size={iconSize * 2} theme="filled" fill={isActiveHalf ? activeColor : defaultColor} />
          }
        </View>
        <View
          className={`rate-star ${isActive ? 'rate-star--active' : ''}`}
          style={{
            color: color ? (isActive ? activeColor : defaultColor) : '',
          }}
          onClick={() => {
            handleSetScore(index + 1);
          }}
        >
          {
            (character && (isActive ? (characterActive || character) : character))
            ?? <Star size={iconSize * 2} theme="filled" fill={(isActive) ? activeColor : defaultColor} />
          }
        </View>
      </>
    );
  };


  const renderFullContent = (index: number): ReactNode => {
    const isActive = index < score;

    return (
      <View
        className={`rate-star ${isActive ? 'rate-star--active' : ''}`}
        style={{
          color: color ? (isActive ? activeColor : defaultColor) : '',
        }}
        onClick={() => {
          handleSetScore(index + 1);
        }}
      >
        {
          (character && (isActive ? (characterActive || character) : character))
          ?? <Star size={iconSize * 2} theme="filled" fill={isActive ? activeColor : defaultColor} />
        }
      </View>
    );
  };
  
  return (
    <View className={`rate ${className}`} style={style}>
      {
        [...Array(count)].map((_, index) => {
          return (
            <View className="rate-box" key={index}>
              {allowHalf ? renderHalfContent(index) : renderFullContent(index)}
            </View>
          );
        })
      }
      {showText && <View className="rate__text">{texts[Math.ceil(score) - 1]}</View>}
    </View>
  );
};

export default Index;
