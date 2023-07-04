import Taro from "@tarojs/taro";

const scanUtil = {
  /**
   * 扫描识别
   *
   * @param {boolean} [onlyFromCamera] 是否只能从相机扫码，不允许从相册选择图片
   * @return {*}  {Promise<Taro.scanCode.SuccessCallbackResult>}
   */
  scan(onlyFromCamera?: boolean): Promise<Taro.scanCode.SuccessCallbackResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Taro.scanCode({
          scanType: ['barCode', 'qrCode'],
          onlyFromCamera,
        });

        if (result.errMsg.includes('scanCode:ok')) {
          resolve(result);
        } else {
          reject(result);
        }
      } catch (error) {
        Taro.showToast({
          title: '识别失败',
          icon: 'error',
        });
        console.warn(error);
        // reject(error);
      }
    });
  },
};

export { scanUtil};