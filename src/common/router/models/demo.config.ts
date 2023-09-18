import { RouterConfig } from '../types';

export default {
  entry: { path: '/pages/demo/entry/index', title: '示例入口' } as RouterConfig,

  base: { path: '/pages/demo/base/index', title: 'state & props & 事件处理' } as RouterConfig,
  store: { path: '/pages/demo/store/index', title: '全局数据' } as RouterConfig,
  navigation: { path: '/pages/demo/navigation/index', title: '页面导航' } as RouterConfig,
  request: { path: '/pages/demo/request/index', title: '网络请求' } as RouterConfig,
  pullDownRefresh: { path: '/pages/demo/pull-down-refresh/index', title: '下拉刷新' } as RouterConfig,
  list: { path: '/pages/demo/list/index', title: '列表' } as RouterConfig,
  eventsList: { path: '/pages/demo/events/list/index', title: '事件总线-列表' } as RouterConfig,
  eventsDetail: { path: '/pages/demo/events/detail/index', title: '事件总线-详情' } as RouterConfig,
  auth: { path: '/pages/demo/auth/index', title: '权限&未登录拦截' } as RouterConfig,
  formValidate: { path: '/pages/demo/form-validate/index', title: '表单校验' } as RouterConfig,
  format: { path: '/pages/demo/format/index', title: '数据格式化' } as RouterConfig,
  numberPrecision: { path: '/pages/demo/number-precision/index', title: '小数精度' } as RouterConfig,
  location: { path: '/pages/demo/location/index', title: '定位地图' } as RouterConfig,
  event: { path: '/pages/demo/event/index', title: '自定义事件' } as RouterConfig,
  posterRender: { path: '/pages/demo/poster-render/index', title: '海报分享图' } as RouterConfig,
  errorCapture: { path: '/pages/demo/error-capture/index', title: '错误捕获' } as RouterConfig,
  scrollAnchor: { path: '/pages/demo/scroll-anchor/index', title: '滚动锚点' } as RouterConfig,
  charts: { path: '/pages/demo/charts/index', title: '可视化图表' } as RouterConfig,
  
  icon: { path: '/pages/demo/icon/index', title: '图标' } as RouterConfig,
  imagePreview: { path: '/pages/demo/image-preview/index', title: '图片查看' } as RouterConfig,
  filePicker: { path: '/pages/demo/file-picker/index', title: '文件选择&上传' } as RouterConfig,
  actionsheet: { path: '/pages/demo/actionsheet/index', title: '动作面板' } as RouterConfig,
  navigationBar: { path: '/pages/demo/navigation-bar/index', title: '自定义导航栏' } as RouterConfig,
  swipeCell: { path: '/pages/demo/swipe-cell/index', title: '滑动操作' } as RouterConfig,
  popup: { path: '/pages/demo/popup/index', title: '弹出层' } as RouterConfig,
  badge: { path: '/pages/demo/badge/index', title: '徽标' } as RouterConfig,
  indexBar: { path: '/pages/demo/index-bar/index', title: '索引列表' } as RouterConfig,
  tabs: { path: '/pages/demo/tabs/index', title: '标签页' } as RouterConfig,
  listView: { path: '/pages/demo/list-view/index', title: '列表组件' } as RouterConfig,
  popover: { path: '/pages/demo/popover/index', title: '弹出气泡' } as RouterConfig,
  dropdownMenu: { path: '/pages/demo/dropdown-menu/index', title: '下拉菜单' } as RouterConfig,
  steps: { path: '/pages/demo/steps/index', title: '步骤条' } as RouterConfig,
  noticeBar: { path: '/pages/demo/notice-bar/index', title: '通知栏' } as RouterConfig,
  picker: { path: '/pages/demo/picker/index', title: '选择器' } as RouterConfig,
  cell: { path: '/pages/demo/cell/index', title: '单元格' } as RouterConfig,
  radio: { path: '/pages/demo/radio/index', title: '单选框' } as RouterConfig,
  checkbox: { path: '/pages/demo/checkbox/index', title: '复选框' } as RouterConfig,
  form: { path: '/pages/demo/form/index', title: '表单组件' } as RouterConfig,
  grid: { path: '/pages/demo/grid/index', title: '宫格布局' } as RouterConfig,
  code: { path: '/pages/demo/code/index', title: '条形码、二维码生成' } as RouterConfig,
  result: { path: '/pages/demo/result/index', title: '结果' } as RouterConfig,
  select: { path: '/pages/demo/select/index', title: '选择项' } as RouterConfig,
};
