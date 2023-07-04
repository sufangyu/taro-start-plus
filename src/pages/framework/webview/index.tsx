import { BaseEventOrig, View, WebView, WebViewProps } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro';

import './index.scss'

interface ErrorDetail {
  errMsg: string;
  url: string;
}


export default function Index() {
  const { params } = useRouter();
  const url = params.url ? decodeURIComponent(params.url) : '';

  useLoad(() => {
    Taro.setNavigationBarTitle({
      title: params.title ? decodeURIComponent(params.title) : '',
    });
  });

  const onLoad = (ev: BaseEventOrig<WebViewProps.onLoadEventDetail>) => {
    console.log('onLoad=>>', ev.detail);
  };

  const onError = (ev: BaseEventOrig<WebViewProps.onErrorEventDetail>) => {
    console.log('onError=>>', ev.detail);
    let errMsg = (ev.detail as unknown as ErrorDetail).errMsg;

    if (errMsg.includes('not in domain list')){
      errMsg = `加载失败, ${(ev.detail as unknown as ErrorDetail).url}不在业务域名配置列表中`
    }

    Taro.showToast({
      title: errMsg,
      icon: 'none',
    })
  };

  const onMessage = (ev: BaseEventOrig<WebViewProps.onMessageEventDetail>) => {
    console.log('onMessage=>>', ev.detail);
  };


  return (
    <View className='container-webview'>
      <WebView
        src={url}
        onLoad={onLoad}
        onError={onError}
        onMessage={onMessage}
      />
    </View>
  )
}
