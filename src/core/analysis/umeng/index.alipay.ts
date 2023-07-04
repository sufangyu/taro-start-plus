import um from 'umtrack-alipay';
import { umengConfig } from '@/common/config';

um.init({
  appKey: umengConfig.mpAliAppKey,
  useOpenid: false,
  autoGetOpenid: false,
  debug: true,
});

export default um;
