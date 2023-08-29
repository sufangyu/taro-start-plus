
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  Cell, CellGroup, DemoBlock, HomeTwo, 
} from '@/common/components';

import './index.scss';

export default function Index() {
  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基础用法" simple>
        <CellGroup>
          <Cell title="单元格" extra="内容" />
          <Cell title="单元格" extra="内容" description="描述信息" />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="卡片风格" simple>
        <CellGroup inset>
          <Cell title="单元格" extra="内容" />
          <Cell title="单元格" extra="内容" description="描述信息" />
        </CellGroup>
      </DemoBlock>

      <DemoBlock title="展示图标" simple>
        <CellGroup>
          <Cell
            title="单元格"
            extra="内容"
            prefix={<HomeTwo fill="#808080" size={16} />}
          />
          <Cell
            title="单元格"
            extra="内容"
            description="描述信息" 
            prefix={<HomeTwo fill="#808080" size={16} />}
          />
          <Cell
            title="单元格"
            extra="内容"
            description="描述信息"
            prefix={<HomeTwo fill="#808080" size={16} />}
            suffix="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
            arrow
          />
        </CellGroup>
      </DemoBlock>

      <DemoBlock title="展示箭头" simple>
        <CellGroup>
          <Cell 
            title="单元格"
            arrow
          />
          <Cell
            title="单元格" 
            extra="内容"
            arrow
          />
          <Cell
            title="单元格" 
            extra="内容"
            arrow
            arrowDirection="down"
          />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="分组标题" simple>
        <CellGroup title="分组1">
          <Cell title="单元格" extra="内容" />
        </CellGroup>
        <CellGroup title="分组2">
          <Cell title="单元格" extra="内容" />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="垂直居中" simple>
        <CellGroup>
          <Cell 
            title="单元格"
            extra="内容"
            prefix={<HomeTwo fill="#808080" size={16} />}
            arrow
            center
          />
          <Cell
            title="单元格" 
            extra="内容"
            description="描述信息"
            prefix={<HomeTwo fill="#808080" size={16} />}
            arrow
            center
          />
          <Cell
            title="单元格"
            extra="内容"
            description="描述信息"
            prefix={<HomeTwo fill="#808080" size={16} />}
            suffix="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
            arrow
            center
          />
        </CellGroup>
      </DemoBlock>


      <DemoBlock title="点击回调" simple>
        <CellGroup>
          <Cell
            title="单元格"
            extra="内容"
            arrow
            onClick={() => Taro.showToast({
              title: '点击了第1个',
              icon: 'success',
            })}
          />
          <Cell
            title="单元格"
            extra="内容"
            arrow 
            onClick={() => Taro.showToast({
              title: '点击了第2个',
              icon: 'success',
            })} 
          />
        </CellGroup>
      </DemoBlock>
    </View>
  );
}
