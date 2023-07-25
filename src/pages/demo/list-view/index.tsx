import { View } from '@tarojs/components';

import { useState } from 'react';

import { InfiniteList, PullRefresh, LoadStatusEnum } from '@/common/components';

import './index.scss';

let loadCount = 0;
let timer: NodeJS.Timeout | undefined;

function sleep(time: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => {
    timer && clearTimeout(timer);
    timer = setTimeout(resolve, time);
  });
}

export default function Index() {
  const [loadStatus, setLoadStatus] = useState<LoadStatusEnum>(LoadStatusEnum.NORMAL);
  const [data, setData] = useState<number[]>([]);
  

  const handleLoadMore = async (isRefresh = false) => {
    console.log(isRefresh ? '发起刷新请求' : '发起加载下一页请求');

    try {
      setLoadStatus(LoadStatusEnum.LOADING);
      await sleep(2500);

      const list: number[] = [];
      for (let i = 0; i < 15; i += 1) {
        list.push(
          isRefresh
            ? (i + 1)
            : data.length + (i + 1),
        );
      }

      isRefresh ? setData([...list]) : setData([...data, ...list]);

      if (Math.random() > 0.5) {
        throw new Error('mock request failed');
      }

      loadCount += 1;
      if (loadCount >= 5) {
        setLoadStatus(LoadStatusEnum.FINISHED);
      } else {
        setLoadStatus(LoadStatusEnum.NORMAL);
      }
    } catch (error) {
      setLoadStatus(LoadStatusEnum.FAILED);
    }
  };

  return (
    <View className="container safe-area-bottom">
      <View className="content-placeholder">其他内容</View>

      <PullRefresh
        disabled={data.length === 0}
        onRefresh={async () => {
          // console.log('发起 API 请求');
          // await sleep(2500);
          // console.log('API 请求完成, 更新数据');
          loadCount = 0;
          await handleLoadMore(true);
        }}
        // // 自定义提示文案
        // pullingText="用力拉"
        // canReleaseText="松开吧"
        // refreshingText="玩命加载中..."
        // completeText="好啦"
      >
        <InfiniteList
          loadStatus={loadStatus}
          loadMore={handleLoadMore}
        >
          {
            (data ?? []).map((item, idx) => {
              return (
                <View
                  key={idx}
                  className="list-placeholder" 
                  style={{ background: idx % 2 === 0 ? '#f5f5f5' : '' }}
                >
                  列表item占位 — {item}
                </View>
              );    
            })
          }
        </InfiniteList>
      </PullRefresh>      
    </View>
  );
}
