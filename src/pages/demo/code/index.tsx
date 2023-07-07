import { View, Text } from '@tarojs/components'
import { Barcode, QRCode } from 'taro-code'

import './index.scss'


export default function Index() {

  const barCode = 'ABC-abc-1234';
  const qrCode = 'https://www.baidu.com';

  return (
    <View className='container'>
      <View className='barcode'>
        <Barcode
          text={barCode}
          width={300}
          height={60}
          scale={4}
        />
        <View>{barCode}</View>
      </View>

      <View style={{height: 60,}}></View>
      
      <QRCode
        text={qrCode}
        size={300}
        scale={4}
        errorCorrectLevel='M'
        typeNumber={2}
        showMenuByLongpress
      />

    </View>
  )
}
