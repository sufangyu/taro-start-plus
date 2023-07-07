/**
 *  pages 页面快速生成脚本
 *
 *  npm run create:page '文件夹' or '路径/文件夹'
*/

const fs = require('fs');
const { mkdirsSync } = require('./utils');
const dirName = process.argv[2];

if (!dirName) {
  console.warn('页面名称不能为空');
  console.log('eg: npm run tem test');
  process.exit(0);
}

const dirname = `./src/pages/${dirName}`;
const isExist = fs.existsSync(dirname);
if (isExist) {
  console.warn(`页面(${dirName})已存在`);
  process.exit(0);
}


// view 模板
const viewTep = `import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='container'>
      <Text>Hello world!</Text>
    </View>
  )
}
`;

// config 模板
const configTep = `export default definePageConfig({
  navigationBarTitleText: ''
});
`;

// scss 模板
const scssTep = ``;


mkdirsSync(dirname); // mkdir $1
process.chdir(dirname); // cd $1
fs.writeFileSync(`index.tsx`, viewTep); // write tsx
fs.writeFileSync(`index.config.ts`, configTep); // write tsx
fs.writeFileSync(`index.scss`, scssTep); // write scss

console.log('创建成功');
process.exit(0);
