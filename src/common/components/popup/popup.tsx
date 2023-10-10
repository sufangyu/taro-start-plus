import { Image, View } from '@tarojs/components';

import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';

import { appUtil } from '@/core/utils';

import './index.scss';


interface Props {
  children: ReactNode;
  /** 是否显示弹出层 */
  visible: boolean;
  /** 拓展自定义 className */
  extraClass?: string;
  /** z-index 层级. 默认 100 */
  zIndex?: number;
  /** 组件的内联样式, 可以动态设置的内联样式 */
  style?: React.CSSProperties;
  /** 组件不可见时，卸载内容. 默认 false */
  destroyOnClose?: boolean;
  /** 是否显示遮罩层. 默认 true */
  overlay?: boolean;
  /** 点击背景蒙层后是否关闭 */
  closeOnOverlayClick?: boolean;
  /** 弹出位置，可选值为 center top bottom right left */
  position?: 'center' | 'top' | 'bottom' | 'right' | 'left';
  /** 是否显示圆角 */
  round?: boolean;
  /** 简单模式. 主内容没有内边距 */
  simple?: boolean;
  /** 标题 */
  title?: ReactNode;
  /** 是否显示关闭按钮 */
  closeable?: boolean;
  /** 关闭图标组件或图片资源链接 */
  closeIcon?: string | ReactNode;
  /** 关闭图标位置，可选值为 top-right top-left bottom-left bottom-right */
  closeIconPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** 扩展内容 */
  extra?: ReactNode;
  /** 是否锁定背景滚动 */
  lockScroll?: boolean;
  /** 是否留出顶部安全距离 */
  safeAreaInsetTop?: boolean;
  /** 是否留出底部安全距离 */
  safeAreaInsetBottom?: boolean;
  /** 完全打开时触发 */
  onOpened?: () => void;
  /** 完全关闭时触发 */
  onClosed?: () => void;
}

const systenInfo = appUtil.getSystemInfo();

const Index = (props: Props) => {
  const {
    children,
    visible,
    extraClass,
    style = {},
    zIndex = 100,
    title, 
    destroyOnClose = false,
    closeable = false,
    closeIcon,
    extra,
    closeIconPosition = 'top-right', 
    overlay = true, 
    simple = false,
    closeOnOverlayClick = true,
    position = 'center',
    round = false,
    lockScroll = true, 
    safeAreaInsetTop = false,
    safeAreaInsetBottom = true,
    onOpened,
    onClosed,
  } = props;

  const [showChildren, setShowChildren] = useState(true);


  useEffect(() => {
    if (visible) {
      if (destroyOnClose) {
        setShowChildren(true);
      }
      typeof onOpened === 'function' && onOpened();
    }
  }, [visible, onOpened, destroyOnClose]);


  // 关闭事件, 触发关闭回调
  const close = () => {
    if (destroyOnClose) {
      setTimeout(() => {
        setShowChildren(false);
      }, 300);
    }
    typeof onClosed === 'function' && onClosed();
  };

  // 遮罩层点击
  const handleOverlayClick = (): void => {
    if (closeOnOverlayClick) {
      close();
    }
  };

  // 关闭按钮
  const handleCloseClick = (): void => {
    close();
  };
  

  // 处理 safePaddingTop 下内容的 top
  let safePaddingTop: number | undefined;
  if (safeAreaInsetTop && ['top', 'left', 'right'].includes(position)) {
    safePaddingTop = systenInfo?.statusBarHeight ?? undefined;
  }


  // 处理 safePaddingTop、safaPaddingBottom 关闭按钮的位置 
  let safeCloseIconPosition: number;
  if (safeAreaInsetTop && ['top-right', 'top-left'].includes(closeIconPosition)) {
    safeCloseIconPosition = (systenInfo?.statusBarHeight ?? 0) + (16 / 2) + 2;
  }


  function renderHeader():ReactNode {
    // (title || closeable || extra) && 
    return (
      <>
        {
          (title || extra) && (
            <View className={`popup__header icon-close--${closeIconPosition}`}>
              {title && <View>{title}</View>}
              {extra && <View className="popup__header__extra">{extra}</View>}
            </View>
          )
        }
        {closeable && (
          closeIcon
            ? (
              // 自定义图标
              <View
                onClick={handleCloseClick}
                className={`icon-close--custom  icon-close--${closeIconPosition}`}
                style={{
                  top: safeAreaInsetTop ? safeCloseIconPosition : undefined,
                }}
              >
                {typeof closeIcon === 'string' ? <Image src={closeIcon} /> : closeIcon}
              </View>
            )
            : <View
                onClick={handleCloseClick}
                className={`icon-close icon-close--${closeIconPosition}`}
                style={{
                  top: safeAreaInsetTop ? safeCloseIconPosition : undefined,
                }}
            />
        )}
      </>
    );
  }

  const popupRootClass = classNames({
    popup: true,
    [`popup--${position}`]: true,
    'popup--round': round,
    'popup--simple': simple,
    'popup--active': visible,
    'popup--safe-top': safeAreaInsetTop,
    'popup--safe-bottom': safeAreaInsetBottom,
    [`${extraClass}`]: extraClass,
  });


  return (
    <View className={popupRootClass}>
      {overlay && (
        <View 
          className="popup__overlay"
          style={{ zIndex }}
          onClick={handleOverlayClick}
          catchMove={lockScroll}
        />
      )}
      <View
        className="popup__wrapper"
        style={{
          zIndex: zIndex + 1,
          paddingTop: safePaddingTop,
        }}
        catchMove={lockScroll}
      >
        {renderHeader()}
        <View className="popup__body" style={style}>
          {showChildren ? children : ''}
        </View>
      </View>
    </View>
  );
};

export default Index;
