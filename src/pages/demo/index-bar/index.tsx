import { Image, View } from '@tarojs/components';
import { IndexBar, IndexBarPanel } from '@/common/components';
import icHot from '@/assets/images/icons/ic-hot.png';

import mockData from './mock-data';
import './index.scss';

export default function Index() {
  const hotCity = [
    '北京', '上海', '深圳', '广州', '杭州', '南京', '成都',
  ];

  const indexItems = mockData.map((it) => ({ key: it.key, title: it.title, toast: it.title }));
  
  const renderHotCity = () => {
    return (
      <View id="index-bar-list-hot">
        <View className="index-bar__anchor">热门城市</View>
        <View className="hot-city">
          {
            hotCity.map((it, idx) => {
              return (
                <View className="hot-city__item" key={`hot-${idx}`}>
                  <View>{it}</View>
                </View>
              );
            })
          }
        </View>
      </View>
    );
  };
  
  return (
    <View className="container">
      <IndexBar
        indexItems={[
          {
            key: 'hot',
            title: <Image style={{ width: 16, height: 16, marginBottom: -4 }} src={icHot} />,
            toast: '热门',
          },
          ...indexItems,
        ]}
        customArea={renderHotCity()}
      >
        {
          mockData.map((item, index) => {
            return (
              <IndexBarPanel
                key={`item-${index}`}
                name={item.title}
                code={item.key}
                list={item.items}
              />
            );
          })
        }
      </IndexBar>
    </View>
  );
}
