import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import '../index.scss';
import {
  Camera, MediaItem, MediaType, SizeType, 
} from '../types';

interface Props {
  /** 媒体类型. 'image', 'video', 'mix' */
  mediaType?: Array<keyof typeof MediaType>;
  sizeType?: Array<keyof typeof SizeType>;
  camera?: Camera;
  /** 限制总张数. 默认最多9张 */
  limit?: number;
  /** 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间 */
  maxDuration?: number;
  /** item 尺寸. 默认216 */
  size?: number;
  /** item 间距. 默认16 */
  space?: number;
  /** 图片选择成功回调函数 */
  onSuccess: Function;
}

const Uploader = (props: Props) => {
  const {
    limit = 9, onSuccess = () => {}, 
    mediaType = ['image'],
    sizeType = ['compressed'],
    camera = Camera.back,
    maxDuration = 30,
    size,
    space,
  } = props;

  const handleChooseImage = async () => {
    try {
      const result = await Taro.chooseMedia({
        count: limit,
        mediaType,
        maxDuration,
        camera: camera as unknown as string,
        sizeType,
      });
      console.log('chooseMedia result=>>', result);
  
      if (result.errMsg.includes('fail')) {
        Taro.showToast({ title: '文件选择失败, 请重试' });
        return;
      }
  
      const medie: MediaItem[] = [];
      let uploadCount: number = 0;
      // 模拟实现批量上传
      (result.tempFiles || []).forEach(async (file) => {
        // TODO: 具体对接图片上传 api
        medie.push({
          url: file.tempFilePath,
          thumbTemp: file.thumbTempFilePath,
          fileType: file.fileType as any,
        });
        uploadCount += 1;
  
        if (uploadCount >= result.tempFiles.length) {
          onSuccess(medie);
        }
      });
    } catch (_) {}
  };

  return (
    <View
      className="file-uploader"
      onClick={() => {
        handleChooseImage();
      }}
      style={{
        width: size && Taro.pxTransform(size),
        height: size && Taro.pxTransform(size),
        margin: space && Taro.pxTransform(space),
      }}
    />
  );
};

export default Uploader;
