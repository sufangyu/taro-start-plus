import rule from './rule';

export type Name = keyof typeof rule;
export type Value = string | boolean | any[];


export interface RuleItem {
  /** 校验类型 */
  type: Name;
  /** 错误提示内容 */
  msg: string;
  /** 最小长度 */
  minLen?: number;
  /** 最大长度 */
  maxLen?: number;
  /** 自定义校验规则 */
  validator?: Function;
}

export interface Item extends RuleItem {
  /** 值 */
  value: Value;
}

