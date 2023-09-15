import { componentUtil } from '@/core/utils';

import Tab from './tab';
import TabsRaw from './tabs';

const Tabs = componentUtil.attachPropertiesToComponent(TabsRaw, {
  Item: Tab,
});

export {
  Tabs,
  Tab,
};
