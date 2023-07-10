/**
 * 校验规则
 */
const rule = {
  require({ value, msg }) {
    if (!value) {
      return msg;
    }
    return '';
  },
  minLength({ value, msg, minLen }) {
    if ((value as string).length < minLen) {
      return msg;
    }
    return '';
  },
  maxLength({ value, msg, maxLen }) {
    if ((value as string).length > maxLen) {
      return msg;
    }
    return '';
  },
  mobile({ value, msg }) {
    if (!/\d{11}/.test((value as string)) || !value.startsWith('1')) {
      return msg;
    }
    return '';
  },
  email({ value, msg }) {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!reg.test((value as string))) {
      return msg;
    }
    return '';
  },
  validator({ value, validator, msg }) {
    if (!validator(value)) {
      return msg;
    }
    return '';
  },
};

export default rule;
