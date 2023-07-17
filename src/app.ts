import { PropsWithChildren } from 'react';
import Taro, { useDidShow, useLaunch } from '@tarojs/taro';
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

  // children 是将要会渲染的页面
  return children;
}

export default App;
