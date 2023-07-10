export interface Props {
  /**
   * 添加在组件内部结构的 class，可用于修改组件内部的样式.
   */
  extClass?: string;

  /**
   * 导航标题，如果不提供，则名为 renderCenter 的 slot 有效
   */
  title?: string;

  /**
   * 导航背景色. 默认 #ffffff
   */
  background?: string;

  /**
   * 导航下拉背景色,默认取 background 的颜色,不理解见 issue 问题
   */
  backgroundColorTop?: string;

  /**
   * 导航字体颜色. 默认 #000000
   */
  color?: string;
  
  /**
   * 主题图标和字体颜色,当背景色为深色时,可以设置'white'
   */
  iconTheme?: 'black' | 'white';

  /** 
   * 是否显示返回按钮，默认点击按钮会执行 navigateBack，如果为 false，则名为 renderLeft 的 slot 有效
   */
  back?: boolean;

  /**
   * 是否显示 home 按钮，执行方法自定义,或者看例子
   */
  home?: boolean;

  /**
   * 是否显示搜索框，默认点击按钮会执行 onSearch，如果为 false，则名为 renderCenter 的 slot 有效
   */
  searchBar?: boolean;

  /**
   * 搜索框文字
   */
  searchText?: string;

  /**
   * 左侧 slot，在 back 按钮位置显示，当 back 为 false 的时候有效
   */
  renderLeft?: JSX.Element;

  /**
   * 标题 slot，在标题位置显示，当 searchBar 为 false title 为空的时候有效
   */
  renderCenter?: JSX.Element;
  /**
   * 在导航的右侧显示
   */
  renderRight?: JSX.Element;

  /** 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 */
  delta?: number;

  /**
   * 在 home 为 true 时，点击 home 按钮触发此事件
   */
  onHome?: () => void; 

  /**
   * 在 back 为 true 时，点击 back 按钮触发此事件，detail 包含 delta
   */
  onBack?: () => void;

  /** 
   * 在 searchBar 为 true 时，点击 search 按钮触发此事件
   */
  onSearch?: (keywork: string) => void;
}

export interface ConfigStyle {
  navigationbarinnerStyle: string;
  navBarLeft: string;
  navBarHeight?: number;
  capsulePosition?: {
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  navBarExtendHeight?: number;
  ios?: boolean;
  rightDistance: number;
}
