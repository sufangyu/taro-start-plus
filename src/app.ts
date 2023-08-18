import Taro, {
  useDidShow, useLaunch, useError, useUnhandledRejection, 
} from '@tarojs/taro';

import { PropsWithChildren } from 'react';

import { updateUtil } from '@/core/utils';
import '@/core/analysis';

import './app.scss';


function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log('App launched.');
  });

  
  useDidShow(() => {
    if (Taro.ENV_TYPE.WEB !== Taro.getEnv()) {
      updateUtil.checkUpdate();
    }
  });

  useError((error: string) => {
    console.log('Global Error =>', error);
  });


  useUnhandledRejection((err) => {
    console.log('Global UnhandledRejection =>', err.reason);
  });


  // children 是将要会渲染的页面
  return children;
}

export default App;
