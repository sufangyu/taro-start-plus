import um from 'umtrack-wx';
import { umengConfig } from '@/common/config';

um.init({
  appKey: umengConfig.mpWXAppKey,
  useOpenid: false,
  autoGetOpenid: false,
  debug: true,
});

export default um;
