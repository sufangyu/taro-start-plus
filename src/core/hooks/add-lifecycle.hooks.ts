type HookFunc = (...args: any[]) => void
type AppHook = 'onLaunch' | 'onShow' | 'onHide' | 'onError' | 'onPageNotFound'

const consoleError = (_this: string, hook: string, method: Function, err: string): void => {
  console.error(`${_this} ${hook} 执行报错 ${method.name ? `函数名称 => ${method.name}` : `函数体 => \n${method.toString()}`} ${`报错信息 => \n${err}`}`);
};

// eslint-disable-next-line no-underscore-dangle
const _App = App;

const appHooks: Record<AppHook, HookFunc[]> = {
  onLaunch: [],
  onShow: [],
  onHide: [],
  onError: [],
  onPageNotFound: [],
};

App = (app) => {
  Object.keys(appHooks).forEach(hook => {
    if (appHooks[hook].length) {
      const originHook = app[hook];
      app[hook] = function fn(...args) {
        originHook?.apply(this, args);

        appHooks[hook].forEach((method: HookFunc) => {
          try {
            method.apply(this, args);
          } catch (err) {
            consoleError('appHooks', hook, method, err);
          }
        });
      };
    }
  });
  _App(app);
};

type PageHook = 'onLoad' | 'onShow' | 'onReady' | 'onHide' | 'onUnload' | 'onRouteDone' | 'onPullDownRefresh' | 'onReachBottom' | 'onPageScroll' | 'onAddToFavorites' | 'onShareAppMessage' | 'onShareTimeline' | 'onResize' | 'onTabItemTap' | 'onSaveExitState'

// eslint-disable-next-line no-underscore-dangle
const _Page = Page;

const pageHooks: Record<PageHook, HookFunc[]> = {
  onLoad: [],
  onShow: [],
  onReady: [],
  onHide: [],
  onUnload: [],
  onResize: [],
  onRouteDone: [],
  onPageScroll: [],
  onTabItemTap: [],
  onReachBottom: [],
  onShareTimeline: [],
  onSaveExitState: [],
  onAddToFavorites: [],
  onPullDownRefresh: [],
  onShareAppMessage: [],
};

Page = (page) => {
  Object.keys(pageHooks).forEach(hook => {
    if (pageHooks[hook].length) {
      const originHook = page[hook];
      page[hook] = function fn(...args) {
        originHook?.apply(this, args);

        pageHooks[hook].forEach((method: HookFunc) => {
          try {
            method.apply(this, args);
          } catch (err) {
            consoleError('pageHook', hook, method, err);
          }
        });
      };
    }
  });
  _Page(page);
};

/**
 * @description: 统一修改小程序的生命周期钩子, 在对应的生命周期运行添加的方法
 * @param {string} type 添加入App还是Page的生命周期
 * @param {AppHook} hook 需要增加的生命周期
 * @param {HookFunc} method 需要增加的方法
 * @return {*}
 */
function addLifecycleHook (type: 'appHooks', hook: AppHook, method: HookFunc): void
function addLifecycleHook (type: 'pageHooks', hook: PageHook, method: HookFunc): void
function addLifecycleHook(type: any, hook: any, method: any): void {
  switch (type) {
    case 'appHooks':
      appHooks[hook].push(method);
      break;
    case 'pageHooks':
      pageHooks[hook].push(method);
      break;
    default:
      console.error('无效 type => ', type);
  }
}

export default addLifecycleHook;


