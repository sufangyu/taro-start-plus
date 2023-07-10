import Taro from '@tarojs/taro';

const updateUtil = {
  /**
   * 检查更新
   *
   * @param {boolean} [showCancel=false] 是否显示取消按钮, 用于是否强更. 默认 false
   * @return {*}  {void}
   */
  checkUpdate(showCancel: boolean = false): void {
    const canIUse = Taro.canIUse('getUpdateManager');
    if (!canIUse) {
      Taro.showModal({
        title: '提示',
        content: '当前APP版本过低，无法使用该功能，请升级到最新版本后重试。',
      });
      return;
    }

    const updateManager = Taro.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
      console.log('有新版本=>>', res.hasUpdate);
    });

    // 下载完成
    updateManager.onUpdateReady(async () => {
      const { confirm } = await Taro.showModal({
        title: '更新提示',
        content: '新版本已准备好，需要重启应用',
        showCancel,
      });

      if (confirm) {
        updateManager.applyUpdate();
      }
    });

    // 下载失败
    updateManager.onUpdateFailed((ev) => {
      console.warn('新版本下载失败=>>', ev);

      Taro.showToast({
        title: ev.errMsg ?? '新版本下载失败',
        icon: 'error',
      });
    });
  },
};

export { updateUtil };
