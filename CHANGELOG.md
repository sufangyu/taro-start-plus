

## 1.1.0 (2023-07-28)


### 📝文档

* 更新 说明文档 ([8ab8bea](https://github.com/sufangyu/taro-start-plus/commit/8ab8bea4c02ae8ee95ccfe3853b646a7f1191484))


### 🐛问题修复

* 修复 [@import](https://github.com/import) 被误格自动化式化问题（使用[@use](https://github.com/use)） ([d9aea37](https://github.com/sufangyu/taro-start-plus/commit/d9aea370f8b7c9bcdd1ce63bb306f3d126703d35))
* 修复 h5 编译缺 process & eslint 没有 key 校验 ([03f0548](https://github.com/sufangyu/taro-start-plus/commit/03f0548842afa892b6e27b5ae8e4439bd97ede6c))
* 修复 H5 编译错误问题 ([8db8337](https://github.com/sufangyu/taro-start-plus/commit/8db83370c9a4cbb18f3ea480eda069d3cac5df68))
* 修复 taro.getTabBar 其他小程序报错问题 ([82c1ef5](https://github.com/sufangyu/taro-start-plus/commit/82c1ef563ee3bd1689645e09fe7ba52dce3a0f1b))
* 修复 webview 传参在加载时丢失问题 ([066bb82](https://github.com/sufangyu/taro-start-plus/commit/066bb82c30621d8804ab121b4122100fa34ca95e))
* 修复 不传参无效问题 ([6ac6dc2](https://github.com/sufangyu/taro-start-plus/commit/6ac6dc2b82d74a014c7e32119ad53a717ae43461))
* 修复 取消扫码也会提示识别失败问题 ([9adae36](https://github.com/sufangyu/taro-start-plus/commit/9adae362799b7205e070307327bf78f7cb3d4840))
* 修复 自定义navigation-bar多余符号 ([55e3480](https://github.com/sufangyu/taro-start-plus/commit/55e3480faa6c857240824fd29341fbc5ccb94d70))
* 修复 部分类型小程序（飞书）自动关闭在点击action项无法关闭问题 ([749f2d8](https://github.com/sufangyu/taro-start-plus/commit/749f2d822a7ef89b823a5c5cd47abb28e566e6b8))


### 💄代码格式

* eslint 导入顺序 ([0f26839](https://github.com/sufangyu/taro-start-plus/commit/0f2683946ee139343e4087ce8f612267a0474c7e))
* 优化 图片查看的尺寸大小, 以4个一行显示 ([15b3a76](https://github.com/sufangyu/taro-start-plus/commit/15b3a7678fab55c4e66f6ba5cc392228aaf46dc3))
* 优化 样式 ([95a033e](https://github.com/sufangyu/taro-start-plus/commit/95a033e855a7d89038db4fab4b8a2928f649f044))
* 调整 页面初始化代码风格 ([83d6ccc](https://github.com/sufangyu/taro-start-plus/commit/83d6ccc2c2a55e8575e5aed0bc4aae0cb681d111))


### ✨新功能

* 初始化、全局状态、页面跳转 ([91c2cd0](https://github.com/sufangyu/taro-start-plus/commit/91c2cd0c684b97e299c8652b89e62c92cab5b8be))
* 增加 actionsheet（动作面板） ([6e971b9](https://github.com/sufangyu/taro-start-plus/commit/6e971b9c0125e3eafb0025ac1d3bd83ea6d41ffa))
* 增加 DropdownMenu 下拉菜单组件&示例 ([0622685](https://github.com/sufangyu/taro-start-plus/commit/06226854e2638183e4b59b44ec79da6107c3b0d4))
* 增加 popover 组件&示例 ([095bc2f](https://github.com/sufangyu/taro-start-plus/commit/095bc2f5d36e2779412a14e6dab170e3c81d2da6))
* 增加 popup 弹出层组件&示例 ([df99a92](https://github.com/sufangyu/taro-start-plus/commit/df99a92e617c54b9b8a8c736437a0f9dd0835d84))
* 增加 tabs 选项卡在左侧、右侧、底部布局 ([9fe8244](https://github.com/sufangyu/taro-start-plus/commit/9fe8244e8ecb37af0cd633f1f0799d30e2c96e32))
* 增加 tab标签页组件&示例 ([ae01450](https://github.com/sufangyu/taro-start-plus/commit/ae014508af609b96919b72abf5acfa62c9a780a7))
* 增加 useList hooks 统一封装处理列表 & 示例 ([c493814](https://github.com/sufangyu/taro-start-plus/commit/c4938147d387e6208b088c31370b6a4eaebd1f6a))
* 增加 下拉刷新、上拉无限加载组件&示例 ([572bd71](https://github.com/sufangyu/taro-start-plus/commit/572bd71b8648b45f0712e0fc15cf16b8524c93ed))
* 增加 事件总线hooks & 示例 ([845f519](https://github.com/sufangyu/taro-start-plus/commit/845f519a79ea0a2e12a48db0a5bd2085add7265c))
* 增加 二维码、条形码示例 ([f2d2a7d](https://github.com/sufangyu/taro-start-plus/commit/f2d2a7dd371ba3634c1a6f55179e039db2212f38))
* 增加 分享海报图的 webview 示例 ([99b6fac](https://github.com/sufangyu/taro-start-plus/commit/99b6fac1ccd4cdf23fbaede37db34388f054576d))
* 增加 图片查看组件&示例 ([e11bfce](https://github.com/sufangyu/taro-start-plus/commit/e11bfce5d551ebb8fb11036eb59eefecbb86011e))
* 增加 定位、地址信息Hooks&示例 ([6574345](https://github.com/sufangyu/taro-start-plus/commit/6574345d4afe8fedad2f0730202c18cdc9e4a9d7))
* 增加 导航栏逐显逐隐效果 ([8f8f8c3](https://github.com/sufangyu/taro-start-plus/commit/8f8f8c39661bd8c5891f52e55ba57698974623af))
* 增加 小数精度处理示例 ([d52dbbc](https://github.com/sufangyu/taro-start-plus/commit/d52dbbc3d1a70a8b767f581061a6aaa920038893))
* 增加 小程序更新 ([d4e924b](https://github.com/sufangyu/taro-start-plus/commit/d4e924b8653307ea564cf73b26efa2cd652887d6))
* 增加 徽标组件&示例 ([17c773b](https://github.com/sufangyu/taro-start-plus/commit/17c773bd407bc0c4cac38bf21bfab5e9d3ac1a87))
* 增加 扫码、webview封装&示例 ([d71cd09](https://github.com/sufangyu/taro-start-plus/commit/d71cd093c1df00c86acb120cc14d895d9783bbe5))
* 增加 接入友盟统计、埋点 ([7d7b4ab](https://github.com/sufangyu/taro-start-plus/commit/7d7b4abd5f556bd685e7686a9cfee54cee690768))
* 增加 文件选择&上传组件、示例 ([c8118d0](https://github.com/sufangyu/taro-start-plus/commit/c8118d0e05ad7fa5a0fab78d74a282b5dfb67d68))
* 增加 滑动操作组件&示例 ([2af6aa2](https://github.com/sufangyu/taro-start-plus/commit/2af6aa265c32e5fec398677ff33bae558c0ec98f))
* 增加 滚动定位示例 ([21d8b3a](https://github.com/sufangyu/taro-start-plus/commit/21d8b3a14847e76f0fa257bca24ce23a54071814))
* 增加 状态格式化管理、时间格式化工具类&示例 ([a27b787](https://github.com/sufangyu/taro-start-plus/commit/a27b7878d80ffc5a2758d498098c0e996c431f72))
* 增加 生成海报图示例 ([3b01315](https://github.com/sufangyu/taro-start-plus/commit/3b0131567c86161ec9356f0d1258bf0d67dfeb0e))
* 增加 索引列表组件&示例 ([110b6cf](https://github.com/sufangyu/taro-start-plus/commit/110b6cf846fdd3d7a026e3b56fe72ccd228354b2))
* 增加 网络请求 ([17d9b6a](https://github.com/sufangyu/taro-start-plus/commit/17d9b6a7e2d0f792b3e151f12836d373c5d51af5))
* 增加 自定 tabbar ([2cf8278](https://github.com/sufangyu/taro-start-plus/commit/2cf827874c48a4b43a9abcd4abdc32e3ad46105a))
* 增加 自定义导航行组件、示例 ([7d1a346](https://github.com/sufangyu/taro-start-plus/commit/7d1a346bc8c36c505eba3cc952b6b19d338261a2))
* 增加 表单输入项赋值hooks、校验工具类&示例 ([1037942](https://github.com/sufangyu/taro-start-plus/commit/1037942b8f0990376735c08b726e4cb2548099d4))
* 增加 需登录才可操作的hooks&示例；完善注册登录页面流程 ([d6a54bf](https://github.com/sufangyu/taro-start-plus/commit/d6a54bf26ba28ee7239f7c151aef946f77ec9cb1))
* 调整 随机 uuid 为公共维护 ([6883246](https://github.com/sufangyu/taro-start-plus/commit/6883246a06c9102b75f9b44fa04ba2d0482d1416))


### 🔨配置文件

* :hammer: 接入文件名、style、commitmsg等规范校验 ([e93c92a](https://github.com/sufangyu/taro-start-plus/commit/e93c92a14ab2c4d8ec2a4d0c3e97fcbcb38f52ac))
* 优化 CI 信息显示格式 ([3c801d1](https://github.com/sufangyu/taro-start-plus/commit/3c801d17ed08a31dd41cb1bdf91c32af17af07f2))
* 使用 release-it 管理版本&log ([1f82958](https://github.com/sufangyu/taro-start-plus/commit/1f82958f4044e90c44593ce4237c8a39e43d8803))
* 增加 ci 发版描述显示 git commit ID ([0a45d6a](https://github.com/sufangyu/taro-start-plus/commit/0a45d6a6ade220bee3bf858d791d3749e9cfa84b))
* 增加 commit type 类型配置 ([e5a3db2](https://github.com/sufangyu/taro-start-plus/commit/e5a3db2e670d0bff4e1c73dc12a64d143b7d028f))
* 增加 飞书小程序配置文件 ([aa72d48](https://github.com/sufangyu/taro-start-plus/commit/aa72d48a6e2a18a3b93ed5d0d40019d4a22affcf))
* 接入 CI ([404001f](https://github.com/sufangyu/taro-start-plus/commit/404001fddd83b7c216611874d525ba0a607f08a7))
* 接入 eslint ([ad66dbe](https://github.com/sufangyu/taro-start-plus/commit/ad66dbe2b6cef5507719886fb0aa54ea9b1ba8f9))
* 支持飞书小程序 ([59f7573](https://github.com/sufangyu/taro-start-plus/commit/59f7573a877248f34cf5e113f5da1f908b285d24))
* 禁用 commit-msg 使用 emoji & 生成 log 文件 ([d9d666a](https://github.com/sufangyu/taro-start-plus/commit/d9d666aa72d2819d255b36864fbae869837fb877))
* 调整 页面默认模版 ([7aa3455](https://github.com/sufangyu/taro-start-plus/commit/7aa34555ded8f4ba543f3e76b259e62f762748cc))

## 1.0.0 (2023-07-11)


### 📝文档

* 更新 说明文档 ([8ab8bea](https://github.com/sufangyu/taro-start-plus/commit/8ab8bea4c02ae8ee95ccfe3853b646a7f1191484))


### 🐛问题修复

* 修复 webview 传参在加载时丢失问题 ([066bb82](https://github.com/sufangyu/taro-start-plus/commit/066bb82c30621d8804ab121b4122100fa34ca95e))
* 修复 不传参无效问题 ([6ac6dc2](https://github.com/sufangyu/taro-start-plus/commit/6ac6dc2b82d74a014c7e32119ad53a717ae43461))
* 修复 取消扫码也会提示识别失败问题 ([9adae36](https://github.com/sufangyu/taro-start-plus/commit/9adae362799b7205e070307327bf78f7cb3d4840))


### 💄代码格式

* 优化 图片查看的尺寸大小, 以4个一行显示 ([15b3a76](https://github.com/sufangyu/taro-start-plus/commit/15b3a7678fab55c4e66f6ba5cc392228aaf46dc3))
* 优化 样式 ([95a033e](https://github.com/sufangyu/taro-start-plus/commit/95a033e855a7d89038db4fab4b8a2928f649f044))


### ✨新功能

* 初始化、全局状态、页面跳转 ([91c2cd0](https://github.com/sufangyu/taro-start-plus/commit/91c2cd0c684b97e299c8652b89e62c92cab5b8be))
* 增加 actionsheet（动作面板） ([6e971b9](https://github.com/sufangyu/taro-start-plus/commit/6e971b9c0125e3eafb0025ac1d3bd83ea6d41ffa))
* 增加 useList hooks 统一封装处理列表 & 示例 ([c493814](https://github.com/sufangyu/taro-start-plus/commit/c4938147d387e6208b088c31370b6a4eaebd1f6a))
* 增加 事件总线hooks & 示例 ([845f519](https://github.com/sufangyu/taro-start-plus/commit/845f519a79ea0a2e12a48db0a5bd2085add7265c))
* 增加 二维码、条形码示例 ([f2d2a7d](https://github.com/sufangyu/taro-start-plus/commit/f2d2a7dd371ba3634c1a6f55179e039db2212f38))
* 增加 分享海报图的 webview 示例 ([99b6fac](https://github.com/sufangyu/taro-start-plus/commit/99b6fac1ccd4cdf23fbaede37db34388f054576d))
* 增加 图片查看组件&示例 ([e11bfce](https://github.com/sufangyu/taro-start-plus/commit/e11bfce5d551ebb8fb11036eb59eefecbb86011e))
* 增加 定位、地址信息Hooks&示例 ([6574345](https://github.com/sufangyu/taro-start-plus/commit/6574345d4afe8fedad2f0730202c18cdc9e4a9d7))
* 增加 小数精度处理示例 ([d52dbbc](https://github.com/sufangyu/taro-start-plus/commit/d52dbbc3d1a70a8b767f581061a6aaa920038893))
* 增加 小程序更新 ([d4e924b](https://github.com/sufangyu/taro-start-plus/commit/d4e924b8653307ea564cf73b26efa2cd652887d6))
* 增加 扫码、webview封装&示例 ([d71cd09](https://github.com/sufangyu/taro-start-plus/commit/d71cd093c1df00c86acb120cc14d895d9783bbe5))
* 增加 接入友盟统计、埋点 ([7d7b4ab](https://github.com/sufangyu/taro-start-plus/commit/7d7b4abd5f556bd685e7686a9cfee54cee690768))
* 增加 文件选择&上传组件、示例 ([c8118d0](https://github.com/sufangyu/taro-start-plus/commit/c8118d0e05ad7fa5a0fab78d74a282b5dfb67d68))
* 增加 状态格式化管理、时间格式化工具类&示例 ([a27b787](https://github.com/sufangyu/taro-start-plus/commit/a27b7878d80ffc5a2758d498098c0e996c431f72))
* 增加 生成海报图示例 ([3b01315](https://github.com/sufangyu/taro-start-plus/commit/3b0131567c86161ec9356f0d1258bf0d67dfeb0e))
* 增加 网络请求 ([17d9b6a](https://github.com/sufangyu/taro-start-plus/commit/17d9b6a7e2d0f792b3e151f12836d373c5d51af5))
* 增加 自定 tabbar ([2cf8278](https://github.com/sufangyu/taro-start-plus/commit/2cf827874c48a4b43a9abcd4abdc32e3ad46105a))
* 增加 自定义导航行组件、示例 ([7d1a346](https://github.com/sufangyu/taro-start-plus/commit/7d1a346bc8c36c505eba3cc952b6b19d338261a2))
* 增加 表单输入项赋值hooks、校验工具类&示例 ([1037942](https://github.com/sufangyu/taro-start-plus/commit/1037942b8f0990376735c08b726e4cb2548099d4))
* 增加 需登录才可操作的hooks&示例；完善注册登录页面流程 ([d6a54bf](https://github.com/sufangyu/taro-start-plus/commit/d6a54bf26ba28ee7239f7c151aef946f77ec9cb1))


### 🔨配置文件

* :hammer: 接入文件名、style、commitmsg等规范校验 ([e93c92a](https://github.com/sufangyu/taro-start-plus/commit/e93c92a14ab2c4d8ec2a4d0c3e97fcbcb38f52ac))
* 使用 release-it 管理版本&log ([1f82958](https://github.com/sufangyu/taro-start-plus/commit/1f82958f4044e90c44593ce4237c8a39e43d8803))
* 增加 飞书小程序配置文件 ([aa72d48](https://github.com/sufangyu/taro-start-plus/commit/aa72d48a6e2a18a3b93ed5d0d40019d4a22affcf))
* 接入 CI ([404001f](https://github.com/sufangyu/taro-start-plus/commit/404001fddd83b7c216611874d525ba0a607f08a7))
* 接入 eslint ([ad66dbe](https://github.com/sufangyu/taro-start-plus/commit/ad66dbe2b6cef5507719886fb0aa54ea9b1ba8f9))
* 支持飞书小程序 ([59f7573](https://github.com/sufangyu/taro-start-plus/commit/59f7573a877248f34cf5e113f5da1f908b285d24))
* 调整 页面默认模版 ([7aa3455](https://github.com/sufangyu/taro-start-plus/commit/7aa34555ded8f4ba543f3e76b259e62f762748cc))