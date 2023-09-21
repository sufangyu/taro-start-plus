import { Image, View } from '@tarojs/components';

import { ReactNode, useEffect, useState } from 'react';

import { Left, Right } from '../icon';

import { FixedNavProps } from './types';
import './index.scss';


const Index = (props: FixedNavProps) => {
  const {
    children, direciton = 'right', visible = false, overlay = true, options = [],
    inactiveText = '快速导航', activeText = '收起导航', btnIcon,
    position = { top: 'auto', bottom: 'auto' }, onChange, onSelect,
  } = props;

  const [navShow, setNavShow] = useState(visible);

  useEffect(() => {
    setNavShow(visible);
  }, [visible]);


  const toggle = (value: boolean) => {
    setNavShow(value);
    typeof onChange === 'function' && onChange(value);
  };


  function renderMenu(): ReactNode {
    return (
      <View className="fixed-nav__menu ">
        {
        options.map((option, idx) => {
          return (
            <View
              className="menu-item"
              key={idx}
              onClick={() => {
                toggle(false);
                typeof onSelect === 'function' && onSelect(option, idx);
              }}
            >
              {
                option.icon && (
                  <View className="menu-item__icon">
                    {typeof option.icon === 'string' ? <Image src={option.icon} /> : option.icon}
                  </View>
                )
              }
              <View className="menu-item__text">{option.text}</View>
            </View>
          );
        })
      }
      </View>
    );
  }
  
  return (
    <View
      className={`fixed-nav fixed-nav--${direciton} ${navShow ? 'active' : ''}`}
      style={{
        top: position.top,
        bottom: position.bottom,
      }}
    >
      {overlay && <View className="fixed-nav__overlay" onClick={() => toggle(false)} />}

      <View
        className="fixed-nav__btn"
        onClick={() => {
          toggle(!navShow);
        }}
      >
        <View className="btn-icon">
          {btnIcon ?? (direciton === 'right' ? <Left strokeWidth={3} fill="#fff" size={48} /> : <Right strokeWidth={3} fill="#fff" size={48} />)}
        </View>
        <View className="btn-text">{ navShow ? activeText : inactiveText}</View>
      </View>
      {children ? <View className="fixed-nav__menu ">{children}</View> : renderMenu()}
    </View>
  );
};

export default Index;
