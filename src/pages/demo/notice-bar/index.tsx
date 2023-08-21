import { View } from '@tarojs/components';

import { DemoBlock, NoticeBar } from '@/common/components';

import './index.scss';


export default function Index() {
  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基础用法" simple>
        <NoticeBar content="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </DemoBlock>

      <DemoBlock title="滚动播放" simple>
        <NoticeBar scrollable content="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
        <View style={{ marginBottom: 4 }} />
        <NoticeBar scrollable={false} content="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </DemoBlock>


      <DemoBlock title="多行展示" simple>
        <NoticeBar
          wrapable
          content="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
        />
      </DemoBlock>


      <DemoBlock title="自定义右侧" simple>
        <NoticeBar
          content="自定义右侧功能区"
          extra={
            <View className="custom-extra">
              <View>查看详情</View>
              <View>关闭</View>
            </View>
          }
          mode="closeable"
        />
      </DemoBlock>


      <DemoBlock title="通知模式（关闭） " simple>
        <NoticeBar
          content="这是一条普通的通知信息"
          mode="closeable"
          onClose={() => {
            console.log('关闭通知栏时触发回调');
          }}
        />
      </DemoBlock>


      <DemoBlock title="通知模式（连接）" simple>
        <NoticeBar
          content="这是一条普通的通知信息"
          mode="link"
          onClick={() => {
            console.log('点击通知栏时触发回调');
          }}
        />
      </DemoBlock>


      <DemoBlock title="不同状态" simple>
        <NoticeBar content="默认状态公告栏默认状态公告栏" />
        <View style={{ marginBottom: 4 }} />
        <NoticeBar theme="success" content="成功状态公告栏成功状态公告栏" />
        <View style={{ marginBottom: 4 }} />
        <NoticeBar theme="warning" content="警示状态公告栏警示状态公告栏" />
        <View style={{ marginBottom: 4 }} />
        <NoticeBar theme="error" content="错误状态公告栏错误状态公告栏" />
      </DemoBlock>

      <DemoBlock title="自定义样式" simple>
        <NoticeBar
          content="技术是开发它的人的共同灵魂。"
          color="#fff"
          background="#ababab"
          icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
        />
      </DemoBlock>
    </View>
  );
}
