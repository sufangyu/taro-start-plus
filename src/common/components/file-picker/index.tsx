import { View, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

import ButtonRemove from './components/remove';
import Uploader from './components/uploader';

import './index.scss';
import {
  Camera, MediaItem, MediaType, SizeType, Sources, 
} from './types';


interface Props {
  /** 初始化媒体列表 */
  list: MediaItem[];
  /** 限制总张数. 默认最多9张 */
  limit?: number;
  /** 删除前显示确认弹窗 */
  hasRemoveConfirm?: boolean;
  /** 弹窗提示文案 */
  removeConfirmContent?: string;
  /** 媒体类型. 'image', 'video', 'mix' */
  mediaType?: Array<keyof typeof MediaType>;
  /** 是否压缩所选文件 */
  sizeType?: Array<keyof typeof SizeType>;
  /** 使用前置或后置摄像头 */
  camera?: Camera;
  /** item 尺寸. 默认216 */
  size?: number;
  /** item 间距. 默认16 */
  space?: number;
  /** 图片选择成功回调函数 */
  onChange: (file: MediaItem[]) => void;
}

const Index = (props: Props) => {
  const {
    mediaType,
    sizeType,
    camera,
    list = [],
    limit = 9,
    hasRemoveConfirm = true,
    removeConfirmContent = '确认删除该文件吗？',
    size,
    space,
    onChange = () => {},
  } = props;

  const [files, setFiles] = useState(list);

  useEffect(() => {
    setFiles(list);
  }, [list]);


  /**
   * 预览图片
   *
   * @param {number} index
   */
  const handlePreviewImage = (index: number) => {
    const urls = files.map(image => image.url);
    Taro.previewImage({
      current: urls[index],
      urls,
    });
  };

  /**
   * 预览视频
   * @param index 
   */
  const handlePreviewVideo = (index: number) => {
    const sources: Sources[] = files.map((file) => ({
      url: file.url,
      poster: file.thumbTemp!,
      type: 'video',
    }));

    Taro.previewMedia({
      sources,
      current: index,
      fail() {
        Taro.showToast({ title: '预览视频失败', icon: 'none' });
      },
    });
  };

  /**
   * 删除图片
   *
   * @param {number} index
   * @return {*} 
   */
  const handleRemove = async (index: number): Promise<void> => {
    let cancel = false;
    if (hasRemoveConfirm) {
      const result = await Taro.showModal({
        // title: '提示',
        content: removeConfirmContent,
      });
      cancel = result.cancel;
    }

    if (hasRemoveConfirm && cancel) {
      return;
    }

    const newImages = files.filter((_item, idx) => idx !== index);
    setFiles(() => newImages);
    onChange(newImages);
  };

  /**
   * 上传成功回调
   *
   * @param {IImage[]} res
   */
  const handleUploadSuccess = (res: MediaItem[]) => {
    const newFiles = files.concat([...res]);
    setFiles(() => newFiles);
    onChange(newFiles);
  };

  /**
   * 渲染 图片预览图列表
   *
   */
  const renderList = () => {
    return files.map((file, idx) => {
      const key = `file-picker-${idx}`;

      return (
        <View
          className="file-item"
          key={key}
          onClick={() => {
            file.fileType === 'video'
              ? handlePreviewVideo(idx)
              : handlePreviewImage(idx);
          }}
          style={{
            width: size && Taro.pxTransform(size),
            height: size && Taro.pxTransform(size),
            margin: space && Taro.pxTransform(space),
          }}
        >
          <Image mode="aspectFill" src={file.fileType === 'video' ? file.thumbTemp! : file.url} />
          <ButtonRemove
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(idx);
            }}
          />
        </View>
      );
    });
  };

  return (
    <View className="file-picker">
      {renderList()}

      {
        files.length < limit
          ? (
            <Uploader
              mediaType={mediaType}
              sizeType={sizeType}
              camera={camera}
              limit={limit - files.length}
              size={size}
              space={space}
              onSuccess={(res: MediaItem[]) => {
                handleUploadSuccess(res);
              }}
            />
          )
          : null
      }
    </View>
  );
};

export default Index;
