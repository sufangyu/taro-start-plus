import rule from './rule';
import {
  RuleItem, Item, Name, Value, 
} from './types';


/**
 * 校验
 * 
 * ``` ts
 * const validator = new Validation();
 * validator.add(name, 'require', '账号不能为空');
 * validator.add(password, [
 *   { type: 'require', msg: '请输入密码' },
 *   { type: 'minLength', minLen: 6, msg: '密码长度不符合要求', },
 * ]);
 * ```
 */
class Validation {
  /**
   * 校验列表
   *
   * @private
   * @type {Item[]}
   * @memberof Validation
   */
  private list: Item[] = [];


  /**
   * 添加规则
   * 
   * @param {Value} value 值
   * @param {Name} type 校验类型
   * @param {string} [msg] 错误信息
   * @memberof Validation
   * 
   * ``` ts
   * validator.add(name, 'require', '账号不能为空');
   * ```
   */
  add(value: Value, type: Name, msg: string): void;

  /**
   * 批量添加规则
   * 
   * @param {Value} value 值
   * @param {RuleItem[]} rules 校验规则列表
   * @param {string} [msg] 错误信息
   * @memberof Validation
   * 
   * ``` ts
   * validator.add(password, [
   *   { type: 'require', msg: '请输入密码' },
   *   { type: 'minLength', minLen: 6, msg: '密码长度不符合要求', },
   * ]);
   * ```
   */
  add(value: Value, rules: RuleItem[]): void;

  public add(value: Value, rules: Name | RuleItem[], msg?: string) {
    if (Array.isArray(rules)) {
      // 多个校验规则
      const validatorList = rules.map((item) => {
        return {
          value,
          type: item.type,
          msg: item.msg,
          minLen: item.minLen,
          maxLen: item.maxLen,
          validator: item.validator,
        };
      });

      this.list.push(...validatorList);
    } else {
      // 指定校验规则
      this.list.push({
        value,
        type: rules,
        msg: msg ?? '',
      });
    }
    // console.log('list=>>', this.list);
  }

  /**
   * 开始校验
   *
   * @return {*}  {string}
   * @memberof Validation
   */
  public run(): string {
    for (let i = 0; i < this.list.length; i += 1) {
      const {
        value, type, msg, minLen, maxLen, validator,
      } = this.list[i];

      const result = rule[type]({
        value,
        msg,
        minLen,
        maxLen,
        validator,
      });

      if (result) {
        return result;
      }
    }

    return '';
  }
}

export { Validation };
