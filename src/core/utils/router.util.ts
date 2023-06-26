import Taro from "@tarojs/taro";

import { TAB_BAR_ROUTER_PATH} from "@/common/router";

// 跳转的方式
const MODE_MAP: {push: string, replace: string} = {
  push: 'navigateTo',
  replace: 'redirectTo',
};


export const routeUtil = {
  /**
   * 跳转页面
   */
  toPage(options:PageOptions):void {
    const { url, mode = 'push', query } = options;
    const fullPath = this.getFullPath(url, query);

    // 是否 tabBar 页面
    const isTabBar = TAB_BAR_ROUTER_PATH.includes(url.replace('/', ''));
    let toAction: string;

    if (isTabBar) {
      toAction = 'switchTab';
    } else {
      toAction = MODE_MAP[mode];
    }


    Taro[toAction]({
      url: fullPath
    }).catch((error: { errMsg: string; } | undefined) => {
      routeErrorToast(error);
    });
  },


  /**
   * 返回之前页面
   * @param delta 页面 History 列表中的相对位置
   */
  back(delta: number = 1):void {
    const pages = Taro.getCurrentPages();
    if (pages.length <= 1) {
      console.warn('当前已是第一页');
      return;
    }
    Taro.navigateBack({ delta });
  },

  reLaunch(options:PageOptions):void {
    const { url } = Object.assign({}, {
      url: '',
      query: {},
    }, options);
  
    Taro.reLaunch({
      url,
    }).catch((error: { errMsg: string; } | undefined) => {
      routeErrorToast(error);
    });
  },

  /**
   * 获取页面信息
   * @param offset 偏移量
   * @returns 
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
   * @param url
   * @param query
   */
  getFullPath(url: string , query: { [key: string]: any; }): string {
    if (!url) {
      return '';
    }

    if (!query || JSON.stringify(query) === '{}') {
      return url;
    }

    const hasSearch = url.includes('?');
    const queries: string[] = [];
    Object.keys(query??{}).forEach((key) => {
      const value = query[key];
      queries.push(`${key}=${value}`);
    });

    const separator: "?" | "&" = hasSearch ? '&' : '?';
    return`${url}${separator}${queries.join('&')}`;
  },
};


/**
 * 显示 错误信息
 * @param error 
 */
const routeErrorToast = (error = { errMsg: '' }): void=> {
  const { errMsg } = error;
  Taro.showToast({
    title: errMsg,
    icon: 'none',
  });
}



interface PageOptions {
  /** 页面路径 */
  url: string;
  /** 查询参数  RootQuery */
  query? : object;
  /** 页面跳转方式 */
  mode? : 'push' | 'replace';
}


