/* eslint-disable no-use-before-define */
import { View, Button, Map } from '@tarojs/components';
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro';

import { useState } from 'react';

import { useGeocoder } from '@/core/hooks';

import './index.scss';

export default function Index() {
  const locationAddress = '广州市越秀区中山五路70号捷登都会';
  const [currentAddress, setCurrentAddress] = useState('');
  const [addressInfo, setAddressInfo] = useState({
    province: '', city: '', district: '', street: '',
  });
  
  const { getReverseGeocoder, getGeocoder } = useGeocoder();
  
  // 当前定位（经纬度）
  const [curLocation, setCurLocation] = useState({ longitude: 0, latitude: 0 });

  useDidShow(() => {
    console.log('useDidShow called');
    getCurrentAddress();
    getCurrentLocation();
  });

  usePullDownRefresh(() => {
    console.log('usePullDownRefresh called');
    getCurrentAddress();
    getCurrentLocation();
  });

  // 获取当前位置地址
  const getCurrentAddress = async () => {
    const { addressComponent, formatted_address: formattedAddress } = await getReverseGeocoder();
    setCurrentAddress(formattedAddress);
    setAddressInfo((prevState) => {
      return { ...prevState, ...addressComponent };
    });
  };

  // 获取当前位置经纬度
  const getCurrentLocation = async () => {
    const { location } = await getGeocoder(locationAddress);
    console.log('location=>>', location);
    setCurLocation((prevState) => {
      return { ...prevState, ...location };
    });
  };

  /**
   * 打开地图
   *
   */
  const openMap = () => {
    console.log('openMap curLocation', curLocation);
    Taro.openLocation({
      latitude: Number(curLocation.latitude),
      longitude: Number(curLocation.longitude),
      // name: '海珠湖',
      // address: locationAddress,
    });
  };

  return (
    <View className="container">
      <View>地址：{currentAddress}</View>
      <View>
        具体：
        {addressInfo.province},
        {addressInfo.city},
        {addressInfo.district},
        {addressInfo.district}
      </View>

      <View>
        <Button type="primary" size="mini" onClick={openMap}>打开地图(当前地址)</Button>
      </View>

      <View>
        <Map
          id="map-demo"
          show-location
          longitude={curLocation.longitude}
          latitude={curLocation.latitude}
          style={{ width: '100%', height: '280px' }}
          markers={
            [
              {
                id: Number(Date.now()),
                iconPath: '',
                alpha: 1, // 标注的透明度
                longitude: curLocation.longitude,
                latitude: curLocation.latitude,
                width: Taro.pxTransform(32),
                height: Taro.pxTransform(46),
                callout: {
                  content: locationAddress,
                  fontSize: 14,
                  color: '#ff0000',
                  bgColor: '#ffffff',
                  textAlign: 'center',
                  padding: 8,
                  display: 'ALWAYS',
                  borderRadius: 5,
                  borderWidth: 0,
                  borderColor: '#ffffff',
                  anchorX: 0,
                  anchorY: 0,
                },
              },
            ]
          }
        />
      </View>


    </View>
  );
}
