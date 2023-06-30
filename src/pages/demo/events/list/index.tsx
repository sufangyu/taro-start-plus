import { View, Button } from '@tarojs/components'
import { useState } from 'react'
import { routeUtil } from '@/core/utils';
import { appRouterConfig } from '@/common/router';
import { useEvents } from '@/core/hooks';
import { EventNameEnum } from '@/common/enums';

import './index.scss'


export default function Index() {
  const [person, setPerson] = useState({
    name: '张三疯',
    age: 18,
  });

  useEvents<{name: string; age: number}>(EventNameEnum.刷新列表, (args) => {
    console.log('监听用户信息=>>', args);
    setPerson((prevState) => ({
      ...prevState,
      name: args.name,
      age: args.age
    }));
  });

  return (
    <View className='container'>
      <View>姓名：{person.name}，年龄：{person.age}</View>
      <Button
        type='primary'
        onClick={() => {
          routeUtil.toPage({
            url: appRouterConfig.eventsDetail.path,
          })
        }}
      >
        查看详情
      </Button>
    </View>
  )
}
