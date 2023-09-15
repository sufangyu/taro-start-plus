import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  DemoBlock, Grid, HomeTwo, VolumeNotice, 
} from '@/common/components';
import './index.scss';

export default function Index() {
  const handleToast = (msg: string) => {
    Taro.showToast({
      icon: 'none',
      title: msg,
    });
  };

  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基础用法" simple>
        <Grid>
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
        </Grid>
      </DemoBlock>


      <DemoBlock title="点击回调" simple>
        <Grid>
          <Grid.Item
            text="文字"
            icon={<HomeTwo size={40} />} 
            onClick={() => handleToast('点击了第1项')}
          />
          <Grid.Item
            text="文字"
            icon={<VolumeNotice size={40} />}
            onClick={() => handleToast('点击了第2项')}
          />
          <Grid.Item
            text="文字"
            icon={<HomeTwo size={40} />} 
            onClick={() => handleToast('点击了第3项')} 
          />
          <Grid.Item
            text="文字"
            icon={<VolumeNotice size={40} />}
            onClick={() => handleToast('点击了第4项')}
          />
        </Grid>
      </DemoBlock>


      <DemoBlock title="自定义列数" simple>
        <Grid columnNum={3}>
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
        </Grid>
      </DemoBlock>

      <DemoBlock title="自定义内容" simple>
        <Grid columnNum={3} border={false}>
          <Grid.Item icon={<Image style={{ width: '100%', height: 90 }} src="https://img.yzcdn.cn/vant/apple-1.jpg" />} />
          <Grid.Item icon={<Image style={{ width: '100%', height: 90 }} src="https://img.yzcdn.cn/vant/apple-2.jpg" />} />
          <Grid.Item icon={<Image style={{ width: '100%', height: 90 }} src="https://img.yzcdn.cn/vant/apple-3.jpg" />} />
        </Grid>
      </DemoBlock>


      <DemoBlock title="正方形格子" simple>
        <Grid square>
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
        </Grid>
      </DemoBlock>

      <DemoBlock title="格子间距" simple>
        <Grid gutter={16} border={false}>
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
        </Grid>
      </DemoBlock>

      <DemoBlock title="无边框" simple>
        <Grid border={false}>
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
        </Grid>
      </DemoBlock>


      <DemoBlock title="卡片宫格" simple>
        <Grid theme="card">
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
          <Grid.Item text="文字" icon={<HomeTwo size={40} />} />
          <Grid.Item text="文字" icon={<VolumeNotice size={40} />} />
        </Grid>
      </DemoBlock>


    </View>
  );
}
