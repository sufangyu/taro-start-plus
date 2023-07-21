import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import './index.scss';

export default function Index() {
  const category = [
    {
      id: '101',
      name: '有品推荐',
      list: ['空调', '平板电视', '笔记本', '手机', '耳机', '摄像头', '洗衣机'],
    },
    {
      id: '102',
      name: '日常自营',
      list: ['鼠标垫', '纸面巾', '饮品杯子', '跑鞋', '拖鞋'],
    },
    {
      id: '103',
      name: '手机数码',
      list: ['数字系列', '折叠屏', 'CIVI系列', '投影仪', '音响/音箱', '手环', '智能手表', 'AR/VR', '充电器', '移动电源', '云台', '数据线', '保护壳', '贴膜'],
    },
    {
      id: '104',
      name: '电脑办公',
      list: ['台式机', '笔记本', '平板电脑', '游戏本', '笔记本配件', '打印机', '路由器'],
    },
    {
      id: '105',
      name: '大家电',
      list: ['冰箱', '洗衣机', '空调', '洗碗机'], 
    },
    {
      id: '106',
      name: '小家电',
      list: ['饮水机', '电饭煲', '破壁机', '养生壶', '扫地机器人', '吸尘器', '空气净化器'],
    },
    {
      id: '107',
      name: '美食酒饮',
      list: ['酒水', '茶馆', '方便速食', '牛羊肉类', '休闲零食', '坚果', '饼干蛋糕'],
    },
    {
      id: '108',
      name: '家具家装',
      list: ['摄像头', '智能门锁', '门铃', '保险柜', '床', '床垫', '衣柜', '沙发', '鞋柜'],
    },
    {
      id: '109',
      name: '服装',
      list: ['男装T恤', '男装裤子', '运动服装', '女士服装'],
    },
    {
      id: '110',
      name: '手表首饰',
      list: ['珠宝', '手表', '黄金吊坠', '黄金项链', '砖石', '玉石'],
    },
    {
      id: '111',
      name: '家纺厨具',
      list: ['保温杯', '保温壶', '泡茶杯', '运动杯', '马克杯'],
    },
    {
      id: '112',
      name: '美妆个护',
      list: ['面膜', '爽肤水'],
    },
    {
      id: '113',
      name: '鞋靴箱包',
      list: ['跑步鞋', '休闲鞋', '运动凉鞋', '拉杆箱', '双肩背包'],
    },
    {
      id: '114',
      name: '日用百货',
      list: ['无人机', '打印机', '工具箱', '测量工具', '清洁刷'],
    },
    {
      id: '115',
      name: '运动户外',
      list: ['跑步机', '划船机', '户外照明', '望眼镜', '露营工具'],
    },
    {
      id: '116',
      name: '宠物生活',
      list: ['猫砂盆', '鱼缸', '宠物罐头'],
    },
  ];

  // 左侧分类激活
  const [active, setActive] = useState('');
  // 滚动定位的id
  const [anchorId, setAnchorId] = useState('');
  

  // 左侧导航点击触发
  const handleAnchor = (item: {id: string; name: string; list: string[]}) => {
    setActive(item.id);
    setAnchorId(item.id);
  };

  // 右侧内容滚动触发
  const handleScroll = () => {
    // console.log(ev);
    category.forEach((item) => {
      if (item.list.length > 0) {
        // 返回一个 SelectorQuery 对象实例。获取页面的节点信息。
        const query = Taro.createSelectorQuery();
        // 获取id为chunkID的元素 => 节点宽高信息和位置信息
        query.select(`#content-chunk-${item.id}`).boundingClientRect((res: any) => {
          // console.log(res);
          // 如果当前的子分类滚动到了顶部以及当前子分类正处于顶部的位置
          const offsetY = 6;
          if (res.top < offsetY && res.top > (res.height * -1)) {
            setActive(item.id);
          }
        }).exec();
      }
    });
  };

  const renderNavigation = () => {
    return (
      <ScrollView 
        className="navigation"
        scroll-y
      >
        {
          category.map((item, idx) => {
            return (
              <View
                key={`navigation-${idx}`}
                className={item.id === active ? 'actived' : ''}
                onClick={() => { handleAnchor(item); }}
              >
                {item.name}
              </View>
            );
          })
        }
      </ScrollView>
    );
  };

  const renderContentDetail = (list: string[]) => {
    return (
      <View className="content__detail">
        {list.map((item, idx) => (<View key={`content-detail-${idx}`} className="content__detail__item">{item}</View>))}
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView 
        className="content"
        scroll-y
        scroll-into-view={`content-chunk-${anchorId}`}
        scroll-with-animation
        onScroll={handleScroll}
      >
        {
          category.map((item, idx) => {
            return (
              <View key={`category-content-${idx}`} className="content__item" id={`content-chunk-${item.id}`}>
                <Text>{item.name}-{item.id}</Text>
                {renderContentDetail(item.list)}
              </View>
            );
          })
        }
      </ScrollView>
    );
  };

  return (
    <View className="container">
      {renderNavigation()}
      {renderContent()}
    </View>
  );
}
