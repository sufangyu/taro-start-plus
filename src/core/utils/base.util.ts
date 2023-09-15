export const baseUtil = {
  /**
   * 简单 uuid 生成
   *
   * @param {number} length 字符串长度, 最长是10. 默认 6
   * @return {*} 
   */
  uuid(length: number = 6): string {
    return Math.random().toString(36).slice(-length);
  },
};
