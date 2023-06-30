import { View, Button, Input, Label, Picker, Switch } from '@tarojs/components'
import { useInput } from '@/core/hooks';
import {Validation} from '@/core/utils';
import Taro from '@tarojs/taro';

import './index.scss'


export default function Index() {

  const [name, setName] = useInput<string>('');
  const [addressBackup, setAddressBackup] = useInput<string[]>([]);
  const [others, setOthers] = useInput({
    password: '',
    mobile: '',
    age: '',
    address: [],
    delivery: true,
  });

  // 处理提交事件
  const handleSubmit = () => {
    const { password, mobile } = others;
    const validator = new Validation();
    validator.add(name, 'require', '账号不能为空');
    validator.add(password, [
      { type: 'require', msg: '请输入密码' },
      { type: 'minLength', minLen: 6, msg: '密码长度不符合要求', },
    ]);
    validator.add(mobile, [
      { type: 'require', msg: '手机号不能为空', },
      {
        type: 'validator',
        msg: '手机号格式不正确',
        validator: (value: string) => value.startsWith('1') && /\d{11}/.test(value),
      },
    ]);

    const result = validator.run();
    console.log('handleSubmit result =>>', result);
    if (result) {
      return Taro.showToast({
        title: result,
        icon: 'error',
      });
    }
  }

  return (
    <View className='container'>
      <View className='form-item'>
        <Label>账号：</Label>
        <Input
          value={name}
          onInput={(ev) => setName(ev)}
        />
      </View>

      <View className='form-item'>
        <Label>密码：</Label>
        <Input
          password
          value={others.password}
          onInput={(ev) => setOthers(ev, 'password')}
        />
      </View>

      <View className='form-item'>
        <Label>手机号：</Label>
        <Input
          type='number'
          value={others.mobile}
          onInput={(ev) => setOthers(ev, 'mobile')}
        />
      </View>

      <View className='form-item'>
        <Label>年龄：</Label>
        <Input
          value={others.age}
          type='number'
          onInput={(ev) => {
            return setOthers(ev, 'age', (val: number) => {
              return val > 18 ? 18 : val;
            });
          }}
        />
      </View>

      <View className='form-item'>
        <Label>地址：</Label>
        <Picker
          value={others.address}
          mode='region'
          onChange={(ev) => {
            const { value } = ev.detail;
            setOthers(value, 'address');
          }}
        >
          <View className='picker-placeholder'>{others.address.length === 0 ? '请选择地址' : others.address.join()}</View>
        </Picker>
      </View>

      <View className='form-item'>
        <Label>备用地址：</Label>
        <Picker
          value={addressBackup}
          mode='region'
          onChange={(ev) => {
            setAddressBackup(ev.detail.value);
          }}
        >
          <View className='picker-placeholder'>{addressBackup.length === 0 ? '请选择地址' : addressBackup.join(',')}</View>
        </Picker>
      </View>

      <View className='form-item'>
        <Label>送货上门</Label>
        <Switch
          checked={others.delivery}
          onChange={(ev) => setOthers(ev, 'delivery')}
        />
      </View>

      <View className='form-actions'>
        <Button
          type='primary'
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
