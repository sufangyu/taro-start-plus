import { View } from '@tarojs/components';

import { StatusMessage } from '@/common/enums';
import { formatUtil } from '@/core/utils';

import './index.scss';

export default function Index() {
  return (
    <View className="container">
      <View>用户状态(0)：{StatusMessage[0]}</View>
      <View>用户状态(1)：{StatusMessage[1]}</View>
      <View>用户状态(x)：{StatusMessage.x ?? 'Unknown'}</View>
      <View>格式化时间-日期：{formatUtil.date(new Date())}</View>
      <View>格式化时间-日期：{formatUtil.date('2023-06-30 17:47:20')}</View>
      <View>格式化时间-小时：{formatUtil.date(new Date(), 'HH:mm')}</View>
      <View>相对时间-未超过1个月：{formatUtil.fromNow('2023-06-13 17:47:20')}</View>
      <View>相对时间-超过1个月：{formatUtil.fromNow('2023-04-12 17:47:20', 'yyyy-MM-dd')}</View>
    </View>
  );
}
