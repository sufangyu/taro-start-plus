/** 下拉刷新状态枚举 */
export enum PullStatusEnum {
  /** 下拉拖拽中 */
  PULLING = 'pulling',
  /** 可以释放触发加载 */
  CAN_RELEASE = 'canRelease',
  /** 刷新中 */
  REFRESHING = 'refreshing',
  /** 刷新完成 */
  CPMPLETE = 'complete',
}


/** 下拉刷新状态描述 */
export const PullStatusMessage = {
  pulling: '下拉刷新',
  canRelease: '释放立即刷新',
  refreshing: '加载中...',
  complete: '刷新成功',
};


/** 上拉加载状态枚举 */
export enum LoadStatusEnum {
  /** 常规 */
  NORMAL = 'normal',
  /** 加载中 */
  LOADING = 'loading',
  /** 加载失败 */
  FAILED = 'failed',
  /** 加载完, 没有更多 */
  FINISHED = 'finished',
}


/** 上拉加载状态描述 */
export const LoadStatusMessage = {
  normal: '加载下一页',
  loading: '加载中...',
  failed: '加载失败, 点击重试',
  finished: '没有更多了',
};
