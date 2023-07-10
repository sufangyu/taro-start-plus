import { View, Image } from '@tarojs/components';
import { appUtil, routeUtil } from '@/core/utils';
import { appRouterConfig } from '@/common/router';

import iconDebug from './icon-debug.png';
import './index.scss';

export default function Index() {
  const envVersion = appUtil.getConfig()?.envVersion;

  return (
    <View className="debug-env">
      {
        ['develop', 'trial'].includes(envVersion)
          ? (
            <Image
              src={iconDebug}
              className="debug-env-entry"
              onClick={() => {
                routeUtil.toPage({
                  url: appRouterConfig.switchEnv.path,
                });
              }}
            />
          )
          : null
      }
    </View>
  );
}
