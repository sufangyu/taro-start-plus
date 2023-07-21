import Taro from '@tarojs/taro';

import mergeWith from 'lodash-es/mergeWith';

import interceptors from './interceptors';
import { RequestOptions, ResponsePromise } from './type';


// 请求默认配置
const defaults: RequestOptions = {
  server: 'base',
  url: '',
  data: {},
  headers: {
    'app-id': 'asd-nis-alsdkm',
  },
  method: 'GET',
  loading: true,
  loadingText: '加载中',
  isShowErrorToast: true,
};

/**
 * 请求函数
 *
 * @param {RequestOptions} options 请求配置参数
 * @returns {Promise<object>}
 */
function request<T>(options: RequestOptions): ResponsePromise<T> {
  const mergeOptions = mergeWith({}, defaults, options);
  interceptors.request(mergeOptions);

  return new Promise((resolve, reject) => {
    Taro
      .request(mergeOptions)
      .then((res) => {
        interceptors.response.resolve<T>(res, resolve, reject, mergeOptions);
      })
      .catch((error) => {
        interceptors.response.reject(error, reject, mergeOptions);
      });
  });
}

const http = {
  /**
   * GET 请求
   *
   * @template T
   * @param {RequestOptions} options
   * @returns {ResponsePromise<T>}
   */
  get<T=any>(options: RequestOptions): ResponsePromise<T> {
    return request<T>(options);
  },

  /**
   * POST 请求
   *
   * @template T
   * @param {RequestOptions} options
   * @returns {ResponsePromise<T>}
   */
  post<T=any>(options: RequestOptions): ResponsePromise<T> {
    return request(Object.assign({}, options, { method: 'POST' }));
  },

  /**
   * PUT 请求
   *
   * @template T
   * @param {RequestOptions} options
   * @returns {ResponsePromise<T>}
   */
  put<T=any>(options: RequestOptions): ResponsePromise<T> {
    return request(Object.assign({}, options, { method: 'PUT' }));
  },

  /**
   * DELETE 请求
   *
   * @template T
   * @param {Request} options
   * @returns {ResponsePromise<T>}
   */
  delete<T=any>(options: RequestOptions): ResponsePromise<T> {
    return request(Object.assign({}, options, { method: 'DELETE' }));
  },

  /**
   * BASE 基础请求
   *
   * @template T
   * @param {RequestOptions} options
   * @returns {ResponsePromise<T>}
   */
  base<T=any>(options: RequestOptions): ResponsePromise<T> {
    return request(options);
  },
};

export default http;
