/**
 *  components 组件快速生成脚本
 *
 *  npm run create:comp '文件夹' or '路径/文件夹'
*/
const fs = require('fs');
const { mkdirsSync } = require('./utils');
const dirName = process.argv[2];

if (!dirName) {
  console.warn('组件名称不能为空');
  console.log('eg: npm run tem test');
  process.exit(0);
}

const dirname = `./src/common/components/${dirName}`;
const isExist = fs.existsSync(dirname);
if (isExist) {
  console.warn(`组件(${dirName})已存在`);
  process.exit(0);
}


// 模板
const indexTep = `import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

interface Props {}

const Index: FC<Props> = (props: Props) => {
  return (
    <View className="container">
      This is empty component
    </View>
  );
};

export default Index;
`;

// scss 模板
const scssTep = ``;


mkdirsSync(dirname); // mkdir $1
process.chdir(dirname); // cd $1
fs.writeFileSync(`index.tsx`, indexTep); // write tsx
fs.writeFileSync(`index.scss`, scssTep); // write scss

console.log('创建成功');
process.exit(0);
