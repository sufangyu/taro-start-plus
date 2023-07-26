import { BaseEventOrig, View } from '@tarojs/components';

import {
  ReactNode, useEffect, useRef, useState,
} from 'react';

import { baseUtil, viewUtil } from '@/core/utils';

import Action from './action';
import { PopoverActionItem, PopoverPlacement } from './types';
import './index.scss';


interface Props {
  children: ReactNode;
  /** 主题颜色. 默认 dark */
  theme?: 'dark' | 'light';
  /** 浮层出现位置 */
  placement?: PopoverPlacement;
  /** 初始化是否显示 */
  isShow?: boolean;
  /** 是否显示遮罩层 */
  overlay?: boolean;
  /** 弹出气泡内容. 优先使用 content 自定义内容 */
  actions?: PopoverActionItem[];
  /** 弹出气泡自定义内容 */
  content?: ReactNode;
}

const Index = (props: Props) => {
  const {
    children,
    theme = 'dark', 
    placement = 'bottom',
    actions,
    content,
    isShow = false,
    overlay = true,
  } = props;

  const uuid = baseUtil.uuid();
  const wrapperId = useRef(`popover-wrapper-${uuid}`);
  const contentId = useRef(`popover-content-${uuid}`);
  const [style, setStyle] = useState<string | React.CSSProperties>({});
  const [visibled, setVisibled] = useState(isShow);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    isShow && show();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement]);


  /** 显示 */
  const show = async () => {
    const [wrapperTarget] = await viewUtil.delayQuerySelector(`#${wrapperId.current}`, 0);
    const [contentTarget] = await viewUtil.delayQuerySelector(`#${contentId.current}`, 0);

    const {
      width = 0,
      height = 0,
      top = 0,
      // bottom = 0,
      left = 0,
      right = 0,
    } = wrapperTarget ?? {};
    const { width: contentWidth, height: contentHeight } = contentTarget ?? {};
    const arrowSize = 8 + 2; // 2 = 偏移量

    switch (placement) {
      case 'bottom':
        setStyle({
          top: top + height + arrowSize,
          left: left + width / 2 - contentWidth / 2,
        });
        break;
      case 'bottom-start':
        setStyle({
          top: top + height + arrowSize,
          left,
        });
        break;
      case 'bottom-end':
        setStyle({
          top: top + height + arrowSize,
          right: right - width,
        });
        break;
      case 'top':
        setStyle({
          top: top - contentHeight - arrowSize,
          left: left + width / 2 - contentWidth / 2,
        });
        break;
      case 'top-start':
        setStyle({
          top: top - contentHeight - arrowSize,
          left,
        });
        break;
      case 'top-end':
        setStyle({
          top: top - contentHeight - arrowSize,
          right: right - width,
        });
        break;
      case 'right':
        setStyle({
          left: left + width + arrowSize,
          top: top - contentHeight / 2 + height / 2,
        });
        break;
      case 'right-start':
        setStyle({
          left: left + width + arrowSize,
          top,
        });
        break;
      case 'right-end':
        setStyle({
          left: left + width + arrowSize,
          top: top - contentHeight + height,
        });
        break;
      case 'left':
        setStyle({
          left: left - contentWidth - arrowSize,
          top: top - contentHeight / 2 + height / 2,
        });
        break;
      case 'left-start':
        setStyle({
          left: left - contentWidth - arrowSize,
          top,
        });
        break;
      case 'left-end':
        setStyle({
          left: left - contentWidth - arrowSize,
          top: top - contentHeight + height,
        });
        break;
      default:
        break;
    }

    setVisibled(true);
  };

  /** 隐藏 */
  const hide = (ev:BaseEventOrig) => {
    ev.stopPropagation();
    ev.preventDefault();

    setVisibled(false);
  };


  const renderPopoverContent = (): ReactNode => {
    if (content) {
      return content;
    }

    return actions?.map((item: PopoverActionItem, idx) => {
      return (<Action 
        key={`action-${idx}`}
        action={item}
        isLast={actions.length - 1 === idx}
        onClick={() => {
          typeof item.onClick === 'function' && item.onClick(item, idx);
        }}
      />);
    });
  };


  return (
    <>
      <View
        id={wrapperId.current}
        className="popover__wrapper"
        onClick={show}
        catchMove
      >
        {children}
      </View>


      <View
        role="dialog"
        className={`popover popover--${theme} popover--${placement} ${visibled && 'visibled'}`}
        style={style}
      >
        {!!overlay && <View className="popover__overlay" onTouchStart={hide} />}
        <View id={contentId.current} className={`popover__content ${content ? 'popover__content--custom' : ''}`}>
          {renderPopoverContent()}
        </View>
      </View>
    </>
  );
};

export default Index;
