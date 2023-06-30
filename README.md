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
TODO: 更新
```bash
.
├─ config                         # 脚手架配置
│   ├─ dev.js
│   ├─ index.js
│   └─ prod.js
├─ dist                           # 项目输出目录
├─ src
│   ├─ analysis                   # 第三方统计分析
│   ├─ api                        # 请求接口统一管理
│   ├─ assets                     # 资源统一管理
│   │   └─ images                 # 图片资源
│   │       ├─ tabbar             # tabbar 的图标
│   │       └─ ...
│   ├─ components                 # 组件
│   │   ├─ ...                    # 组件入口文件
│   │   └─ index.ts
│   ├─ config                     # 项目开发配置
│   │   └─ index.ts
│   ├─ constants                  # 公用常量统一管理
│   │   ├─ events                 # 自定义时间 CODE 的枚举
│   │   └─ store-key.ts           # 本地存储 KEY
│   ├─ hooks                      # 自定义 hooks
│   │   ├─ check-login.ts         # 操作前校验是否登录
│   │   ├─ geocoder.ts            # 地理信息获取
│   │   ├─ index.ts               # 自定义 hooks 入口文件
│   │   ├─ input.ts               # 监听处理输入值
│   │   └─ list.ts                # 列表
│   ├─ models                     # 公用、业务模块接口定义
│   ├─ pages                      # 页面目录. 尽量按模块划分
│   │   ├─ account
│   │   │   ├─ login
│   │   │   └─ welcome
│   │   ├─ home
│   │   ├─ mine
│   │   └─ started
│   ├─ reducers                  # redux 状态管理的 reducers
│   │   ├─ account.ts            # 帐号信息
│   │   └─ debug.ts              # 调试
│   ├─ request
│   │   ├─ index.ts              # 网络请求函数封装
│   │   ├─ interceptors.ts       # 请求、响应拦截
│   │   └─ type.ts               # 相关类型、接口定义
│   ├─ router
│   │   ├─ index.ts              # 路由相关函数 & 页面路径配置
│   │   └─ path.ts               # 页面路径配置
│   ├─ store                     # 全局状态
│   │   └─ index.ts              # 入口文件
│   ├─ styles
│   │   ├─ index.scss            # 样式入口文件
│   │   └─ var.scss              # 全局样式变量
│   ├─ sub-pages                 # 分包
│   ├─ uma                       # 友盟统计
│   ├─ utils                     # 工具类
│   │   ├─ verification          # 表单校验类
│   │   ├─ index.t               # 常用工具函数
│   │   └─ qqmap-wx-jssdk.js     # 腾讯地图 SDK
│   ├─ app.scss                  # 全局样式
│   ├─ app.tsx                   # 项目入口文件
│   ├─ sitemap.json              # 站点配置. 面向爬虫
│   └─ index.html                # H5 的开始文件
├─ .eslintignore                 # eslint 校验忽略规则配置
├─ .eslintrc                     # eslint 校验配置
├─ package.json
├─ project.config.json           # 项目配置
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
