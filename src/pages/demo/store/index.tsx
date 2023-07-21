import { View, Text } from '@tarojs/components';

import { useAccountStore } from '@/common/store';

import './index.scss';

export default function Index() {
  const accountStore = useAccountStore();

  return (
    <View className="contaier">
      <Text>全局状态（用户名）：{accountStore.account?.name}</Text>
    </View>
  );
}
