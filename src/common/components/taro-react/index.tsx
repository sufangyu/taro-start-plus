import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  memo,
} from 'react';
import { nextTick, previewImage } from '@tarojs/taro';
import { PosterRenderCore, PosterItemConfig } from '@poster-render/taro/src';
import { Image, View } from '@tarojs/components';
import type { PosterRenderProps, PosterRenderRef } from './types';
import { PosterRenerCanvas } from './canvas';

const PosterRenderReact: ForwardRefRenderFunction<
  PosterRenderRef,
  PosterRenderProps
> = (props, ref) => {
  const posterRenderCore = useRef<PosterRenderCore>();
  const [url, setUrl] = useState<string>();

  const {
    canvasId, canvasWidth, canvasHeight, destWidth, destHeight,
    quality, fileType, dpr, debug, list, renderType, style, className,
    onRenderFail, onSave, onSaveFail, onLongTap,
  } = props;

  useEffect(() => {
    nextTick(async () => {
      setTimeout(async () => {
        const poster = new PosterRenderCore({
          id: canvasId || 'taro-poster-render',
          width: canvasWidth,
          height: canvasHeight,
          destWidth,
          destHeight,
          quality: quality || 1,
          fileType: fileType || 'png',
          dpr,
          debug,
          onRender: (urlRes) => {
            props?.onRender?.(urlRes!);
            setUrl(urlRes || '');
          },
          onRenderFail,
          onSave,
          onSaveFail,
        });
  
        await poster.init();
        await poster.preloadImage(list);
        poster.clearCanvas();
        await poster.render(list, renderType);
  
        posterRenderCore.current = poster;
      }, 50);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // const { list, renderType } = props;
    posterRenderCore.current?.clearCanvas();
    posterRenderCore.current?.render(list, renderType);
  // eslint-disable-next-line react-hooks/exhaustive-deps, react/destructuring-assignment
  }, [props.list]);

  useImperativeHandle(ref, () => ({
    savePosterToPhoto: async () => posterRenderCore.current?.savePosterToPhoto?.(),
    preview: async () => {
      try {
        if (posterRenderCore.current) {
          const res = await posterRenderCore.current?.canvasToTempFilePath();
          await previewImage({ urls: [res], current: res });
        }
      } catch (_) {}
    },
    render: async (
      config?:
        | PosterItemConfig[]
        | ((instance: PosterRenderCore) => PosterItemConfig[]),
    ) => {
      posterRenderCore.current?.clearCanvas();
      return posterRenderCore.current?.render(
        config || list,
        renderType,
      );
    },
  }));

  if (renderType === 'canvas') {
    return (
      <PosterRenerCanvas
        className={className}
        style={style}
        id={canvasId}
        width={canvasWidth}
        height={canvasHeight}
        onLongTap={onLongTap}
      />
    );
  }

  return (
    <View
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      <PosterRenerCanvas
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
        }}
        id={canvasId}
        width={canvasWidth}
        height={canvasHeight}
      />
      {url && (
        <Image
          src={url}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
          onLongPress={() => props?.onLongTap?.(url)}
          // eslint-disable-next-line react/destructuring-assignment
          showMenuByLongpress={props.showMenuByLongpress}
        />
      )}
    </View>
  );
};

function isEqual(prevList: PosterItemConfig[], nextList: PosterItemConfig[]) {
  if (prevList.length !== nextList.length) {
    return false;
  }

  // @ts-ignore
  // eslint-disable-next-line no-restricted-syntax
  for (const [i, item] of prevList.entries()) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(item)) {
      if (typeof v === 'function' || v !== nextList[i][k]) {
        return false;
      }
    }
  }

  return true;
}

// @ts-ignore
export const PosterRender = memo(
  forwardRef(PosterRenderReact),
  (prev, next) => {
    if (next.disableRerender) {
      return true;
    }

    if (typeof prev.list === 'function' || typeof next.list === 'function') {
      return false;
    }

    return isEqual(prev.list, next.list);
  },
);

export type { PosterRenderProps, PosterRenderRef, PosterItemConfig };
