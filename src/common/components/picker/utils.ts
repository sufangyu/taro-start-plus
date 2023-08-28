import { CascadePickerOption, CityItem } from './types';


type CompareItem = number | string | boolean;

/**
 * 获取两个数组第一个不同值的序号
 *
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {*}  {number}
 */
export const getFirstDiffIndex = (arr1: CompareItem[], arr2: CompareItem[]): number => {
  // 长度不同
  const arr1Len = arr1.length;
  const arr2Len = arr2.length;
  if (arr1Len !== arr2Len) {
    return Math.min(arr1Len, arr2Len);
  }

  // 长度一样
  let diffIndex = -1;
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      diffIndex = i;
      break;
    }
  }
  return diffIndex;
};


interface FlatTreeOption extends CascadePickerOption {
  /**
   * 父级的列序号
   */
  parentColumnIndex: number;
  /** 当前所列的序号 */
  index: number;
}

/**
 * 扁平化树结构为数组
 *
 * @param {CascadePickerOption[]} tree
 * @return {*}  {FlatTreeOption[]}
 */
export const getFlatTree = (tree: (CascadePickerOption | CityItem)[]): FlatTreeOption[] => {
  const flatTreeResult: FlatTreeOption[] = [];
  let parentIndex = 0;
    
  function flatTree(data: CascadePickerOption[]) {
    data.forEach((treeItem, treeIndex) => {
      const flatItem:FlatTreeOption = {
        ...treeItem,
        parentColumnIndex: parentIndex - 1,
        index: treeIndex,
      };
      flatTreeResult.push(flatItem);
        
      if ((treeItem.children ?? []).length > 0) {
        parentIndex += 1;
        flatTree(treeItem.children!);
      }
    });

    parentIndex -= 1;
  }

  flatTree(tree);
  return flatTreeResult;
};
