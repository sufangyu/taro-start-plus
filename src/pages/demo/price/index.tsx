import { View } from '@tarojs/components';

import { useEffect, useState } from 'react';

import {
  Cell, CellGroup, DemoBlock, Price, 
} from '@/common/components';

import './index.scss';

export default function Index() {
  const [price, setPrice] = useState(Math.random() * 10000000);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrice(Math.random() * 10000000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="支持三种尺寸：small、normal、large" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={10010.01} size="small" />} />
          <Cell title={<Price price={10010.01} size="normal" />} />
          <Cell title={<Price price={10010.01} size="large" />} />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="不留小数点" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={8888} precision={0} />} />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="留小数点" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={6666.123} precision={1} />} />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="划线价" simple bg={false}>
        <CellGroup inset>
          <Cell
            title={
              <>
                <Price
                  price={1513.12}
                  thousands
                />
                <Price
                  style={{ color: '#999', marginLeft: '8px' }}
                  price={8888.88}
                  size="small"
                  thousands
                  strikeThrough
                />
              </>
            }
          />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="货币符号" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={10010.01} symbol="¥" />} />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="符号位置" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={10010.01} symbol="元" position="after" />} />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="符号不显示" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={10010.01} needSymbol={false} />} />
        </CellGroup>
      </DemoBlock>
      

      <DemoBlock title="千位分隔" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={15213.1221} precision={3} thousands />} />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="异步随机变更" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price={price} precision={3} thousands />} />
        </CellGroup>
      </DemoBlock>

      <DemoBlock title="非价格展示" simple bg={false}>
        <CellGroup inset>
          <Cell title={<Price price="a1.11" />} />
        </CellGroup>
      </DemoBlock>
    </View>

  );
}
