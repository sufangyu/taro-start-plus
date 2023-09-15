export const componentUtil = {
  /**
   * 给组件添加属性子组件
   * 
   * ```ts
   * // 使用
   * import { componentUtil } from '@/core/utils';
   * 
   * import GridRaw from './grid';
   * import GridItem from './grid-item';
   *
   * const Grid = componentUtil.attachPropertiesToComponent(GridRaw, {
   *   Item: GridItem,
   * });
   *
   * export {
   *   Grid,
   *   GridItem,
   * };
   * 
   * // 组件使用
   * <Grid>
   *    <Grid.Item></Grid.Item>
   *    <Grid.Item></Grid.Item>
   * </Grid>
   * ```
   * @param component 组件最外层容器
   * @param properties 子组件
   * @returns 返回新组件
   */
  attachPropertiesToComponent<C, P extends Record<string, any>>(
    component: C,
    properties: P,
  ): C & P {
    const ret = component as any;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in properties) {
      if ({}.propertyIsEnumerable.call(properties, key)) {
        ret[key] = properties[key];
      }
    }
    return ret;
  },
};
