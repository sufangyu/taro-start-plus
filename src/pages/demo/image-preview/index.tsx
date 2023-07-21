import { View } from '@tarojs/components';

import { ImagePreview } from '@/common/components';

import './index.scss';

export default function Index() {
  const images: string[] = [
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?w=1150&q=80',
    'https://images.unsplash.com/photo-1601128533718-374ffcca299b?w=1150&q=80',
    'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?w=1150&q=80',
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?w=1150&q=80',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  ];

  return (
    <View className="container">
      <View className="demo">
        <View className="demo-title">剩余张数</View>
        <View className="demo-content">
          <ImagePreview
            images={images}
            tipsText="left"
          />
          <View className="space" />
          <ImagePreview
            images={images}
            limit={2}
            tipsText="left"
          />
        </View>
      </View>

      <View className="divider" />

      <View className="demo">
        <View className="demo-title">全部张数</View>
        <View className="demo-content">
          <ImagePreview
            images={images}
            tipsText="count"
          />
          <View className="space" />
          <ImagePreview
            images={images}
            limit={2}
            tipsText="count"
          />
        </View>
      </View>

      <View className="divider" />

      <View className="demo">
        <View className="demo-title">没提示信息</View>
        <View className="demo-content">
          <ImagePreview
            images={images}
            tipsText={false}
          />
          <View className="space" />
          <ImagePreview
            images={images}
            limit={2}
            tipsText={false}
          />
          <View className="space" />
          <ImagePreview
            images={images}
            limit={images.length}
            tipsText={false}
          />
        </View>
      </View>

      <View className="divider" />

      <View className="demo">
        <View className="demo-title">自定义尺寸</View>
        <View className="demo-content">
          <ImagePreview
            images={images}
            limit={3}
            tipsText="left"
            size={220}
            space={8}
          />
        </View>
      </View>

    </View>
  );
}
