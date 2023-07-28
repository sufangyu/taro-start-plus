import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import { DropdownMenu, DropdownMenuItem, type DropdownOption } from '@/common/components';

import './index.scss';

export default function Index() {
  const [queryOptions, setQueryOptions] = useState({
    option1: 0,
    option2: 'a',
  });

  const [queryOptionsMulti, setQueryOptionsMulti] = useState({
    option1: [0, 1],
    option2: ['a', 'b'],
    option3: ['a', 'b', 'd'],
  });
  

  return (
    <View className="container">
      <View className="demo-title">基本用法</View>
      <View
        className="demo-content"
        style={{
          marginLeft: -32,
          marginRight: -32,
        }}
      >
        <DropdownMenu
          onChange={(index, option: DropdownOption) => {
            setQueryOptions(() => {
              const key = ['option1', 'option2'];
              const state = Object.assign({}, queryOptions, {
                [key[index]]: option.value,
              });
              return state;
            });
          }}
        >
          <DropdownMenuItem
            value={queryOptions.option1}
            // title="商品类型"
            options={[
              { text: '全部商品', value: 0 },
              { text: '新款商品', value: 1 },
              { text: '活动商品', value: 2 },
            ]}
          />
          <DropdownMenuItem
            value={queryOptions.option2}
            options={[
              { text: '默认排序', value: 'a' },
              { text: '好评排序', value: 'b' },
              { text: '销量排序', value: 'c' },
              { text: '销量排序', value: 'd', disabled: true },
            ]}
          />
        </DropdownMenu>
      </View>

      <View className="demo-title">多选下拉菜单</View>
      <View
        className="demo-content"
        style={{
          marginLeft: -32,
          marginRight: -32,
        }}
      >
        <DropdownMenu
          onChange={(index, options: DropdownOption[]) => {
            setQueryOptionsMulti(() => {
              const key = ['option1', 'option2', 'option3'];
              const state = Object.assign({}, queryOptionsMulti, {
                [key[index]]: options.map(it => it.value),
              });
              return state;
            });

            Taro.nextTick(() => {
              console.log(queryOptionsMulti);
            });
          }}
        >
          <DropdownMenuItem
            value={queryOptionsMulti.option1}
            multiple
            optionsColumns={1}
            title="单列多选"
            options={[
              { text: '选项一', value: 0 },
              { text: '选项二', value: 1 },
              { text: '选项三', value: 2 },
              { text: '选项四', value: 3 },
              { text: '选项五', value: 4 },
              // { text: '选项六', value: 5 },
              // { text: '选项七', value: 6 },
              // { text: '选项八', value: 7 },
              { text: '禁用选项', value: 8, disabled: true },
            ]}
          />
          <DropdownMenuItem
            value={queryOptionsMulti.option2}
            multiple
            optionsColumns={2}
            title="双列多选"
            options={[
              { text: '选项一', value: 'a' },
              { text: '选项二', value: 'b' },
              { text: '选项三', value: 'c' },
              { text: '选项四', value: 'd' },
              { text: '选项五', value: 'e' },
              { text: '选项六', value: 'f' },
              { text: '选项七', value: 'g' },
              { text: '选项八', value: 'h' },
              { text: '禁用选项', value: 'i', disabled: true },
              { text: '禁用选项', value: 'j', disabled: true },
            ]}
          />
          <DropdownMenuItem
            value={queryOptionsMulti.option3}
            multiple
            optionsColumns={3}
            title="三列多选"
            options={[
              { text: '选项一', value: 'a' },
              { text: '选项二', value: 'b' },
              { text: '选项三', value: 'c' },
              { text: '选项四', value: 'd' },
              { text: '选项五', value: 'e' },
              { text: '选项六', value: 'f' },
              { text: '选项七', value: 'g' },
              { text: '选项八', value: 'h' },
              { text: '选项九', value: 'i' },
              { text: '禁用选项', value: 'j', disabled: true },
              { text: '禁用选项', value: 'k', disabled: true },
              { text: '禁用选项', value: 'l', disabled: true },
            ]}
          />
        </DropdownMenu>
      </View>
      
      
      <View className="demo-title">禁用状态</View>
      <View
        className="demo-content"
        style={{
          marginLeft: -32,
          marginRight: -32,
        }}
      >
        <DropdownMenu
          onChange={(index, option) => {
            setQueryOptions(() => {
              const key = ['option1', 'option2'];
              const state = Object.assign({}, queryOptions, {
                [key[index]]: option.value,
              });
              return state;
            });
          }}
        >
          <DropdownMenuItem
            disabled
            value={queryOptions.option1}
            // title="商品类型"
            options={[
              { text: '全部商品', value: 0 },
              { text: '新款商品', value: 1 },
              { text: '活动商品', value: 2 },
            ]}
          />
          <DropdownMenuItem
            value={queryOptions.option2}
            options={[
              { text: '默认排序', value: 'a' },
              { text: '好评排序', value: 'b' },
              { text: '销量排序', value: 'c' },
            ]}
          />
        </DropdownMenu>
      </View>


    </View>
  );
}
