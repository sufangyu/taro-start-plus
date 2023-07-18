import { View } from '@tarojs/components';

import './index.scss';

interface Props {
  /** 标识 */
  code: string;
  /** 描述 */
  name: string;
  /**
   * 列表数据
   *
   * @type {{name: string}[]}
   * @memberof Props
   */
  list: {name: string}[];
}

const IndexBarPanel = (props: Props) => {
  const { code, name, list } = props;

  return (
    <View className="index-bar__list" id={`index-bar-list-${code}`}>
      <View className="index-bar__anchor">{name}</View>
      {
        (list ?? []).map((it, idx) => {
          return (
            <View className="index-bar__cell" key={`${name}-it-${idx}`}>
              {it.name}
            </View>
          );
        })
      }
    </View>
  );
};

export default IndexBarPanel;
