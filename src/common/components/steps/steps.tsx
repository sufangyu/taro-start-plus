import { View } from '@tarojs/components';

import classNames from 'classnames';

import { StepStatus, StepsProps } from './props';
import Step from './step';
import './index.scss';

const Index = (props: StepsProps) => {
  const {
    children, current, currentStatus,
    layout = 'horizontal', theme = 'default',
  } = props;

  const classes = classNames({
    steps: true,
    [`steps-layout--${layout}`]: true,
    [`steps-theme--${theme}`]: true,
  });


  /**
   * 获取步骤状态（步骤序号与当前进行步骤的序号对比）
   *
   * @param {number} index 序号
   * @return {*}  {StepStatus}
   */
  function getItemStatusByIndex(index: number): StepStatus {
    const curIndex = Number(current);
    if (index < curIndex) {
      return 'finish';
    }
    
    if (index === curIndex) {
      return currentStatus ?? 'process';
    } 

    return 'default';
  }


  return (
    <View className={classes}>
      {
        children.map((child, index) => {
          const {
            title, description, children: stepChildren, icon, status, 
          } = child.props;

          const itemStatus = status ?? getItemStatusByIndex(index);

          return (
            <Step
              key={index}
              title={title}
              index={index}
              description={description}
              icon={icon}
              status={itemStatus}
              theme={theme}
            >
              {stepChildren}
            </Step>
          );
        })
      }
    </View>
  );
};

export default Index;
