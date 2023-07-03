import { View, Text, Button } from '@tarojs/components'
import { useWithLogged } from '@/core/hooks';
import { useAccountStore } from '@/common/store';

import './index.scss'
import { routeUtil } from '@/core/utils';

export default function Index() {
  const accountStore = useAccountStore();
  

  const handleClick = useWithLogged(() => {
    console.log('触发操作');
  });

  const handleToLogin = () => {
    routeUtil.toLoginPage();
  }

  return (
    <View className='container'>
      {
        accountStore.isLogged
          ? <Button onClick={accountStore.logout}>退出登录</Button>
          : <Button type='primary' onClick={handleToLogin}>立刻登录</Button>
      }
      
      <Button type='primary' onClick={handleClick}>操作（需登录）</Button>
    </View>
  )
}
