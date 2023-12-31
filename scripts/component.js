/* eslint-disable import/no-commonjs */
/**
 *  components 组件快速生成脚本
 *
 *  npm run create:comp '文件夹' or '路径/文件夹'
*/
const fs = require('fs');
const { mkdirsSync, formatConversion } = require('./utils');

const dirName = process.argv[2];


if (!dirName) {
  console.warn('组件名称不能为空');
  console.log('eg: npm run tem test');
  process.exit(0);
}

const fullpath = `./src/common/components/${dirName}`;
const isExist = fs.existsSync(fullpath);
if (isExist) {
  console.warn(`组件(${fullpath})已存在`);
  process.exit(0);
}

// 组件名称
const compName = formatConversion(dirName);

// 组件模板 ---------------
const indexTep = `import { View } from '@tarojs/components';

import { ${compName}Props } from './types';
import './index.scss';

const Index = (props: ${compName}Props) => {
  const {} = props;
  
  return (
    <View className="${dirName}">
      This is empty component
    </View>
  );
};

export default Index;
`;

// types 模板 ---------------
const typesTep = `export interface ${compName}Props {}
`;

// scss 模板 ---------------
const scssTep = `.${dirName} {

}`;

// 入口 ---------------
const entryTep = `export { default as ${compName} } from './${dirName}';
`;


mkdirsSync(fullpath); // mkdir $1
process.chdir(fullpath); // cd $1
fs.writeFileSync(`${dirName}.tsx`, indexTep); // write tsx
fs.writeFileSync(`types.ts`, typesTep); // write types
fs.writeFileSync(`index.scss`, scssTep); // write scss
fs.writeFileSync(`index.ts`, entryTep); // write tsx

console.log(`组件 ${dirName} 创建成功`);
process.exit(0);
