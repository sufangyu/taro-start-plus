import { Button, View } from '@tarojs/components';

import { DemoBlock, Result, VolumeNotice } from '@/common/components';

import './index.scss';

export default function Index() {
  return (
    <View className="container">
      <DemoBlock title="成功状态" simple>
        <Result
          status="success"
          title="操作成功"
          description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
        />
      </DemoBlock>


      <DemoBlock title="等待状态" simple>
        <Result
          status="waiting"
          title="等待处理"
          description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
        />
      </DemoBlock>


      <DemoBlock title="提示状态" simple>
        <Result
          status="info"
          title="信息提示"
          description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
        />
      </DemoBlock>


      <DemoBlock title="警告状态" simple>
        <Result
          status="warning"
          title="警告提示"
          description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
        />
      </DemoBlock>


      <DemoBlock title="失败状态" simple>
        <Result
          status="error"
          title="无法完成操作"
          description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
          actions={
            <>
              <Button size="mini">返回</Button>
              <Button size="mini" type="primary">重试</Button>
            </>
          }
        />
      </DemoBlock>


      <DemoBlock title="自定义图标" simple>
        <Result
          icon={<VolumeNotice fill="#004ccf" />}
          status="success"
          title="自定义图标"
          description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
        />
      </DemoBlock>
    </View>
  );
}
