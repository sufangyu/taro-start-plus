import { Button, View } from '@tarojs/components';

import { DemoBlock } from '@/common/components';


import './index.scss';

export default function Index() {
  const handlerThrowError = () => {
    try {
      const person = {};
      person.hobby.hot = 'x';
    } catch (error) {
      throw new Error(error);
    }
  };
  
  return (
    <View className="container">
      <DemoBlock title="基础示例">
        <Button
          type="primary"
          onClick={() => {
            try {
              const a = {};
              a.b.c = 'x';
            } catch (error) {
              throw new Error(error);
            }
          }}
        >
          触发语法错误
        </Button>

        <Button
          type="primary"
          onClick={() => {
            Promise.reject(
              new TypeError('Primise error!'),
            );
          }}
        >
          触发异步错误
        </Button>

        <Button
          type="primary"
          onClick={handlerThrowError}
        >
          函数调用触发错误
        </Button>
      </DemoBlock>
    </View>
  );
}
