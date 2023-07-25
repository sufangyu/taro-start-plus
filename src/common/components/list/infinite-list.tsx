import { ScrollView, View } from '@tarojs/components';

import { ReactNode, useEffect, useState } from 'react';

import { LoadStatusEnum, LoadStatusMessage } from './types';
import './index.scss';


interface Props {
  children?: ReactNode;
  extraClass?: string;
  /** 触发加载事件的滚动触底距离阈值 */
  threshold?: number;
  /** 是否在初始化时立即执行滚动位置检查 */
  immediateCheck?: boolean;
  /** 加载状态 */
  loadStatus: LoadStatusEnum;
  normalText?: ReactNode;
  loadingText?: ReactNode;
  failedText?: ReactNode;
  finishedText?: ReactNode;
  /** 加载更多的回调函数 */
  loadMore?: () => Promise<void>;
}

/**
 * 无限加载列表
 *
 * @param {Props} props
 * @return {*} 
 */
const InfiniteList = (props: Props): ReactNode => {
  const {
    children,
    extraClass = '',
    threshold = 50,
    immediateCheck = true,
    loadStatus = LoadStatusEnum.NORMAL,
    normalText = LoadStatusMessage.normal,
    loadingText = LoadStatusMessage.loading,
    failedText = LoadStatusMessage.failed,
    finishedText = LoadStatusMessage.finished,
    loadMore, 
  } = props;

  const [status, setStatus] = useState<LoadStatusEnum>(loadStatus);

  
  useEffect(() => {
    if (immediateCheck) {
      // eslint-disable-next-line no-use-before-define
      handleLoadMore();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 监听加载状态变化
  useEffect(() => {
    setStatus(loadStatus);
  }, [loadStatus]);


  /** 加载更多 */
  const handleLoadMore = async () => {
    if ([LoadStatusEnum.NORMAL, LoadStatusEnum.FAILED].includes(loadStatus)) {
      typeof loadMore === 'function' && await loadMore();
    }
  };

  /** 加载更多状态 */
  const renderLoadMoreStatus = (): ReactNode => {
    let loadMoreStatus: ReactNode;
    switch (status) {
      case LoadStatusEnum.NORMAL:
        loadMoreStatus = normalText;
        break;
      case LoadStatusEnum.LOADING:
        loadMoreStatus = loadingText;
        break;
      case LoadStatusEnum.FAILED:
        loadMoreStatus = failedText;
        break;
      case LoadStatusEnum.FINISHED:
        loadMoreStatus = finishedText;
        break;
      default:
    }

    return (
      <View
        className="infinite-list__status"
        onClick={() => {
          if (status === LoadStatusEnum.FAILED) {
            handleLoadMore();
          }
        }}
      >
        {loadMoreStatus}
      </View>
    );
  };

  return (
    <ScrollView
      className={`infinite-list ${extraClass}`}
      scrollY
      lowerThreshold={threshold}
      onScrollToLower={handleLoadMore}
    >
      {children}
      {renderLoadMoreStatus()}
    </ScrollView>
  );
};

export default InfiniteList;
