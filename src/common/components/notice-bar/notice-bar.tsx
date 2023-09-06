import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { baseUtil, viewUtil } from '@/core/utils';

import {
  VolumeNotice, Right, CloseSmall, 
} from '../icon';

import { NoticeBarProps, NoticeBarTheme } from './types';
import './index.scss';


const themeConfig: Record<NoticeBarTheme, {color: string; background: string}> = {
  info: {
    color: '#333',
    background: '#f2f3ff',
  },
  success: {
    color: '#00c267',
    background: '#e3f9e9',
  },
  warning: {
    color: '#ed6a0c',
    background: '#fffbe8',
  },
  error: {
    color: '#f80c2e',
    background: '#fff0ed',
  },
};


const Index = (props: NoticeBarProps) => {
  const {
    theme = 'info', color, background, mode,
    content, icon, showPrefix = true, extra,
    delay = 1, speed = 60, scrollable = true, wrapable = false,
    onClick, onClose,
  } = props;


  const uuid = baseUtil.uuid();
  const wrapId = useRef(`notice-bar-wrap-${uuid}`);
  const contentId = useRef(`notice-bar-content-${uuid}`);

  const wrapWidth = useRef(0);
  const contentWidth = useRef(0);
  const duration = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const animation = useRef<Taro.Animation | null>(null);
  const resetAnimation = useRef<Taro.Animation>(
    Taro.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    }),
  );
  const [animationData, setAnimationData] = useState({});
  const [visible, setVisible] = useState(true);

  const rootClasses = classNames({
    'notice-bar': true,
    [`notice-bar--${theme}`]: true,
    'notice-bar--wrapable': wrapable,
  });


  const scroll = (isInit = false) => {
    timer.current && clearTimeout(timer.current);
    timer.current = null;

    // 重置
    setAnimationData(
      resetAnimation.current
        .translateX(isInit ? 0 : wrapWidth.current)
        .step()
        .export(),
    );

    // 新一轮动画
    requestAnimationFrame(() => {
      setAnimationData(
        animation.current!
          .translateX(-contentWidth.current)
          .step()
          .export(),
      );
    });

    timer.current = setTimeout(() => {
      scroll();
    }, duration.current);
  };


  useEffect(() => {
    requestAnimationFrame(() => {
      Promise.all([
        viewUtil.delayQuerySelector(`#${contentId.current}`, 0),
        viewUtil.delayQuerySelector(`#${wrapId.current}`, 0),
      ]).then((rects) => {
        const [[contentRect], [wrapRect]] = rects;
        if (
          !scrollable
          || contentRect == null
          || wrapRect == null
          || !contentRect.width
          || !wrapRect.width
        ) {
          return;
        }
      
        if (scrollable && contentRect.width > wrapRect.width) {
          const curDuration = ((wrapRect.width + contentRect.width) / speed) * 1000;
        
          wrapWidth.current = wrapRect.width;
          contentWidth.current = contentRect.width;
          duration.current = curDuration;
          animation.current = Taro.createAnimation({
            duration: duration.current,
            timingFunction: 'linear',
            delay,
          });

          scroll(true);
        }
      });
    });

    return () => {
      timer.current && clearTimeout(timer.current);
      timer.current = null;
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, scrollable, speed]);


  const renderPrefix = () => {
    return (
      typeof icon === 'string' ? <Image src={icon} /> : icon
    ) ?? <VolumeNotice fill={themeConfig[theme].color} size={32} />;
  };


  return visible && (
    <View
      role="alert"
      className={rootClasses}
      style={{
        color: color ?? themeConfig[theme].color,
        backgroundColor: background ?? themeConfig[theme].background,
      }}
      onClick={(ev) => {
        // console.log(ev);
        typeof onClick === 'function' && onClick(ev);
      }}
    >
      {
        showPrefix && (
          <View className="notice-bar__prefix">
            {renderPrefix()}
          </View>
        )
      }

      <View id={wrapId.current} className="notice-bar__wrap">
        <View
          id={contentId.current}
          className={`notice-bar__content ${(wrapable || scrollable) ? '' : 'ellipsis'}`}
          animation={animationData}
        >
          {content}
        </View>
      </View>

      <View className="notice-bar__extra">
        {extra}
        {
          mode === 'link'
            && <Right className="icon-action" fill={themeConfig[theme].color} size={32} />
        }
        {
          mode === 'closeable'
            && <CloseSmall
              className="icon-action"
              fill={themeConfig[theme].color}
              size={32}
              onClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();

                setVisible(false);

                if (typeof onClose === 'function' && mode === 'closeable') {
                  timer.current && clearTimeout(timer.current);
                  timer.current = null;
                  
                  onClose(ev);
                }
              }}
            />
        }
      </View>
    </View>
  );
};

export default Index;
