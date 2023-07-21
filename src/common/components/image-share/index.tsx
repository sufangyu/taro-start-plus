import { View, ScrollView, Text } from '@tarojs/components';
import Taro, { pxTransform } from '@tarojs/taro';

import { PosterRender, PosterRenderRef, PosterItemConfig } from '@poster-render/taro-react';
import classNames from 'classnames';
import { useRef, FC } from 'react';

import './index.scss';

interface Props {
  /** 是否显示 */
  visible: boolean;
  /** 宽 */
  width: number;
  /** 高 */
  height: number;
  /** 配置列表 */
  list: PosterItemConfig[];
  // /** 二维码的文本内容 */
  // qrCodeText?: string;

  /** 渲染成功回调 */
  onRender?: () => void;
  /** 保存海报失败回调 */
  onSaveFail?: (err?: any) => void;
  /** 长按事件回调 */
  onLongTap?: () => void;
  /** 保存海报成功回调，h5不支持 */
  onSave?: (url: string) => void;
  /** 渲染失败回调 */
  onRenderFail?: (err?: any) => void;

  /** 取消/关闭分享 */
  onCancel: () => void;
}

const Index:FC<Props> = (props: Props) => {
  const {
    visible,
    width,
    height,
    list,
    onRender,
    onRenderFail,
    onLongTap,
    onSave,
    onSaveFail,
    onCancel,
  } = props;

  const posterRender = useRef<PosterRenderRef>(null);


  const handleSave = async () => {
    Taro.showLoading({
      title: '正在保存...',
    });
    await posterRender.current?.savePosterToPhoto();
  };

  const rootClass = classNames({
    'image-share__wrapper': true,
    'image-share__wrapper--active': visible,
  });


  return (
    <View className={rootClass}>
      <View className="image-share__overlay" />
      <PosterRender
        ref={posterRender}
        canvasId="taro-poster-render"
        renderType="canvas"
        canvasWidth={width}
        canvasHeight={height}
        debug
        style={{
          width: pxTransform(width),
          height: pxTransform(height),
          marginTop: 40,
        }}
        list={list ?? []}
        onRender={onRender}
        onRenderFail={onRenderFail}
        onLongTap={onLongTap}
        onSave={(url) => {
          Taro.showToast({
            title: '保存成功',
            icon: 'success',
          });
            onSave!(url);
        }}
        onSaveFail={(err) => {
          console.warn('', err);
            onSaveFail!(err);

            if ((err?.errMsg as string).includes('cancel')) {
              Taro.hideLoading();
              return;
            }

            Taro.showToast({
              title: '保存失败',
              icon: 'error',
            });
        }}
      />

      <View className="image-share__footer">
        <ScrollView 
          scrollX
          className="image-share__actions__wrapper"
        >
          <View className="image-share__actions">
            <View className="action-item">
              <View className="ic-action" />
              <Text>微信</Text>
            </View>
            <View className="action-item">
              <View className="ic-action" />
              <Text>朋友圈</Text>
            </View>
            <View className="action-item" onClick={handleSave}>
              <View className="ic-action" />
              <Text>保存图片</Text>
            </View>
          </View>
        </ScrollView>
        <View className="image-share__cancel" onClick={onCancel}>取消</View>
      </View>
    </View>
  );
};

Index.defaultProps = {
  onRender: () => {},
  onRenderFail: () => {},
  onLongTap: () => {},
  onSave: () => {},
  onSaveFail: () => {},
};

export default Index;
