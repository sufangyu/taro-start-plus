import { View } from '@tarojs/components';

import {
  Avatar, AvatarGroup, DemoBlock, HomeTwo, Space, 
} from '@/common/components';
import './index.scss';

export default function Index() {
  const demoAvatarImages = [
    'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  ];

  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基础用法">
        <Space>
          {
            demoAvatarImages.map((it, idx) => <Avatar src={it} key={idx} />)
          }
        </Space>
      </DemoBlock>

      
      <DemoBlock title="尺寸（包含自定义）">
        <Space>
          <Avatar src={demoAvatarImages[0]} size="small" />
          <Avatar src={demoAvatarImages[0]} size="medium" />
          <Avatar src={demoAvatarImages[0]} size="large" />
          <Avatar src={demoAvatarImages[0]} size={160} />
        </Space>
      </DemoBlock>


      <DemoBlock title="圆角">
        <Space>
          <Avatar src={demoAvatarImages[0]} round size="small" />
          <Avatar src={demoAvatarImages[0]} round size="medium" />
          <Avatar src={demoAvatarImages[0]} round size="large" />
          <Avatar src={demoAvatarImages[0]} round size={160} />
        </Space>
      </DemoBlock>


      <DemoBlock title="字符头像">
        <Space>
          <Avatar round background="#ccc" size="small">张</Avatar>
          <Avatar round background="#007fff" color="#fff" size="medium">欧阳</Avatar>
          <Avatar round background="red" color="#fff" size="large">Z</Avatar>
          <Avatar round background="orange" color="#fff" size={160}>吴</Avatar>
        </Space>
      </DemoBlock>


      <DemoBlock title="图标头像">
        <Space>
          <Avatar round background="#ccc" size="small"><HomeTwo size={24} /></Avatar>
          <Avatar round background="#007fff" size="medium"><HomeTwo fill="#fff" size={36} /></Avatar>
          <Avatar round background="red" size="large"><HomeTwo fill="#fff" size={48} /></Avatar>
          <Avatar round background="orange" size={160}><HomeTwo fill="#fff" size={64} /></Avatar>
        </Space>
      </DemoBlock>


      <DemoBlock title="自定义占位背景色">
        <Space>
          <Avatar round background="#ccc" />
          <Avatar round background="#007fff" />
          <Avatar round background="red" />
        </Space>
      </DemoBlock>


      <DemoBlock title="加载失败时占位头像">
        <Space>
          <Avatar
            src="./fail-img.png"
            onError={(ev) => {
              console.log('图片加载失败', ev);
            }}
          />
          <Avatar
            src="./fail-img.png"
            fallbackSrc="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" 
            onError={(ev) => {
              console.log('图片加载失败', ev);
            }} 
          />
        </Space>
      </DemoBlock>


      <DemoBlock title="头像组">
        <AvatarGroup onCollapseClick={() => console.log('点击了折叠元素')}>
          {
            demoAvatarImages.map((it, idx) => (
              <Avatar
                src={it}
                key={idx}
              />),
            )
          }
        </AvatarGroup>

        <AvatarGroup
          cascading="right-up"
          collapseAvatar="更多"
          collapseColor="#fff"
          collapseBackground="#007fff"
          onCollapseClick={() => console.log('点击了更多按钮')}
        >
          {
            demoAvatarImages.map((it, idx) => (
              <Avatar
                src={it}
                key={idx}
              />),
            )
          }
        </AvatarGroup>
      </DemoBlock>

      
    </View>
  );
}
