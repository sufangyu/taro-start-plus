import {View, Text, Button} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import {useAccountStore} from "@/common/store";

import './index.scss'

export default function Index() {

  const accountStore = useAccountStore();


  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='container'>
      <View>
        <Text>我的页面</Text>
      </View>

      {
        accountStore.isLogged &&
        <View>
          <View>name: {accountStore.account?.name}</View>
          <View>token: {accountStore.account?.token}</View>

          <Button type='primary' onClick={()=> accountStore.logout()}>退出登录</Button>
        </View>
      }

      {
        !accountStore.isLogged &&
        <View>
          <Button
            type='primary'
            onClick={()=> {
              const account = {
                token:'token-xxx-?-yy-asd-zs',
                name: '张三疯',
                age: 18
              };
              accountStore.login(account);
            }}
          >登录</Button>
        </View>
      }

    </View>
  )
}
