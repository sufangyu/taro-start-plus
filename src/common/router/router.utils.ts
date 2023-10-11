import { SubPackage } from '@tarojs/taro';

import { appRouterConfig } from './models';
import { RouterConfig } from './types';


// 主包页面列表, 数组第一项代表小程序初始页面
const pages: string[] = [];

// 子包页面列表
const subPackageConfig: Record<string, string[]> = Object.create(null);
const subPackages: SubPackage[] = [];


/**
 * 获取页面列表配置
 *
 * @param {Record<string, any>} pathMap
 */
function getPages(pathMap: Record<string, any>) {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in pathMap) {
    const currentRouter = pathMap[key] as RouterConfig;
    // console.log('key::', key, 'currentRouter::', currentRouter);
    if (typeof currentRouter !== 'object') {
      return;
    }

    const { path } = currentRouter;
    const isSubPackage = currentRouter.isSubPackage ?? false;

    if (isSubPackage) {
      const root = `${path.split('/')[1]}/`;
      const subPagePath = `${path.replace(`/${root}`, '')}`;

      if (!subPackageConfig[root]) {
        subPackageConfig[root] = [];
      }
      subPackageConfig[root].push(subPagePath);
    } else if (path) {
      // 处理前面的 /, 路由配置是不需要
      const pagePath = path.substring(1);
      pages.push(pagePath);
    } else {
      // 深层次的路由配置, 递归处理
      getPages(currentRouter);
    }
  }
}


/**
 * 获取子包的配置
 *
 * @param {Record<string, string[]>} config
 */
function getSubPackages(config: Record<string, string[]>) {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in config) {
    const subPackage = {
      root: key.substring(0, key.length - 1),
      pages: config[key],
    };
    subPackages.push(subPackage);
  }
}


getPages(appRouterConfig);
getSubPackages(subPackageConfig);

export { pages, subPackages };
