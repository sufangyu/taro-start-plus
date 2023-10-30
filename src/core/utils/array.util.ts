export const arrayUtil = {
  /**
   * 数组打乱顺序
   *
   * @template T
   * @param {T[]} array 任意数组
   * @return {*}  {T[]} 打乱后的数组
   */
  shuffle<T>(array: T[]): T[] {
    const result = [...array];

    for (let i = result.length; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      // 位置对调
      [result[i - 1], result[j]] = [result[j], result[i - 1]];
    }

    return result;
  },
};
