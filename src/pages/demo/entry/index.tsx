import {View} from '@tarojs/components'
import {routeUtil} from "@/core/utils";
import { appRouterConfig } from '@/common/router';

import './index.scss';

interface Entry {
  label: string;
  path: string;
}

export default function Index() {

  const entries: Entry[] = [
    {label: 'state、props、事件', path: appRouterConfig.base.path},
    {label: '全局状态', path: appRouterConfig.store.path},
    {label: '页面跳转', path: appRouterConfig.navigation.path},
    {label: '网络请求', path: appRouterConfig.request.path},
    {label: '下拉刷新', path: appRouterConfig.pullDownRefresh.path},
    {label: '列表', path: appRouterConfig.list.path},
    {label: '图片查看', path: appRouterConfig.imagePreview.path},
    {label: '文件选择&上传', path: appRouterConfig.filePicker.path},
    {label: '表单校验', path: appRouterConfig.formValidate.path},
    {label: '事件总线', path: appRouterConfig.eventsList.path},
    {label: '数据格式化', path: appRouterConfig.format.path},
    { label: '分包示例', path: appRouterConfig.switchEnv.path },
  ];


  return (
    <View className='container'>
      <View className='page-title'>入门教程</View>
      <View className='menu'>
        {
          entries.map(item => {
            return (
              <View
                className='menu-item'
                key={item.path}
                onClick={() => routeUtil.toPage({url: item.path})}
              >
                {item.label}
              </View>
            );
          })
        }
      </View>
    </View>
  )
}
