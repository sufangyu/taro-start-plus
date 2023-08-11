import { View, Image } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';

import icStepsDefault from '@/assets/images/icons/ic-steps-default.svg';
import icStepsError from '@/assets/images/icons/ic-steps-error.svg';
import icStepsProcess from '@/assets/images/icons/ic-steps-process.svg';
import { Steps, Step, DemoBlock } from '@/common/components';


import './index.scss';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className="container">
      <DemoBlock title="水平带序号步骤条">
        <Steps current={1}>
          <Step title="已完成" description="辅助信息" />
          <Step title="当前步骤" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
        </Steps>
      </DemoBlock>

      <DemoBlock title="水平带图标步骤条">
        <Steps current={1}>
          <Step title="已完成" description="辅助信息" icon={icStepsProcess} />
          <Step title="当前步骤" description="辅助信息" icon={icStepsProcess} />
          <Step title="未完成" description="辅助信息" icon={icStepsDefault} />
          <Step title="未完成" description="辅助信息" icon={icStepsDefault} />
        </Steps>
      </DemoBlock>

      <DemoBlock title="水平简略步骤条">
        <Steps theme="dot" current={1}>
          <Step title="已完成" description="辅助信息" />
          <Step title="当前步骤" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
        </Steps>
      </DemoBlock>
      

      <DemoBlock title="垂直带序号步骤条">
        <Steps layout="vertical" current={1}>
          <Step title="已完成步骤" description="可自定义此处内容" />
          <Step title="当前步骤" description="可自定义此处内容" />
          <Step title="未完成步骤" description="可自定义此处内容" />
          <Step title="未完成步骤" description="可自定义此处内容" />
        </Steps>
      </DemoBlock>
      
      <DemoBlock title="垂直带图标步骤条">
        <Steps layout="vertical" current={1}>
          <Step title="已完成步骤" description="可自定义此处内容" icon={icStepsProcess} />
          <Step title="当前步骤" description="可自定义此处内容" icon={icStepsProcess} />
          <Step title="未完成步骤" description="可自定义此处内容" icon={icStepsDefault} />
          <Step title="未完成步骤" description="可自定义此处内容" icon={icStepsDefault} />
        </Steps>
      </DemoBlock>

      <DemoBlock title="垂直简略步骤条">
        <Steps layout="vertical" theme="dot" current={1}>
          <Step title="已完成步骤" description="可自定义此处内容" />
          <Step title="当前步骤" description="可自定义此处内容" />
          <Step title="未完成步骤" description="可自定义此处内容" />
          <Step title="未完成步骤" description="可自定义此处内容" />
        </Steps>
      </DemoBlock>

      <DemoBlock title="垂直带自定义内容步骤条">
        <Steps layout="vertical" theme="dot" current={1}>
          <Step title="已完成步骤" description="可自定义此处内容" />
          <Step title="当前步骤" description="可自定义此处内容">
            <Image
              src="https://tdesign.gtimg.com/miniprogram/images/steps1.png"
              style={{ width: '100%' }}
              mode="widthFix"
            />
          </Step>
          <Step title="未完成步骤" description="可自定义此处内容" />
          <Step title="未完成步骤" description="可自定义此处内容" />
        </Steps>
      </DemoBlock>


      <DemoBlock title="水平带序号步骤条（状态）">
        <Steps current={1} currentStatus="error">
          <Step title="已完成" description="辅助信息" />
          <Step title="错误步骤" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
        </Steps>
      </DemoBlock>

      <DemoBlock title="水平带图标步骤条（状态）">
        <Steps current={1} currentStatus="error">
          <Step title="已完成" description="辅助信息" icon={icStepsProcess} />
          <Step title="错误步骤" description="辅助信息" icon={icStepsError} />
          <Step title="未完成" description="辅助信息" icon={icStepsDefault} />
          <Step title="未完成" description="辅助信息" icon={icStepsDefault} />
        </Steps>
      </DemoBlock>

      <DemoBlock title="水平简略步骤条（状态）">
        <Steps theme="dot" current={1} currentStatus="error">
          <Step title="已完成" description="辅助信息" />
          <Step title="错误步骤" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
          <Step title="未完成" description="辅助信息" />
        </Steps>
      </DemoBlock>

      
    </View>
  );
}
