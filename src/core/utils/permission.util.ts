import Taro from "@tarojs/taro";

/** 权限列表 */
const PERMISSIONS = {
  userInfo: {
    apiName: ['getUserInfo'],
    authTitle: '需要使用你的用户信息',
    authContent: '需要使用你的用户信息，请确认授权'
  },
  userLocation: {
    apiName: ['getLocation', 'chooseLocation'],
    authTitle: '请求授权当前位置',
    authContent: '需要获取您的地理位置，请确认授权'
  },
  address: {
    apiName: ['chooseAddress'],
    authTitle: '需要使用你的通讯地址',
    authContent: '需要使用你的通讯地址，请确认授权'
  },
  invoiceTitle: {
    apiName: ['chooseInvoiceTitle'],
    authTitle: '需要使用你的发票抬头',
    authContent: '需要使用你的发票抬头，请确认授权'
  },
  invoice: {
    apiName: ['chooseInvoice'],
    authTitle: '需要获取你的发票',
    authContent: '需要获取你的发票，请确认授权'
  },
  werun: {
    apiName: ['getWeRunData'],
    authTitle: '需要获取你的微信运动数据',
    authContent: '需要获取你的微信运动数据，请确认授权'
  },
  writePhotosAlbum: {
    apiName: ['saveImageToPhotosAlbum', 'saveVideoToPhotosAlbum'],
    authTitle: '请求授权相册',
    authContent: '需要使用你的相册，请确认授权'
  }
};


const permissionUtil = {
  getSetting(key: keyof typeof PERMISSIONS): Promise<{ isGranted: boolean }> {
    return new Promise(async (resolve) => {
      if (!PERMISSIONS[key]) {
        resolve({ isGranted: false });
      }

      const { authSetting } = await Taro.getSetting();
      if (authSetting[`scope.${key}`] === false) {
        // 用户拒绝过, 引导去授权页
        await _showModal(key);
        resolve({ isGranted: true });
      } else {
        // 已授权，或者还未授权
        resolve({ isGranted: true });
      }
    });
  }
}


/**
 * 引导去授权设置页弹窗
 *
 * @param {keyof typeof PERMISSIONS} key
 * @return {*}  {Promise<void>}
 */
const _showModal = (key: keyof typeof PERMISSIONS): Promise<void> => {
  return new Promise(async (resolve) => {
    const { confirm } = await Taro.showModal({
      title: PERMISSIONS[key].authTitle,
      content: PERMISSIONS[key].authContent
    });

    if (!confirm) {
      Taro.showToast({
        title: '已取消授权',
        icon: 'none'
      });
      return;
    }

    const { authSetting } = await Taro.openSetting();
    if (authSetting[`scope.${key}`]) {
      Taro.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 1000
      });
      resolve();
    } else {
      Taro.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 1000
      });
    }
  });
}

export {permissionUtil};