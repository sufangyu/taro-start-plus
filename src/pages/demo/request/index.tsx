import { View, Button } from '@tarojs/components';
import {
  getList as getApi, deleteApi, postApi, putApi, requestEnv, 
} from '@/common/api/test';

import './index.scss';


export default function Index() {
  return (
    <View className="container">
      <View>
        <Button type="primary" onClick={() => getApi({ page: 1 })}>GET 请求</Button>
        <Button type="primary" onClick={() => postApi()}>POST 请求</Button>
        <Button type="primary" onClick={() => putApi()}>PUT 请求</Button>
        <Button type="primary" onClick={() => deleteApi()}>DELETE 请求</Button>
        <Button type="primary" onClick={() => requestEnv()}>环境配置</Button>
      </View>
    </View>
  );
}
