import Taro from '@tarojs/taro';

export const storageUtil = {
  /**
   * 设置缓存
   * @param key
   * @param data
   */
  set(key: string, data:any):void {
    Taro.setStorage({ key, data });
  },

  /**
   * 设置缓存 (同步版)
   * @param key
   * @param data
   */
  setAsync(key: string, data:any):void {
    Taro.setStorageSync(key, data);
  },

  /**
   * 获取缓存（TODO:）
   * @param key
   * @param success
   */
  get(key: string, success: (res:any)=>{}) {
    Taro.getStorage({
      key,
      success,
    });
  },

  /**
   * 获取缓存（同步版）
   * @param key
   */
  getAsync<T = any>(key: string): T {
    return Taro.getStorageSync(key);
  },

  /**
   * 删除指定缓存
   * @param key
   */
  remove(key:string):void {
    Taro.removeStorage({ key });
  },

  /**
   * 删除指定缓存（同步版）
   * @param key
   */
  removeAsync(key):void {
    Taro.removeStorageSync(key);
  },

  /**
   * 清除全部缓存
   */
  clear() {
    Taro.clearStorage();
  },

  /**
   * 清除全部缓存（同步版）
   */
  clearSync() {
    Taro.clearStorageSync();
  },

};
