import {
  View, Image, Text, Button, 
} from '@tarojs/components';
import icScan from '@/assets/images/icons/ic-scan.svg';
import { routeUtil, scanUtil } from '@/core/utils';


import './index.scss';

export default function Index() {
  const handleScan = async () => {
    const { result } = await scanUtil.scan();
    console.log('识别结果=>>', result);

    if (result && result.startsWith('https')) {
      routeUtil.toWebviewPage(result, '识别结果', 'replace');
    }
  };

  return (
    <View className="container">
      <Button type="primary" onClick={handleScan}>
        <Image src={icScan} />
        <Text>扫一扫</Text>
      </Button>
    </View>
  );
}
