import {
  View, Button, Picker, Switch, Textarea, Text, 
} from '@tarojs/components';
import Taro from '@tarojs/taro';

import { useState } from 'react';

import {
  Input, FormItem, PreviewClose, PreviewOpen, FormPlaceholder, 
} from '@/common/components';
import { useInput } from '@/core/hooks';
import { Validation } from '@/core/utils';

import './index.scss';


export default function Index() {
  const [visible, setVisible] = useState(false);
  
  const [name, setName] = useInput<string>('');
  const [addressBackup, setAddressBackup] = useInput<string[]>([]);
  const [others, setOthers] = useInput({
    password: '',
    mobile: '',
    age: '',
    address: [],
    delivery: true,
    remark: '',
  });

  // 处理提交事件
  const handleSubmit = () => {
    const { password, mobile } = others;
    const validator = new Validation();
    validator.add(name, 'require', '账号不能为空');
    validator.add(password, [
      { type: 'require', msg: '请输入密码' },
      { type: 'minLength', minLen: 6, msg: '密码长度不够' },
    ]);
    validator.add(mobile, [
      { type: 'require', msg: '手机号不能为空' },
      {
        type: 'validator',
        msg: '手机号格式不对',
        validator: (value: string) => value.startsWith('1') && /\d{11}/.test(value),
      },
    ]);

    const result = validator.run();
    console.log('handleSubmit result =>>', result);
    if (result) {
      Taro.showToast({
        title: result,
        icon: 'error',
      });
      return;
    } 
    console.log('提交逻辑');
  };

  return (
    <View className="container">
      <FormItem label="账号">
        <Input
          placeholder="请输入账号"
          value={name}
          onInput={(ev) => setName(ev)}
        />
      </FormItem>
     
      <FormItem
        label="密码"
        extra={!visible ? (
          <PreviewClose size={32} onClick={() => setVisible(true)} />
        ) : (
          <PreviewOpen size={32} onClick={() => setVisible(false)} />
        )}
      >
        <Input
          password={!visible}
          placeholder="请输入密码"
          value={others.password}
          onInput={(ev) => setOthers(ev, 'password')}
        />
      </FormItem>

      <FormItem
        label="手机号"
        extra={<Text style={{ color: '#0052d9', fontSize: 13 }}>发送验证码</Text>}
      >
        <Input
          placeholder="请输入手机号"
          type="number"
          value={others.mobile}
          onInput={(ev) => setOthers(ev, 'mobile')}
        />
      </FormItem>

      <FormItem label="年龄">
        <Input
          value={others.age}
          placeholder="请输入年龄"
          type="number"
          onInput={(ev) => {
            return setOthers(ev, 'age', (val: number) => {
              return val > 18 ? 18 : val;
            });
          }}
        />
      </FormItem>

      <FormItem label="地址">
        <Picker
          value={others.address}
          mode="region"
          onChange={(ev) => {
            const { value } = ev.detail;
            setOthers(value, 'address');
          }}
        >
          <FormPlaceholder align="left" isPlaceholder={others.address.length === 0}>
            {others.address.length === 0 ? '请选择地址' : others.address.join()}
          </FormPlaceholder>
        </Picker>
      </FormItem>

      <FormItem label="备用地址">
        <Picker
          value={addressBackup}
          mode="region"
          onChange={(ev) => {
            setAddressBackup(ev.detail.value);
          }}
        >
          <FormPlaceholder align="left" isPlaceholder={addressBackup.length === 0}>
            {addressBackup.length === 0 ? '请选择地址' : addressBackup.join(',')}
          </FormPlaceholder>
        </Picker>
      </FormItem>

      <FormItem label="送货上门">
        <Switch
          checked={others.delivery}
          onChange={(ev) => setOthers(ev, 'delivery')}
        />
      </FormItem>

      <FormItem
        label="备注"
      >
        <Textarea
          style={{ height: '100px' }}
          placeholder="请输入备注"
          value={others.remark}
          onInput={(ev) => setOthers(ev, 'remark')}
        />
      </FormItem>

      <View className="form-actions">
        <Button
          type="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          提交
        </Button>
      </View>
    </View>
  );
}
