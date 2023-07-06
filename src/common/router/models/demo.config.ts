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
  eventsList: { path: '/pages/demo/events/list/index', title: '事件总线-列表'} as RouterConfig,
  eventsDetail: { path: '/pages/demo/events/detail/index', title: '事件总线-详情'} as RouterConfig,
  format: { path: '/pages/demo/format/index', title: '数据格式化'} as RouterConfig,
  numberPrecision: { path: '/pages/demo/number-precision/index', title: '小数精度'} as RouterConfig,
  location: { path: '/pages/demo/location/index', title: '定位地图'} as RouterConfig,
  actionsheet: { path: '/pages/demo/actionsheet/index', title: '动作面板'} as RouterConfig,
  auth: { path: '/pages/demo/auth/index', title: '权限&未登录拦截'} as RouterConfig,
  event: { path: '/pages/demo/event/index', title: '自定义事件'} as RouterConfig,
  posterRender: { path: '/pages/demo/poster-render/index', title: '海报分享图'} as RouterConfig,
};
