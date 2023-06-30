/** 状态枚举类型 */
export enum StatusEnum {
  /** 禁用 */
  FORBIDDEN = 0,
  /** 正常 */
  NORMAL = 1
}

/** 状态描素 */
export const StatusMessage = {
  0: '禁用',
  1: '正常'
}

/** 状态下一个动作描述 */
export const StatusNextMessage = {
  0: '启用',
  1: '停用'
}

/** 状态类型 */
export type StatusType = keyof typeof StatusMessage
