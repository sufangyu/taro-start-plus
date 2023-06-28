/* eslint-disable @typescript-eslint/no-var-requires */
const Mock = require('mockjs');

const { Random } = Mock;

const titles = Random.shuffle([
  '冬天的早班飞机',
  '我们始终没有牵手旅行',
  '不想告别的夏天',
  '最初的爱情',
  '最后的仪式',
  '十一种孤独',
  '一部法国小说',
  '还乡之谜',
  '地下时光',
  '给樱桃以性别',
  '天使与昆虫',
  '在路上',
  '绿皮书',
  '老人与海',
  '追风筝的人',
  '小王子',
  '百年孤独',
  '人类简史',
  '时间简史',
  '心有林夕',
  '麦田里的守望者',
]);

const data = Mock.mock({
  'list|50-60': [
    {
      id: '@increment',
      'title|+1': titles,
      createdAt: '@date',
    },
  ],
});

module.exports = data;
