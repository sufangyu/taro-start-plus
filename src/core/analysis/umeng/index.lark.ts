import um from 'umtrack-tt';
import { umengConfig } from '@/common/config';

um.init({
  appKey: umengConfig.mpLarkAppKey,
  useOpenid: false,
  autoGetOpenid: false,
  debug: true,
});

// autoGetOpenid: false 时, 需要手动设置
// um.setAnonymousOpenId('anonymousOpenId');

export default um;
