import { View, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import { Action, ActionSheet } from '@/common/components';

import './index.scss';


export default function Index() {
  const [visibleBase, setVisibleBase] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleDesc, setVisibleDesc] = useState(false);
  const [visibleCustom, setVisibleCustom] = useState(false);
  const [visibleOpenType, setVisibleOpenType] = useState(false);
  const actionsCommon: Action[] = [
    { name: '选项一' },
    { name: '选项二', color: '#ee0a24' },
    { name: '选项三（禁用项）', disabled: true },
    { name: '选项四', subname: '这是选项的描述信息' },
  ];

  const actionsOpen: Action[] = [
    { name: '打开客服会话', openType: 'contact' },
    { name: '触发用户转发', openType: 'share' },
    { name: '手机号快速验证', openType: 'getPhoneNumber' },
    // { name: '手机号实时验证', openType: 'getRealtimePhoneNumber' },
    { name: '获取用户信息', openType: 'getUserInfo' },
    { name: '获取用头像', openType: 'chooseAvatar' },
    { name: '打开APP', openType: 'launchApp' },
    { name: '打开授权设置页', openType: 'openSetting' },
    { name: '打开“意见反馈”', openType: 'feedback' },
  ];


  return (
    <>
      <View className="container">
        <Button type="primary" onClick={() => setVisibleBase(true)}>基础用法</Button>
        <Button type="primary" onClick={() => setVisibleCancel(true)}>展示取消按钮</Button>
        <Button type="primary" onClick={() => setVisibleDesc(true)}>展示描述信息</Button>
        <Button type="primary" onClick={() => setVisibleCustom(true)}>自定义面板</Button>
        <Button type="primary" onClick={() => setVisibleOpenType(true)}>开放能力</Button>
      </View>

      <ActionSheet
        visible={visibleBase}
        actions={actionsCommon}
        onClose={() => setVisibleBase(false)}
        onSelect={(idx) => {
          console.log(`选择了第${idx + 1}项`, actionsCommon[idx]);
          Taro.showToast({
            title: `选择了第${idx + 1}项（${actionsCommon[idx].name}）`,
            icon: 'none',
          });
        }}
      />

      <ActionSheet
        visible={visibleCancel}
        actions={actionsCommon}
        cancelText="取消"
        onClose={() => setVisibleCancel(false)}
        onSelect={(idx) => {
          console.log(`选择了第${idx + 1}项`, actionsCommon[idx]);
          Taro.showToast({
            title: `选择了第${idx + 1}项（${actionsCommon[idx].name}）`,
            icon: 'none',
          });
        }}
      />

      <ActionSheet
        visible={visibleDesc}
        actions={actionsCommon}
        title="标题"
        description="这是一段描述信息"
        cancelText="取消"
        closeOnOverlayClick={false}
        onClose={() => setVisibleDesc(false)}
        onSelect={(idx) => {
          console.log(`选择了第${idx + 1}项`, actionsCommon[idx]);
          Taro.showToast({
            title: `选择了第${idx + 1}项（${actionsCommon[idx].name}）`,
            icon: 'none',
          });
        }}
      />

      <ActionSheet
        visible={visibleCustom}
        title="自定义面板"
        onClose={() => setVisibleCustom(false)}
      >
        <view style={{ height: '125px', textAlign: 'center', padding: '30px' }}>内容</view>
      </ActionSheet>

      <ActionSheet
        visible={visibleOpenType}
        actions={actionsOpen}
        title="开放能力"
        description="小程序提供的一些原生开放能力"
        cancelText="取消"
        onClose={() => setVisibleOpenType(false)}
        onGetUserInfo={(ev) => console.log('onGetUserInfo=>>', ev)}
        onGetPhoneNumber={(ev) => console.log('onGetPhoneNumber=>>', ev)}
        onOpenSetting={(ev) => console.log('onOpenSetting=>>', ev)}
        onContact={(ev) => console.log('onContact=>>', ev)}
        onLaunchApp={(ev) => console.log('onLaunchApp=>>', ev)}
        onChooseAvatar={(ev) => console.log('onChooseAvatar=>>', ev)}
        onError={(ev) => {
          console.log('onError=>>', ev);
          Taro.showToast({
            title: ev.detail.errMsg,
            icon: 'error',
          });
        }}
      />
    </>
  );
}
