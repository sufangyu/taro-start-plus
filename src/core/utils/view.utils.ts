import Taro, { SelectorQuery } from '@tarojs/taro';

function delay(delayTime = 25): Promise<null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, delayTime);
  });
}

/**
 * 视图相关工具类. 如: DOM
 */
const viewUtil = {
  /**
   * 延迟获取选择器信息
   *
   * @param {string} selectorStr
   * @param {number} [delayTime=500]
   * @return {*}  {Promise<any[]>}
   */
  delayQuerySelector(selectorStr: string, delayTime: number = 500): Promise<any[]> {
    return new Promise(resolve => {
      const selector: SelectorQuery = Taro.createSelectorQuery();
      delay(delayTime).then(() => {
        selector
          .select(selectorStr)
          .boundingClientRect()
          .exec((res: any[]) => {
            resolve(res);
          });
      });
    });
  },
  /**
   * 延迟获取选择器集合
   *
   * @param {string} selectorStr
   * @param {number} [delayTime=500]
   * @return {*}  {Promise<any[]>}
   */
  delayQuerySelectorAll(selectorStr: string, delayTime: number = 500): Promise<any[]> {
    return new Promise(resolve => {
      const selector: SelectorQuery = Taro.createSelectorQuery();
      delay(delayTime).then(() => {
        selector
          .selectAll(selectorStr)
          .boundingClientRect()
          .exec((res: any[]) => {
            resolve(res);
          });
      });
    });
  },
};

export { viewUtil };
