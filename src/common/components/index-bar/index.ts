import { componentUtil } from '@/core/utils';

import IndexBarRaw from './index-bar';
import IndexBarPanel from './panel';

const IndexBar = componentUtil.attachPropertiesToComponent(IndexBarRaw, {
  Panel: IndexBarPanel,
});

export {
  IndexBar,
  IndexBarPanel,
};
