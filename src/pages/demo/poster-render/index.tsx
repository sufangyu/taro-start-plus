import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { PosterItemConfig } from '@poster-render/taro-react';
import { useRef, useState } from 'react';
import { QRCode } from 'taro-code';

import { ImageShare } from '@/common/components';
import { routeUtil } from '@/core/utils';

import './index.scss';


export default function Index() {
  const [renderList, setRenderList] = useState<PosterItemConfig[]>([]);
  const [visible, setVisible] = useState(false);

  // 二维码
  const qrCoderef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState('');

  const handleRenderShare = () => {
    Taro.showLoading({ title: '图片生成中', mask: true });

    const data = {
      cover: 'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?w=1150&q=80',
      id: 20,
      title: 'Taro是一个开放式跨端跨框架解决方案，支持使用React、Vue等框架来开发多个主流APP小程序、H5、RN等应用。',
      createAt: '2023-07-03 20:21',
    };
    setQrCodeText(`https://cli.im/url?id=${data.id}`);

    // 延迟执行渲染, 避免二维码生成未生成
    setTimeout(() => {
      // console.log('qrCoderef=>>', (qrCoderef?.current as any)?.image);
      const qrCode = (qrCoderef?.current as any)?.image;
      
      setRenderList([
        {
          type: 'rect',
          x: 0,
          y: 0,
          width: 600,
          height: 740,
          radius: 24,
          // borderColor: '#ccc',
          // borderWidth: 2,
          backgroundColor: '#fff',
        },
        {
          type: 'image',
          x: 0,
          y: 0,
          width: 600,
          height: 300,
          mode: 'cover',
          src: data.cover,
          radius: [16, 16, 0, 0],
        },
        {
          type: 'text',
          x: 30,
          y: 320,
          width: 520,
          height: 60,
          text: data.title,
          lineNum: 3,
          lineHeight: 34,
          color: '#000',
          fontSize: 30,
          textAlign: 'left',
          baseLine: 'top',
        },
        {
          type: 'rect',
          x: 30,
          y: 440,
          width: 280,
          height: 32,
          radius: 8,
          borderColor: '#e5e5e5',
          borderWidth: 1,
          backgroundColor: '#f5f5f5',
        },
        {
          type: 'text',
          x: 34,
          y: 444,
          width: 280,
          height: 30,
          text: `发布于 ${data.createAt}`,
          color: '#999',
          fontSize: 22,
          textAlign: 'left',
          baseLine: 'top',
        },
        {
          type: 'line',
          x: 30,
          y: 520,
          destX: 570,
          destY: 520,
          color: '#eee',
          lineWidth: 2,
        },
        {
          type: 'text',
          x: 30,
          y: 590,
          width: 540,
          height: 30,
          text: '保存图片，扫码查看详情',
          color: '#666',
          fontSize: 24,
          textAlign: 'left',
          baseLine: 'top',
        },
        {
          type: 'text',
          x: 30,
          y: 630,
          width: 540,
          height: 30,
          text: '分享来自「 Taro 」',
          color: '#666',
          fontSize: 24,
          textAlign: 'left',
          baseLine: 'top',
        },

        {
          type: 'image',
          x: 410,
          y: 550,
          width: 160,
          height: 160,
          mode: 'cover',
          src: qrCode,
          radius: 0,
          cacheKey: 'qr-code',
        },
      ]);

      setVisible(true);
    }, 500);
  };

  return (
    <View className="container">
      <Button className="button-demo" type="primary" onClick={handleRenderShare}>生成分享图（弹窗）</Button>
      <Button
        className="button-demo"
        type="primary"
        onClick={() => {
          routeUtil.toWebviewPage('http://10.25.5.151:5173/#/share?id=20', '生成分享图');
        }}
      >生成分享图（页面-长按触发）
      </Button>

      <Text>目前只支持微信小程序</Text>

      <ImageShare
        visible={visible}
        width={600}
        height={740}
        qrCodeText={qrCodeText}
        list={renderList}
        onRender={() => {
          Taro.hideLoading();
        }}
        onRenderFail={(err) => console.error('onRenderFail', err?.message)}
        onCancel={() => {
          setVisible(false);
          setRenderList([]);
        }}
      />

      {/* 二维码 */}
      <QRCode
        style={{
          visibility: 'hidden',
          position: 'absolute',
          left: '-9999',
          bottom: '-9999',
        }}
        ref={qrCoderef}
        text={qrCodeText}
        size={180}
        scale={4}
        errorCorrectLevel="M"
        typeNumber={2}
      />
    </View>
  );
}

