import { View, Text } from '@tarojs/components';
import { useList } from '@/core/hooks';
import { List } from '@/common/models';
import { getList } from '@/common/api/test';
import { ListStatus } from '@/common/components';

import './index.scss';


export default function Index() {
  const {
    list, isLasted, loading, isInit, 
  } = useList<List>({
    initSize: 10,
    fetch: getList,
  });

  const listStatusText = loading
    ? '加载中...'
    : (isLasted ? '没有更多了' : '上拉加载上一页');

  return (
    <View className="container">
      <View className="header">固定内容</View>

      <View className="content">
        {
          list.map((item, idx) => {
            const key = `key-${idx}`;
            return (
              <View
                className="list"
                key={key}
              >
                <Text>{item.title}</Text>
              </View>
            );
          })
        }

        {
          !isInit && <ListStatus text={listStatusText} />
        }
      </View>

    </View>
  );
}
