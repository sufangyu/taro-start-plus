import { View, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { routeUtil } from '@/core/utils';
import { EventNameEnum } from '@/common/enums';

import './index.scss';

export default function Index() {
  return (
    <View className="container">
      <Button
        type="primary"
        onClick={() => {
          Taro.eventCenter.trigger(EventNameEnum.刷新列表, {
            name: 'zsf', age: 20,
          });
          routeUtil.back();
        }}
      >
        重新设置用户信息, 返回上一页
      </Button>
    </View>
  );
}
