import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';

import React from 'react';
import ReactDom from 'react-dom';

// eslint-disable-next-line import/extensions
import addLifecycleHook from '@/core/hooks/add-lifecycle.hooks';

import './indes.scss';

const resolveSet = new Set<(e: { event: string; buttonId: string }) => void>();
const onCloseSet = new Set<() => void>();
const nonMandatoryPages = new Set(['pages/framework/webview/index']);

type PrivacyProps = {
  onDisagree: () => any;
  onAgree: () => any;
  privacyContractName: string;
}

// 隐私协议组件Demo
const Privacy: React.FC<PrivacyProps> = ({ onAgree, onDisagree, privacyContractName }) => {
  const openPrivacyContract = () => {
    Taro.openPrivacyContract();
  };

  return (
    <View
      catchMove
      className="privacy"
      style={{ 
        
      }}
    >
      <View className="privacy__content">
        <View className="privacy__title">温馨提示</View>
        <View>
          您在使用本小程序相关服务前，请您务必阅读、充分理解
          <Text onClick={openPrivacyContract}>{privacyContractName}</Text>
          中相关条款内容。当您确认点击“同意”按钮，即表示您已充分理解并同意该条款。如您拒绝，将无法正常使用小程序。
        </View>

        <View className="privacy__button-group">
          <Button onClick={onDisagree}>
            拒绝
          </Button>
          <Button
            type="primary"
            id="agree"
            openType="agreePrivacyAuthorization"
            onAgreePrivacyAuthorization={onAgree}
          >
            同意
          </Button>
        </View>
      </View>
    </View>
  );
};

export const popUpPrivacy = (rootId: string, privacyContractName: string) => {
  const portalId = `PrivacyId_${rootId}`;
  const root = document.getElementById(rootId);
  let portal = document.getElementById(portalId);

  if (!portal) {
    portal = document.createElement('view');
    portal.id = portalId;
  }

  if (root && portal) {
    root.appendChild(portal);

    const onClose = () => ReactDom.unmountComponentAtNode(portal!);

    const onAgree = () => {
      onCloseSet.forEach(close => close());

      resolveSet.forEach(resolve => {
        resolve({
          event: 'agree',
          buttonId: 'agree',
        });
      });
    };

    onCloseSet.add(onClose);

    ReactDom.render(
      <Privacy
        privacyContractName={privacyContractName}
        onAgree={onAgree}
        onDisagree={Taro.exitMiniProgram}
      />,
      portal,
    );
  }
};

if (process.env.TARO_ENV === 'weapp') {
  addLifecycleHook('appHooks', 'onLaunch', () => {
    Taro.onNeedPrivacyAuthorization?.(resolve => {
      resolveSet.add(resolve);
    });
  });

  addLifecycleHook('pageHooks', 'onReady', () => {
    Taro.getPrivacySetting?.({
      success: (ev) => {
        const { privacyContractName } = ev;
        const pages = Taro.getCurrentPages();
        const currentPage = pages[pages.length - 1];
        console.log('currentPage.route =>>', currentPage.route);
        if (
          ev.needAuthorization
          // 忽略不弹隐私协议, 也可以根据实际情况改为指定页面集合才弹
          && !nonMandatoryPages.has(currentPage.route!)
        ) {
          try {
            popUpPrivacy(currentPage.$taroPath, privacyContractName);
          } catch (err) {
            console.error(err);
          }
        }
      },
    });
  });
}

