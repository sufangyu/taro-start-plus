import Taro from '@tarojs/taro';

import { useState } from 'react';

import { mapConfig } from '@/common/config';
import { permissionUtil } from '@/core/utils';

type Location = {
  longitude: number;
  latitude: number;
}

interface Regeocode {
  formatted_address: string;
  addressComponent: {
    country: string;
    province: string;
    city: string;
    district: string;
    township: string;
  };
}


/**
 * 地址信息 (转换、地址&经纬度获取)
 * 
 * 参考：https://blog.csdn.net/hanchengmei/article/details/126778117
 */
export default function useGeocoder() {
  const [getting, setGetting] = useState(false);
  
  /**
   * 获取地址的经纬度
   *
   * @param {string} address
   * @return {*}  {Promise<{location: string;}>} 经度，纬度
   */
  const getGeocoder = async (address: string): Promise<{
    location: Location;
  }> => {
    return new Promise(async (resolve, reject) => {
      const params = {
        key: mapConfig.amap.key,
        address,
      };
      const { statusCode, data } = await Taro.request({
        method: 'GET',
        url: 'https://restapi.amap.com/v3/geocode/geo',
        header: { 'content-type': 'application/json' },
        data: params,
      });
      
      if ((statusCode < 200 || statusCode >= 400) || data.status === '0') {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ status: data.status, info: data.info });
      }

      const { location } = (data?.geocodes ?? [])[0];
      const [longitude, latitude] = location ? (location as string).split(',') : [0, 0];

      resolve({
        location: {
          longitude: Number(longitude),
          latitude: Number(latitude),
        },
      });
    });
  };


  /**
   * 转换高德地图坐标
   *
   * @param {number} longitude 经度
   * @param {number} latitude 纬度
   * @return {*} 
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getConvertLocation = (longitude: number, latitude: number): Promise<Location> => {
    return new Promise(async (resolve, reject) => {
      const params = {
        key: mapConfig.amap.key,
        locations: `${longitude},${latitude}`,
        coordsys: 'gps',
      };

      const { statusCode, data } = await Taro.request({
        method: 'GET',
        url: 'https://restapi.amap.com/v3/assistant/coordinate/convert',
        header: { 'content-type': 'application/json' },
        data: params,
      });
      
      if ((statusCode < 200 || statusCode >= 400) || data.status === '0') {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ status: data.status, info: data.info });
      }

      const [lon, lat] = data?.locations ? (data?.locations as string).split(',') : [0, 0];

      resolve({
        longitude: Number(lon),
        latitude: Number(lat),
      });
    });
  };

  /**
   * 根据经纬度获取地址信息
   *
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   */
  const reverseGeocoder = (latitude: number, longitude: number): Promise<Regeocode> => {
    return new Promise(async (resolve, reject) => {
      const params = {
        key: mapConfig.amap.key,
        location: `${longitude},${latitude}`,
      };
      const { statusCode, errMsg, data } = await Taro.request({
        method: 'GET',
        url: 'https://restapi.amap.com/v3/geocode/regeo',
        header: { 'content-type': 'application/json' },
        data: params,
        complete() {
          Taro.hideLoading();
        },
      });
      if ((statusCode < 200 || statusCode >= 400) || data.status === '0') {
        console.error('status:', data.status, 'info:', data.info);
        const message = `获取地址信息失败（${data.info ?? errMsg}）`;
        Taro.showToast({
          title: message,
          icon: 'none',
        });
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ status: data.status, info: data.info });
      }

      resolve(data?.regeocode);
    });
  };


  /**
   * 地址逆解析
   *
   * @return {*} 
   */
  const getReverseGeocoder = async (): Promise<Regeocode | false> => {
    if (getting) {
      return false;
    }

    try {
      const { isGranted } = await permissionUtil.getSetting('userLocation');
      if (!isGranted) {
        return false;
      }


      Taro.showLoading({
        title: '正在定位',
      });

      setGetting(true);
      const { latitude, longitude } = await Taro.getLocation({
        type: 'gcj02', // wgs84
        isHighAccuracy: true,
      });
      console.log('getLocation=>>', `${longitude},${latitude}`);
      
      return reverseGeocoder(latitude, longitude);
    } catch (error) {
      console.warn('获取失败 =>>', error);
      Taro.showToast({
        title: '请打开手机定位并授权后重试',
        icon: 'none',
        mask: true,
      });
      return error;
    } finally {
      setGetting(false);
    }
  };


  return {
    getting,
    getReverseGeocoder,
    getGeocoder,
  };
}
