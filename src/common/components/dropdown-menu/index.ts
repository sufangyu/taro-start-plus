import { componentUtil } from '@/core/utils';

import DropdownMenuItem from './item';
import DropdownMenuRaw from './menu';

const DropdownMenu = componentUtil.attachPropertiesToComponent(DropdownMenuRaw, {
  Item: DropdownMenuItem,
});

export type { DropdownOption, DropdownItem } from './types';

export {
  DropdownMenu,
  DropdownMenuItem,
};
