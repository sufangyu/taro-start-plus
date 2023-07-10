import Taro from '@tarojs/taro';
import { appRouterConfig, tabBarList } from '@/common/router';


interface PageOptions {
  /** 页面路径 */
  url: string;
  /** 查询参数  RootQuery */
  query? : { [key: string]: any };
  /** 页面跳转方式 */
  mode? : 'push' | 'replace';
}

// eslint-disable-next-line no-use-before-define
type RouteUtil = OmitThisParameter<typeof routeUtil>


/**
 * 显示 错误信息
 *
 * @param {string} [error={ errMsg: '' }] 错误信息
 */
const routeErrorToast = (error = { errMsg: '' }): void => {
  const { errMsg } = error;
  Taro.showToast({
    title: errMsg,
    icon: 'none',
  });
};


// tabbar 的路径
const TAB_BAR_ROUTER_PATH = (tabbarList => {
  return tabbarList.map((item: { pagePath: string }) => `/${item.pagePath}`);
})(tabBarList);

// 跳转的方式
const MODE_MAP: {push: string; replace: string} = {
  push: 'navigateTo',
  replace: 'redirectTo',
};


export const routeUtil = {
  /**
   * 跳转页面
   *
   * @param {PageOptions} options
   */
  toPage(options: PageOptions):void {
    const { url, mode = 'push', query } = options;
    const fullPath = (this as RouteUtil).getFullPath(url, query);

    // 是否 tabBar 页面
    const isTabBar = TAB_BAR_ROUTER_PATH.includes(url);
    let toAction: string;

    if (isTabBar) {
      toAction = 'switchTab';
    } else {
      toAction = MODE_MAP[mode];
    }


    Taro[toAction]({
      url: fullPath,
    }).catch((error: { errMsg: string } | undefined) => {
      routeErrorToast(error);
    });
  },

  /**
   * 返回之前页面
   *
   * @param {number} [delta=1] 页面 History 列表中的相对位置
   * @return {*}  {void}
   */
  back(delta: number = 1):void {
    const pages = Taro.getCurrentPages();
    if (pages.length <= 1) {
      console.warn('当前已是第一页');
      return;
    }
    Taro.navigateBack({ delta });
  },

  /**
   * 跳转登录页
   *
   * @param {('push' | 'replace')} [mode] 跳转方式
   * - push: 保留上一页
   * - replace: 替换上一页, 不保留
   */
  toLoginPage(mode?: 'push' | 'replace'): void {
    const { route } = (this as OmitThisParameter<typeof routeUtil>).getPage() as Taro.Page;
    const fullpath = (this as RouteUtil).getFullPath(`/${route}`);
    const fromUrl = encodeURIComponent(fullpath);
    const url = `${appRouterConfig.login.path}?from=${fromUrl}`;

    (this as RouteUtil).toPage({
      url,
      mode,
    });
  },


  /**
   * 跳转 Webview
   *
   * @param {string} url 页面路径
   * @param {string} [title] 页面标题
   * @param {('push' | 'replace')} [mode='push'] 跳转方式
   */
  toWebviewPage(url: string, title?: string, mode: 'push' | 'replace' = 'push') {
    const webUrl = (this as RouteUtil).getFullPath(appRouterConfig.webview.path, {
      url: encodeURIComponent(url),
      title: encodeURIComponent(title ?? ''),
    });
    console.log('toWebviewPage =>>', webUrl);

    (this as RouteUtil).toPage({
      url: webUrl,
      mode,
    });
  },

  /**
   * 关闭所有页面，打开到应用内的某个页面
   *
   * @param {PageOptions} options
   */
  reLaunch(options:PageOptions):void {
    const { url } = Object.assign({}, {
      url: '',
      query: {},
    }, options);
  
    Taro.reLaunch({
      url,
    }).catch((error: { errMsg: string } | undefined) => {
      routeErrorToast(error);
    });
  },

  /**
   * 获取页面信息
   *
   * @param {number} [offset=0] 偏移量
   * @return {*}  {Taro.Page}
   */
  getPage(offset: number = 0): Taro.Page {
    const pages = Taro.getCurrentPages();
    const pageLen = pages.length;
    const lastIndex = pageLen - 1;
    let index = lastIndex - offset;
  
    // 超出历史记录的个数, 则默认返回最初的第一页
    if (offset > lastIndex) {
      index = 0;
    }
  
    return pages[index];
  },

  /**
   * 获取完整路径 (path + query)
   *
   * @param {string} url 页面路径
   * @param {{ [key: string]: any; }} [query] 页面参数
   * @return {*}  {string}
   */
  getFullPath(url: string, query?: { [key: string]: any }): string {
    if (!url) {
      return '';
    }

    if (!query || JSON.stringify(query) === '{}') {
      return url;
    }

    const hasSearch = url.includes('?');
    const queries: string[] = [];
    Object.keys(query ?? {}).forEach((key) => {
      const value = query[key];
      value && queries.push(`${key}=${value}`);
    });

    const separator: '?' | '&' = hasSearch ? '&' : '?';
    return `${url}${separator}${queries.join('&')}`;
  },
};
