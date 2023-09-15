import { componentUtil } from '@/core/utils';

import SwipeCellAction from './action';
import SwipeCellRaw from './cell';


const SwipeCell = componentUtil.attachPropertiesToComponent(SwipeCellRaw, {
  Action: SwipeCellAction,
});

export type { SwipeCellActionOption, OpenedPosition } from './types';


export {
  SwipeCell,
  SwipeCellAction,
};
