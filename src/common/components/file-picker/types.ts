
export interface MediaItem {
  id?: string;
  /** 资源地址 */
  url: string;
  /** 封面图. 视频类型才有 */
  thumbTemp?: string;
  /** 文件类型. image、video  */
  fileType?: 'image' | 'video',
}

export enum MediaType {
  /** 只能拍摄图片或从相册选择图片 */
  'image',
  /** 只能拍摄视频或从相册选择视频 */
  'video',
  /** 可同时选择图片和视频 */
  'mix',
}

/** 是否压缩所选文件 */
export enum SizeType {
  'original',
  'compressed',
}

/** 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头 */
export enum Camera {
  'back',
  'front',
}

export interface Sources {
  /** 图片或视频的地址 */
  url: string
  /** 资源的类型（图片或视频），默认值：image */
  type?: 'image' | 'video'
  /** 视频的封面图片 */
  poster?: string
}