import { View } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import classNames from 'classnames';
import { useAccountStore, useDebugStore } from '@/common/store';
import {
  ENV_CODE_DEFAULT, ENV_CURRENT, ENV_MAP, EnvConfig, 
} from '@/common/config/';

import './index.scss';

export default function Index() {
  const accountStore = useAccountStore();
  const debuStore = useDebugStore();
  const [envName, setEnvName] = useState('');
  const [envCode, setEnvCode] = useState('');
  

  useLoad(() => {
    // eslint-disable-next-line no-use-before-define
    setCurrentEnv(ENV_CURRENT!);
  });


  /**
   * 设置当前环境
   *
   * @param {EnvConfig} env
   */
  const setCurrentEnv = (env: EnvConfig) => {
    const { name, code } = env;
    setEnvName(name);
    setEnvCode(code);
  };


  /**
   * 切换环境
   *
   * @param {EnvConfig} env
   */
  const handleSwitchEnv = (env: EnvConfig):void => {
    const { name, code } = env;

    accountStore.logout();
    debuStore.setEnvCode(code);
    setCurrentEnv(env);

    Taro.showModal({
      title: '提示',
      content: `已切换为${name}环境, 请关闭小程序进程重进`,
      showCancel: false,
    });
  };

  /**
   * 重置环境
   *
   */
  const handleResetEnv = ():void => {
    const env = ENV_MAP.find(item => item.code === ENV_CODE_DEFAULT);

    accountStore.logout();
    debuStore.retEnvCode();
    setCurrentEnv(env!);

    Taro.showModal({
      title: '提示',
      content: `已重置默认环境(${env?.name}), 请关闭小程序进程重进`,
      showCancel: false,
    });
  };


  return (
    <View className="container debug-container">
      <View className="env-current">
        <View className="value">{envName}({envCode})</View>
        <View className="label">当前环境</View>
      </View>
      <View className="env-list">
        <View
          className="env-item"
          onClick={handleResetEnv}
        >
          重置默认环境
        </View>
        {
          ENV_MAP.map((env, index) => {
            const key = `env-${index}`;
            const envItemClasses = classNames({
              'env-item': true,
              active: env.code === envCode,
            });

            return (
              <View
                className={envItemClasses}
                key={key}
                onClick={() => handleSwitchEnv(env)}
              >
                {env.name} - { env.code}
              </View>
            );
          })
        }
      </View>
    </View>
  );
}
