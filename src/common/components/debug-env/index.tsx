import { View, Image } from '@tarojs/components';
import { routeUtil } from '@/core/utils';
import { appRouterConfig } from '@/common/router';

import iconDebug from './icon-debug.png';
import './index.scss';

export default function Index() {
  
  // 只处理 微信小程序
  const envVersion = __wxConfig?.envVersion ?? 'release';

  return (
    <View className='debug-env'>
      {
        ['develop', 'trial'].includes(envVersion)
          ? (
            <Image
              src={iconDebug}
              className='debug-env-entry'
              onClick={() => {
                routeUtil.toPage({
                  url: appRouterConfig.switchEnv.path
                });
              }}
            />
          )
          : null
      }
    </View>
  );
}
