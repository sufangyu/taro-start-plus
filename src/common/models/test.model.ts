/* eslint-disable import/extensions */
import { Pagination } from './base.model';

/**
 * 列表项
 *
 * @export
 * @interface List
 */
export interface List {
  /** ID */
  id: number;
  /** 标题 */
  title: string;
  /** 创建时间 */
  createdAt: string;
}


export interface ListQuery extends Partial<Pagination> {
  name?: string;
}
