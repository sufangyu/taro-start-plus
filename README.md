# Taro start plus

## 介绍
Taro 小程序通用模板， 开箱即用


## 安装、开发、构建

```bash
# install with yarn
pnpm install

# 开发
pnpm run dev:weapp

# 构建
pnpm run build:weapp

# 构建指定环境
# npm run build:weapp -- --env=$value
pnpm run build:weapp -- --env=test
```

## 快速创建页面/组件
```bash
# 页面
pnpm run create:page mine
pnpm run create:page order/list

# 组件
pnpm run create:comp button
```


## 目录结构 
```bash
.
├─ config                         # 脚手架配置
│   ├─ ci.config.js               # CI 配置（密钥、账号）
│   ├─ ci.hooks.js                # CI 钩子函数
│   ├─ dev.js
│   ├─ index.js
│   └─ prod.js
│
├─ dist                           # 项目输出目录
├─ key                            # 私钥文件
├─ mock                           # Mock 服务
├─ src
│   ├─ assets                     # 资源统一管理
│   │   └─ images                 # 图片资源
│   │       ├─ icons              # 页面图表
│   │       ├─ ...                 
│   │       └─ tabbar             # tabbar 的图标
│   │
│   ├─ common                     # 公共代码（业务相关）
│   │   ├─ api                    # 网络请求
│   │   ├─ components             # 自定义组件
│   │   ├─ config                 # 配置文件（API、第三方 key 等）
│   │   ├─ constants              # 常量配置（本地缓存 key 等）
│   │   ├─ enums                  # 枚举配置
│   │   ├─ models                 # 模型、类型（Entity、Req模型、Res模型）
│   │   ├─ routers                # 路由配置、路由工具函数
│   │   │   ├─ models             # 模块页面路由配置
│   │   │   ├─ router.utils.ts    # 路由工具函数
│   │   │   ├─ models             # 模块页面路由配置
│   │   │   ├─ types.ts           # 路由类型文件   
│   │   │   └─ index.ts           # 入口文件（对外暴露的能力）
│   │   ├─ stores                 # 全局状态管理
│   │   └─ styles                 # 全局样式、mixins、functions、var 配置等
│   │
│   ├─ core                       # 核心代码（非业务相关）
│   │   ├─ analysis               # 统计
│   │   ├─ hooks                  # Hooks（监听总线、地理位置、输入赋值、列表、登录操作校验）
│   │   ├─ http                   # 网络请求
│   │   └─ utils                  # 工具函数
│   │
│   ├─ custom-tab-bar             # 自定义 tabbar
│   ├─ pages                      # 页面目录（尽量按模块划分）
│   │   ├─ account
│   │   │   ├─ login
│   │   │   └─ welcome
│   │   ├─ home
│   │   ├─ mine
│   │   └─ started
│   │
│   ├─ sub-pages                 # 分包
│   │
│   ├─ app.config.ts             # 全局配置
│   ├─ app.scss                  # 全局样式
│   ├─ app.ts                    # 项目入口文件
│   ├─ index.html                # H5 的开
│   └─ sitemap.json              # 站点配置（面向爬虫）始文件
├─ types                         # 全局类型声明
├─ .eslintignore                 # eslint 校验忽略规则配置
├─ .eslintrc                     # eslint 校验配置
├─ package.json
├─ project.config.json           # 项目配置
├─ project.*.json                # 特定平台的项目配置
├─ README.md
├─ tsconfig.json
└─ yarn.lock
```


## 推荐规范

### 命名

**文件后缀**

普通 JS 文件的后缀为 `.ts`, 页面和组件文件的后缀为 `.tsx` 

**目录、文件命名**

全部采用小写方式， 以中划线分隔。
例: scripts, retina-sprites.scss, data.js, actionsheet.ts, actionsheet.tsx


**css 变量命名规范**
统一使用kebab-case(小写短横线)命名规范。

```html
<!-- tsx 文件 -->
<view className="app-home-taro"></view>

<!-- 样式文件 -->
.app-home-taro {}
```

**js 变量命名规范**
统一使用camelCase（小写驼峰式）命名规范。

```js
let myName = 'zhangsanfeng';
```

### 属性书写
- 少于2个, 一行书写
- 超过2个则每个写一行, 最后一个尖括号占一行
 
```html
<!-- 少于 2 个 -->
<MenuItem :url="item.url" :actived="item.actived"></MenuItem>

<!-- 3 个以上 -->
<MenuItem
  :key="item.id"
  :url="item.url"
  :isLast="item.isLast"
  :actived="item.actived"
>{item.label}</MenuItem>
```


## 组件组织
- 基础 UI 组件统一放在 `src/components`, 并且通过 `src/components` 入口文件对外导出
- 页面业务组件放在对于页面下的 components 文件.

## 七、创建、配置页面
1. 手动或者命令行创建页面
2. 配置页面的路由信息
  - 存在 config 文件: `src/common/router/models` 对应的配置 `path`、`title`、`isSubPackage`（分包）
  - 不存在 config 文件如: 创建 config 文件, 命名为 [name].config.ts. 然后在 `src/common/router/models/index.ts` 导入并且加上新增的配置

  ```ts
  import testRouterConfig from "./[name].config";

  const appRouterConfig = {
    // ohter router config
    ...testRouterConfig,
  };

  ```

## 页面跳转
```ts
import { routeUtil } from '@/core/utils';
import { appRouterConfig } from '@/common/router';

routeUtil.toPage({
  url: appRouterConfig.switchEnv.path
});

```

## Hooks

### useList
列表请求的处理，提供能力有：
- loading: 是否加载中
- isInit: 是否初始化. 只有初始加载才是 true
- isLasted: 是否最后一页. 根据当前页码与总页码对比
- list: 列表数据
- pagination: 页码信息. 当前页码、页条数、总条数
- getList: 请求列表
- getListNext: 请求下一页. 处理页码 + 1 后执行 `onPageChange`
- onSearch: 搜索. 用于查询条件变更
- onPageChange: 页码信息. 当前页码、页条数 变更触发
```ts
// 使用
const {
  list,
  isLasted,
  loading,
  isInit,
  pagination,
  onSearch, getListNext,
} = useList<List>({
  initPage: 1,
  initSize: 15,
  query,
  fetch: getList,
});
```

### useInput
处理表单的输入赋值

```ts
// 1. 单个值
const [name, setName] = useInput<string>('');
const [address, setAddress] = useInput<string[]>([]);

<Input value={name} onInput={(ev) => setName(ev)} />

// 2. 对象值
const [others, setOthers] = useInput({
  password: '',
  mobile: '',
  age: '',
  address: [],
  delivery: true,
});

<Input
  value={others.age}
  type='number'
  onInput={(ev) => {
    return setOthers(ev, 'age', (val: number) => {
      return val > 18 ? 18 : val;
    });
  }}
/>
```

### useEvents
事件总线监听. 用于跨页面数据通信

```ts
// 监听事件
useEvents<{name: string; age: number}>(EventNameEnum.刷新列表, (args) => {
  console.log('监听用户信息=>>', args);
  setPerson((prevState) => ({
    ...prevState,
    name: args.name,
    age: args.age
  }));
});

// 触发事件
Taro.eventCenter.trigger(EventNameEnum.刷新列表, {
  name: 'zsf', age: 20,
} as {name: string; age: number});
```

## 枚举、状态管理
统一在 `src/common/enums` 文件夹下面管理。如果有枚举及用于UI枚举中文描述的需要，可以按以下三步定义：
1. 定义枚举（enum）
2. 定义状态对应的描述（map）
3. 定义状态描述类型（type）

具体代码可以参考下面：
```ts
/** 状态枚举类型 */
export enum StatusEnum {
  FORBIDDEN = 0,
  NORMAL = 1
}

/** 状态描述 */
export const StatusMessage = {
  0: '禁用',
  1: '正常'
}

/** 状态描述类型 */
export type StatusType = keyof typeof StatusMessage
```
定义完成之后，可以想以下示例代码类似的使用
```ts
// 参数定义, 用于接口传参
const user = {
  status: StatusMessage.FORBIDDEN,
}

// UI 显示
<View>禁用: {StatusMessage[0]}</View>
<View>正常: {StatusMessage[1]}</View>
```


## 第三方库使用

### number-precision
处理小数点精度问题
```ts
<View>接近正确数字：{NP.strip(0.09999999999999998)}</View>
<View>加法（0.1+0.2=0.3）：{NP.plus(0.1, 0.2)}</View>
<View>减法（1.0-0.9=0.1）：{NP.minus(1.0, 0.9)}</View>
<View>乘法（3*0.3=0.9）：{NP.times(3, 0.3)}</View>
<View>除法（1.21/1.1=1.1）：{NP.divide(1.21, 1.1)}</View>
<View>取整：{NP.round(0.105, 2)}</View>
```



## 埋点
### 友盟手动埋点
1. 在文件 `src/common/config/umeng.config.ts` 配置 appkey.
```ts
const umengConfig = {
  /** 微信小程序 appKey */
  mpWXAppKey: 'YOU_APP_KEY',

  /** 支付宝小程序 appKey */
  mpAliAppKey: 'YOU_APP_KEY',
  
  /** 飞书小程序 appKey */
  mpLarkAppKey: 'YOU_APP_KEY',
};
```
2. 在文件 `src/common/enums/report-event.enum.ts` 维护事件枚举.
```ts
export enum ReportEventNameEnum {
  // ……
  中文事件名 = 'YOU_EVENT_CODE',
}
```
3. 使用（手动触发）
```ts
import { trackUtil } from '@/core/utils/track.util'
import { ReportEventNameEnum } from '@/common/enums'

// 无参数
trackUtil.eventHandler(ReportEventNameEnum.自定义事件);

// 带参数
trackUtil.eventHandler<{name: string; age: number;}>(ReportEventNameEnum.自定义事件带参数, {
  name: '张三疯',
  age: 18,
});
```

4. 使用（半手动埋点）
- 通过事件冒泡进行实现, 在页面最外层的绑定监听事件（`trackUtil.catchElementTracker`）. 
- 通过设置 `data-code`、`data=params` 给需要埋点的元素进行埋点、参数

```ts
import { trackUtil } from '@/core/utils/track.util'
import { ReportEventNameEnum } from '@/common/enums'

// some code ……
return (
  <View className='container' onClick={trackUtil.catchElementTracker}>
    <Button type='primary' onClick={handleTriggerEvent}>埋点(事件触发)</Button>
    <Button type='primary' onClick={handleTriggerEventWithParams}>埋点有带参数(事件触发)</Button>

    <Button
      type='primary'
      data-code={ReportEventNameEnum.自定义事件}
    >埋点(自定义属性)</Button>
    <Button
      type='primary'
      data-code={ReportEventNameEnum.自定义事件}
      data-params={{
        name: '张三疯',
        age: 18,
      }}
    >埋点有参数(自定义属性)</Button>

    <Button
      type='primary'
      data-code={ReportEventNameEnum.自定义事件}
      data-params={{name: '张三疯', age: 18}}
      onClick={handleTriggerEventByStatic}
    >埋点-绑定事件(自定义属性)</Button>
    
    
    <View data-code={ReportEventNameEnum.自定义事件}>View-埋点(自定义属性)</View>
    <View
      data-code={ReportEventNameEnum.自定义事件}
      data-params={{name: '张三疯', age: 18}}
    >View-埋点有参数(自定义属性)</View>
    <View style={{textAlign: 'center'}}>View-无埋点</View>
  </View>
);
```

### 自动全埋点
可使用 `@antmjs/trace` 实现, 具体参考:
- https://www.npmjs.com/package/@antmjs/trace
- https://github.com/AntmJS/temptaro/blob/main/src/trace.ts



## 海报图生成+分享实现
### 方案一、小程序 canvas

### 方案二、webview 图片通过长按实现
具体可以查看 `_webview/src/views/demo/share.vue` 的大致实现
1. 获取动态数据
2. 通过 htmltocanvas 把 html 的 DOM 生成图片（base64）, 然后通过 img 标签显示. 

> 如果 base64 无法实现效果，可以先把 base64 上传给接口，返回 http/https 的远程图片地址



## 自定义 tabbar
在 `src/app.config.ts` 设置 tabbar 的 custom 属性为 true, 然后具体的实现逻辑在 `src/custom-tab-bar`.
设置 tabbar 的选中效果可使用以下代码实现
```ts
const curPage = Taro.getCurrentInstance() .page;

useDidShow(() => {
  const tabbar = Taro.getTabBar<CustomTabBar>(curPage)
  tabbar?.setSelected(0)
})
```
有了自定义 tabbar 后, 即可实现工具不同的用户角色/权限, 显示不同的 tabbar 了
> **注意**
> - tabbar 切换页面后, 第一次加载会出现闪烁问题, 待官方解决
> - tabbar list 配置以最大权限的用户去配置


## 字体图标
内置支持 [iconPark](https://iconpark.oceanengine.com/official) 字体图标。通过使用 `svg64` 库把 `@icon-park/svg` 的 svg 转成 base64后，使用图片进行显示。

如果增加 `iconPark` 的图标，可以参考一下代码：
```ts
// 文件：src/common/components/icon/icons.ts

import {
  // some code
  Home as originHome,
} from '@icon-park/svg';

// some code
const Home = (props: IconProps) => svg2base64(originHome, props);

export {
  // some code
  Home,
};
```




## 错误捕获
在 `app.ts` 入口文件使用`useError`、`useUnhandledRejection` 全局捕获异常错误，可以根据实际情况接入日志上报服务的接口。

需要注意的是，页面的代码如果使用 try...catch 包裹的代码片段，如果需要被全局捕获到异常错误，需要在 catch 中使用 throw 抛出异常，否则无法被捕获。

**示例:**
```ts
try {
  const a = {};
  a.b.c = 'x';
} catch (error) {
  throw new Error(error);
}
```




## CI 部署
使用 Taro 提供的 CI（持续集成）的插件 @tarojs/plugin-mini-ci。 目前已支持（企业）微信、京东、字节、支付宝、钉钉、百度小程序。

**功能包括：**
- 构建完毕后自动唤起小程序开发者工具并打开项目
- 上传代码作为开发版并生成预览二维码
- 上传代码作为体验版并生成体验二维码
- 支持 上传、预览 hooks 回调

**使用**
- 在 `config/ci.config.js` 文件配置appid、token、privateKeyPath 等所需的信息, privateKey 文件统一放在 key 目录下。
- 配置响应的 script 脚步
```bash
{
  "scripts": {
    "build:weapp": "taro build --type weapp",
    "build:weapp:preview": "taro build --type weapp --preview",
    "build:weapp:upload": "taro build --type weapp --upload",
  },
}
```

**扩展**
- 指定构建用户：`npm run build:weapp:upload -- --user={zsf}`
- 触发钩子事件, 接入 IM 通知结果：在 `config/ci.hooks.js` 文件中具体实现逻辑






## 问题
###  编译时报错缺少必要CPU feature？
删除同目录下 .swc 文件夹即可 rm -rf .swc
