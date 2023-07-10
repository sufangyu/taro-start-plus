import { Button, View } from '@tarojs/components';
import { useState } from 'react';
import { useList } from '@/core/hooks';
import { ListStatus } from '@/common/components';
import { List } from '@/common/models';
import { getList } from '@/common/api/test';
import './index.scss';


export default function Index() {
  const time = Date.now();
  const [query, setQuery] = useState({
    time,
    age: 18,
  });

  const {
    list, isLasted, loading, isInit, pagination,
    onSearch, getListNext,
  } = useList<List>({
    initPage: 1,
    initSize: 15,
    query,
    fetch: getList,
  });


  return (
    <View className="container">
      <View className="header">
        <Button
          type="primary"
          size="mini"
          style={{ width: '100%' }}
          onClick={() => {
            // fix: search 的查询条件值为前一次
            const nextQuery = {
              ...query,
              time: Date.now(),
              age: query.age + 1,
            };
            setQuery((prevState) => ({
              ...prevState,
              ...nextQuery,
            }));

            onSearch(nextQuery);
          }}
        >
          参数更改
        </Button>

        <Button
          type="primary"
          size="mini"
          style={{ width: '100%' }}
          onClick={() => {
            getListNext();
          }}
        >
          {`下一页: ${loading} - ${pagination.page}, ${pagination.size}`}
        </Button>
      </View>


      <View className="content">
        {
          list.map((item, index) => {
            const key = `item - ${index}`;
            return (
              <View className="list-item" key={key}>
                {item.title}
              </View>
            );
          })
        }

        {/* 列表状态 */}
        {
          !isInit && <ListStatus text={
            loading
              ? '加载中...'
              : isLasted ? '没有更多了' : '上拉加载上一页'
          }
          />
        }
      </View>  
    </View>
  );
}
