import { componentUtil } from '@/core/utils';

import PopoverAction from './action';
import PopoverRaw from './popover';

const Popover = componentUtil.attachPropertiesToComponent(PopoverRaw, {
  Action: PopoverAction,
});

export type { PopoverPlacement, PopoverActionItem } from './types';

export {
  Popover,
  PopoverAction,
};


