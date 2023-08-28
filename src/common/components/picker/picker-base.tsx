/* eslint-disable no-case-declarations */
import {
  PickerView, PickerViewColumn, View, Text,
  type PickerViewProps, type BaseEventOrig, 
} from '@tarojs/components';
import Taro from '@tarojs/taro';


import {
  ReactNode, useEffect, useRef, useState, 
} from 'react';

import { Popup } from '../popup';

import {
  CascadePickerOption,
  ColumnValues, PickerBaseProps, PickerColumn, PickerColumnItem, PickerDefault, 
} from './types';
import './index.scss';
import { getFirstDiffIndex, getFlatTree } from './utils';


const Index = (props: PickerBaseProps) => {
  const {
    children,
    mode = 'normal',
    defaultValues = [],
    columns = [],
    options = [],
    titleText,
    confirmText = '确定',
    onConfirm,
    cancelText = '取消',
    onCancel,
    closeOnOverlayClick,
    height,
    indicatorStyle,
  } = props;

  const [visible, setVisible] = useState(false);

  // 滚动是否结束
  const isScrollEnd = useRef(true);
  // 列数据
  const [columnsData, setColumnsData] = useState<PickerColumn[]>([]);
  // 当前各个 colum 选择索引
  const [indexValues, setIndexValues] = useState<ColumnValues>([]);
  // 上次各个 colum 选择索引
  const lastIndexValues = useRef<ColumnValues>([]);

  /**
   * 获取 Picker Columns 数据
   *
   * @param {CascadePickerOption[]} [option=[]]
   * @param {PickerDefault} [selected=[]] 每列选择的序号
   * @return {*}  {PickerColumn[]}
   */
  const getColumnsData = (
    option: (CascadePickerOption)[],
    selected: number[] = [],
  ): PickerColumn[] => {
    const diffIndex = getFirstDiffIndex(selected, lastIndexValues.current);
    // 当前第一列开始遍历
    let curColumnIdx = 0;
    const result: PickerColumn[] = columnsData ?? [];

    function getColumn(opts: CascadePickerOption[]) {
      if (!opts) {
        return;
      }

      const selectedItemIndex = selected[curColumnIdx] ?? 0;
      // console.log(`第${curColumnIdx + 1}列，选择项序号${selectedItemIndex}`, opts);

      if (!result[curColumnIdx]) {
        result[curColumnIdx] = [];
      }

      for (let i = 0; i < opts.length; i += 1) {
        const optionItem = opts[i];

        if (curColumnIdx >= diffIndex) {
          if (columnsData.length > 0) {
            // 第一次重置当前列表为空后再 push 新数据
            i === 0 && (result[curColumnIdx] = []);

            // 重置 diffIndex 后续的选择项都默认为第一项
            const newSelectedIndexs = selected.map((it, idx) => (idx > diffIndex ? 0 : it));
            setIndexValues(newSelectedIndexs);
          }

          const it = {
            label: optionItem.label,
            value: optionItem.value,
          };
          // console.log(`push ${optionItem.label} => 第${curColumnIdx + 1}列`, optionItem, i);
          result[curColumnIdx].push(it);
        }

        // 选择项 & 有下一级, 继续递归循环
        if (selectedItemIndex === i && (optionItem.children ?? []).length > 0) {
          curColumnIdx += 1;
          getColumn(optionItem.children!);
        }
      }

      // 本轮循环结束, 重新设置上一列再递归循环
      curColumnIdx -= 1;
    }

    getColumn(option);
    return JSON.parse(JSON.stringify(result));
  };

  /**
   * 获取选择项目的数字序号
   *
   * @param {PickerDefault} values
   * @return {*}  {number[]}
   */
  const getDefaultValuesFormatNumber = (values: PickerDefault): number[] => {
    if (values.length === 0) {
      return [];
    }

    if (typeof values[0] === 'number') {
      return (values as number[]).map(it => it);
    }

    const flatTreeResult = getFlatTree(options);
    const indexResult = values.map((item: PickerColumnItem) => {
      const itemInfo = flatTreeResult.find(it => it.value === item.value);
      return itemInfo?.index ?? 0;
    });
    return indexResult;
  };

  const initData = () => {
    switch (mode) {
      case 'normal':
        const result: PickerColumn[] = [];
        columns.forEach((column) => {
          result.push(column);
        });
        setColumnsData(result);

        // 初始化默认值
        const initIndexValues = defaultValues.length === 0
          ? result.map(() => 0)
          : defaultValues.map((columnItem, idx) => {
            if (typeof columnItem === 'number') {
              return columnItem;
            }

            const selectedIndex = result[idx].findIndex((it: PickerColumnItem) => {
              return it.value === columnItem.value;
            });
            return Math.max(selectedIndex, 0);
          });
        setIndexValues([...initIndexValues]);
        break;
      case 'cascade':
        const defaultValuesFormatNumber = getDefaultValuesFormatNumber(defaultValues);
        const columnsDataResult = getColumnsData(options, defaultValuesFormatNumber);
        setColumnsData(columnsDataResult);

        const initIndexValuesCascade = defaultValues.length > 0
          ? defaultValuesFormatNumber
          : columnsDataResult.map(() => 0);
        setIndexValues(initIndexValuesCascade as number[]);
        lastIndexValues.current = initIndexValuesCascade as number[];
        break;
      default:
    }
  };

  
  useEffect(() => {
    initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  /**
   * 获取返回值
   * @param values 
   */
  const getCallbackResultByIndex = (values: ColumnValues = []): PickerColumn[] => {
    let result: PickerColumn[];
    if (values.length > 0) {
      result = columnsData.reduce((prev, current, columnIdx) => {
        const curColumnSelectIndex = values[columnIdx];
        return prev.concat(current[curColumnSelectIndex]);
      }, []) as unknown as PickerColumn[];
    } else {
      // 未选择时, 返回每一列第一项
      const columnValue = columnsData.map((column) => column[0]);
      result = columnValue as unknown as PickerColumn[];
    }

    return result;
  };

  const handleChange = (ev: BaseEventOrig<PickerViewProps.onChangeEventDetail>) => {
    const { value } = ev.detail;
    switch (mode) {
      case 'normal':
        setIndexValues(value);
        break;
      case 'cascade':
        setIndexValues(value);
        const columnsDataResult = getColumnsData(options, value);
        setColumnsData(columnsDataResult);
        lastIndexValues.current = value;
        break;
      default:
    }
  };

  const handleCancle = (): void => {
    setVisible(false);

    typeof onCancel === 'function' && onCancel();
  };

  const handleConfirm = (): void => {
    if (!isScrollEnd.current) {
      return;
    }

    const callbackResult = getCallbackResultByIndex(indexValues);
    setVisible(false);

    typeof onConfirm === 'function' && onConfirm({
      choosedIndexValues: indexValues ?? [],
      choosedResult: callbackResult ?? [],
    });
  };


  const renderHeader = (): ReactNode => {
    return (
      <View className="picker__header">
        <View className="picker__cancel" onClick={handleCancle}>
          <Text>{ cancelText }</Text>
        </View>
        {titleText && <View className="picker__title">{ titleText }</View>}
        <View className="picker__confirm" onClick={handleConfirm}>
          <Text>{ confirmText }</Text>
        </View>
      </View>
    );
  };

  console.log('columnsData =>>', columnsData);


  return (
    <>
      <View onClick={() => setVisible(true)}>{children}</View>
      <Popup
        visible={visible}
        position="bottom"
        closeOnOverlayClick={closeOnOverlayClick}
        round
        simple
        onClosed={() => setVisible(false)}
      >
        <View
          className="picker"
          style={{
            height: height && Taro.pxTransform(height),
          }}
        >
          {renderHeader()}
          <PickerView
            className="picker__content"
            indicatorStyle={indicatorStyle}
            value={indexValues}
            onPickStart={() => isScrollEnd.current === false}
            onPickEnd={() => isScrollEnd.current === true}
            onChange={handleChange}
          >
            {
            columnsData.map((column, columnIdx) => {
              return (
                <PickerViewColumn className="picker__column" key={`column-${columnIdx}`}>
                  {
                    column.map((item, itemIdx) => {
                      return (
                        <View className="picker__item" key={`column-${columnIdx}item-${itemIdx}`}>
                          <Text>
                            {
                              typeof item === 'string' 
                                ? item
                                : (item as PickerColumnItem).label
                            }
                          </Text>
                        </View>
                      );
                    })
                  }
                </PickerViewColumn>
              );
            })
          }
          </PickerView>
        </View>
      </Popup>
    </>
  );
};

export default Index;
