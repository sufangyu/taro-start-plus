import { List, ListQuery } from '@/common/models';
import http from '@/core/http';


/**
 * 获取 列表
 *
 * @export
 * @param {ListQuery} [params]
 * @return {*} 
 */
export function getList(params?: ListQuery) {
  return http.get<{list: List[]}>({
    url: 'http://10.25.5.151:3721/api/list',
    data: params,
  });
}


/**
 * POST 请求
 *
 */
export function postApi() {
  return http.post({
    url: 'http://localhost:3721/api/post',
    headers: {
      'x-custom': 'x-custom-header',
    },
    data: {
      name: '张三疯',
    },
    loadingText: '正在提交',
  });
}


/**
 * PUT 请求
 *
 */
export function putApi() {
  return http.put({
    url: 'http://localhost:3721/api/put',
    headers: {
      'x-custom': 'x-custom-header-??',
    },
    data: {
      name: '李四',
    },
    loadingText: '正在提交',
  });
}


/**
 * DELETE 请求
 *
 */
export function deleteApi() {
  return http.delete({
    url: 'http://localhost:3721/api/delete/100',
    loadingText: '正在删除',
  });
}


export function requestEnv() {
  return http.get({
    url: '/api/get',
    server: 'open',
  });
}
