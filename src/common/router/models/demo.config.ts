import { RouterConfig } from "../types";

export default {
  entry: { path: '/pages/demo/entry/index', title: '示例入口'} as RouterConfig,
  base: { path: '/pages/demo/base/index', title: 'state & props & 事件处理'} as RouterConfig,
  store: { path: '/pages/demo/store/index', title: '全局数据'} as RouterConfig,
  navigation: { path: '/pages/demo/navigation/index', title: '页面导航'} as RouterConfig,
  request: { path: '/pages/demo/request/index', title: '网络请求'} as RouterConfig,
  pullDownRefresh: { path: '/pages/demo/pull-down-refresh/index', title: '下拉刷新'} as RouterConfig,
  list: { path: '/pages/demo/list/index', title: '列表'} as RouterConfig,
  imagePreview: { path: '/pages/demo/image-preview/index', title: '图片查看'} as RouterConfig,
  filePicker: { path: '/pages/demo/file-picker/index', title: '文件选择&上传'} as RouterConfig,
  formValidate: { path: '/pages/demo/form-validate/index', title: '表单校验'} as RouterConfig,
};
