import { componentUtil } from '@/core/utils';

import GridRaw from './grid';
import GridItem from './grid-item';

const Grid = componentUtil.attachPropertiesToComponent(GridRaw, {
  Item: GridItem,
});

export {
  Grid,
  GridItem,
};
