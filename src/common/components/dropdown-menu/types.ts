export interface DropdownOption {
  /** 文字 */
  text: string;
  /** 标识符 */
  value: number | string;
  /** 左侧图标名称或图片链接 */
  icon?: string;
  /** 是否禁用菜单. 默认 false */
  disabled?: boolean; 
}


export interface DropdownItem {
  /** 当前选中项对应的 value */
  value: number | string | (number | string)[];
  /** 菜单项标题. 默认 当前选中项文字. 设置了后, 后续选择对应 option 后不在变更 */
  title?: string;
  /** 选项数组 */
  options: DropdownOption[];
  /** 是否多选. 默认 false */
  multiple?: boolean;
  /** 是否禁用菜单. 默认 false */
  disabled?: boolean; 
  /** 选项分栏（1-3). 默认 1 */
  optionsColumns?: 1|2|3;
}

export interface DropdownMenu {
  title?: string;
  actived?: boolean;
  disabled?: boolean; 
}
