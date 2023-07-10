import { View, Button } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import { FilePicker } from '@/common/components';

import './index.scss';


export default function Index() {
  const [images, setImages] = useState<{url: string}[]>([]);
  const [videoList, setVideoList] = useState<{url: string}[]>([]);

  useLoad(() => {
    setTimeout(() => {
      setImages(() => [
        { url: 'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?w=1150&q=80' },
        { url: 'https://images.unsplash.com/photo-1601128533718-374ffcca299b?w=1150&q=80' },
        { url: 'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?w=1150&q=80' },
      ]);
    }, 500);
  });

  return (
    <View className="container">
      <View className="demo">
        <View className="demo-title">选择图片</View>
        <View className="demo-content">
          <FilePicker
            list={images}
            onChange={(list: any) => {
              console.log('images onChange:', list);
              setImages(list);
            }}
          />
          <View className="space" />
          <Button onClick={() => {
            console.log('images::', images);
          }}
          >获取图片列表数据
          </Button>
        </View>
      </View>

      <View className="divider" />

      <View className="demo">
        <View className="demo-title">选择图片（尺寸+张数）</View>
        <View className="demo-content">
          <FilePicker
            list={images}
            limit={6}
            size={160}
            space={9}
            onChange={(list: any) => {
              console.log('images onChange:', list);
              setImages(list);
            }}
          />
          <View className="space" />
          <Button onClick={() => {
            console.log('images::', images);
          }}
          >获取图片列表数据
          </Button>
        </View>
      </View>

      <View className="divider" />

      <View className="demo">
        <View className="demo-title">选择视频</View>
        <View className="demo-content">
          <FilePicker
            list={videoList}
            mediaType={['video']}
            onChange={(list: any) => {
              console.log('video onChange:', list);
              setVideoList(list);
            }}
          />
          <View className="space" />
          <Button onClick={() => {
            console.log('videoList::', videoList);
          }}
          >获取视频列表数据
          </Button>
        </View>
      </View>

      <View className="divider" />
      
      
    </View>
  );
}
