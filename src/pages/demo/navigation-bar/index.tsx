import { Image, Text, View } from '@tarojs/components';

import { NavigationBar } from '@/common/components';

import './index.scss';

export default function Index() {
  return (
    <View className="container">
      {/* 基础 */}
      {/* <NavigationBar
        title='自定义导航栏'
        background='#007fff'
        color='#eee'
      ></NavigationBar> */}

      {/* 返回按钮 */}
      {/* <NavigationBar
        title='自定义导航栏'
        color='#fff'
        background='#007fff'
        iconTheme='white'
        back
        onBack={() => console.log('返回上一页')}
      ></NavigationBar> */}

      {/* 首页 */}
      {/* <NavigationBar
        title='自定义导航栏'
        color='#fff'
        background='#007fff'
        iconTheme='white'
        home
        onHome={() => console.log('返回上一页')}
      ></NavigationBar> */}

      {/* 返回 + 首页按钮 */}
      {/* <NavigationBar
        title='自定义导航栏'
        color='#fff'
        background='#007fff'
        iconTheme='white'
        back
        home
        onBack={() => console.log('返回上一页')}
        onHome={() => console.log('返回首页')}
      ></NavigationBar> */}

      {/* <NavigationBar
        // title='自定义导航栏'
        color='#fff'
        background='#007fff'
        iconTheme='white'
        back
        searchBar
        onSearch={() => console.log('点了搜索')}
      ></NavigationBar> */}

      {/* 自定义内容 */}
      {/* <NavigationBar
        color='#fff'
        background='#007fff'
        iconTheme='white'
        renderCenter={<Text>自定中间内容</Text>}
        renderLeft={<Text>左侧</Text>}
        renderRight={<Text>右侧</Text>}
      ></NavigationBar> */}

      {/* 返回 + 首页按钮 + 层叠导航栏 */}
      <NavigationBar
        extClass="navbar--fixed"
        title="自定义层叠导航栏"
        color="#fff"
        background="transparant"
        iconTheme="white"
        back
        home
        onHome={() => console.log('返回首页')}
      />

      <View className="main">
        <Image
          src="https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?w=1150&q=80"
          style={{ width: '100%', height: '250px', background: '#fff' }}
          mode="center"
        />
        <Text>这是主要内容</Text>
      </View>
    </View>
  );
}
