import {
  View, Picker, Switch, Textarea, Text, 
} from '@tarojs/components';

import { useState } from 'react';

import {
  VolumeNotice, PreviewClose, PreviewOpen, DemoBlock, AddOne,
  Input, FormItem, FormPlaceholder, PickerSelect, 
} from '@/common/components';
import { useInput } from '@/core/hooks';

import './index.scss';


export default function Index() {
  const [visible, setVisible] = useState(false);
  
  const [name, setName] = useInput<string>('');
  const [addressBackup, setAddressBackup] = useInput<string[]>([]);
  const [others, setOthers] = useInput({
    password: '',
    mobile: '',
    code: '',
    age: '',
    address: [],
    fruit: [],
    skill: '',
    delivery: true,
    remark: '',
  });
  const fruitList = [
    { label: '香蕉🍌', value: '1' },
    { label: '菠萝🍍', value: '2' },
    { label: '苹果🍎', value: '3' },
  ];
  const skillList = [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular.js', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];
  

  return (
    <View className="container safe-area-bottom">
      <DemoBlock title="基础用法" simple>
        <FormItem label="账号">
          <Input
            placeholder="请输入账号"
            clearable
            value={name}
            onInput={(ev) => {
              console.log(ev);
              setName(ev);
            }}
          />
        </FormItem>
        <FormItem label="密码">
          <Input
            password
            clearable
            placeholder="请输入密码"
            value={others.password}
            onInput={(ev) => setOthers(ev, 'password')}
          />
        </FormItem>
        <FormItem label="备注">
          <Textarea
            style={{ height: '64px' }}
            placeholder="请输入备注"
            value={others.remark}
            onInput={(ev) => setOthers(ev, 'remark')}
          />
        </FormItem>
      </DemoBlock>

      <DemoBlock title="带必填项" simple>
        <FormItem label="账号" required>
          <Input
            placeholder="请输入账号"
            value={name}
            onInput={(ev) => setName(ev)}
          />
        </FormItem>
        <FormItem label="密码" required>
          <Input
            password
            placeholder="请输入密码"
            value={others.password}
            onInput={(ev) => setOthers(ev, 'password')}
          />
        </FormItem>
        <FormItem label="备注">
          <Textarea
            style={{ height: '64px' }}
            placeholder="请输入备注"
            value={others.remark}
            onInput={(ev) => setOthers(ev, 'remark')}
          />
        </FormItem>
      </DemoBlock>


      <DemoBlock title="无标题" simple>
        <FormItem>
          <Input
            placeholder="请输入账号"
            value={name}
            onInput={(ev) => setName(ev)}
          />
        </FormItem>
        <FormItem>
          <Input
            password
            placeholder="请输入密码"
            value={others.password}
            onInput={(ev) => setOthers(ev, 'password')}
          />
        </FormItem>
      </DemoBlock>


      <DemoBlock title="图标、右侧扩展" simple>
        <FormItem
          label="账号"
          prefix={<VolumeNotice fill="#808080" />}
        >
          <Input
            placeholder="请输入账号"
            value={name}
            onInput={(ev) => setName(ev)}
          />
        </FormItem>
        <FormItem
          label="手机号"
          extra={<Text style={{ color: '#0052d9', fontSize: 14 }}>发送验证码</Text>}
        >
          <Input
            placeholder="请输入手机号"
            type="number"
            value={others.mobile}
            onInput={(ev) => setOthers(ev, 'mobile')}
          />
        </FormItem>
        <FormItem label="短信验证码">
          <Input
            placeholder="请输入验证码"
            value={others.code}
            onInput={(ev) => setOthers(ev, 'mobile')}
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
      </DemoBlock>


      <DemoBlock title="垂直布局" simple>
        <FormItem
          label="账号"
          required
          layout="vertical"
          titleExtra={<AddOne size={40} fill="#666" />}
        >
          <Input
            placeholder="请输入账号"
            value={name}
            onInput={(ev) => setName(ev)}
          />
        </FormItem>
        <FormItem label="密码" required layout="vertical">
          <Input
            password
            placeholder="请输入密码"
            value={others.password}
            onInput={(ev) => setOthers(ev, 'password')}
          />
        </FormItem>
        <FormItem label="备注" layout="vertical">
          <Textarea
            style={{ height: '64px' }}
            placeholder="请输入备注"
            value={others.remark}
            onInput={(ev) => setOthers(ev, 'remark')}
          />
        </FormItem>
      </DemoBlock>


      <DemoBlock title="禁用输入框" simple>
        <FormItem label="账号">
          <Input
            disabled
            placeholder="请输入账号"
            value="test@test.com"
          />
        </FormItem>
        <FormItem label="姓名" disabled>
          <Input
            disabled
            placeholder="输入框已禁用"
            value="张三疯"
          />
        </FormItem>
        <FormItem label="备注">
          <Textarea
            disabled
            style={{ height: '64px' }}
            placeholder="请输入备注"
            value="这是一段备注文本，这是一段备注长文本这是一段备注长文本"
          />
        </FormItem>
      </DemoBlock>

      <DemoBlock title="其他表单元素" simple>
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
        <FormItem label="送货上门">
          <Switch
            checked={others.delivery}
            onChange={(ev) => setOthers(ev, 'delivery')}
          />
        </FormItem>
        <FormItem label="喜欢水果">
          <PickerSelect
            title="喜欢水果"
            type="checkbox"
            options={[
              { label: '全选', checkAll: true },
              ...fruitList,
            ]}
            defaultValues={others.fruit}
            onConform={(values) => {
              setOthers(values, 'fruit');
            }}
          >
            <FormPlaceholder align="right" isPlaceholder={others.fruit.length === 0}>
              {
                others.fruit.length === 0
                  ? '请选择喜欢水果'
                  : fruitList.filter(it => (others.fruit as any).includes(it.value)).map(it => it.label).join(',')
              }
            </FormPlaceholder>
          </PickerSelect>
        </FormItem>
        <FormItem label="技术">
          <PickerSelect
            title="掌握技术"
            type="radio"
            options={[...skillList]}
            defaultValues={[others.skill]}
            onConform={(value) => {
              setOthers(value, 'skill');
            }}
          >
            <FormPlaceholder align="right" isPlaceholder={!others.skill}>
              {
                !others.skill
                  ? '请选择掌握技能'
                  : skillList.filter(it => it.value === others.skill).map(it => it.label).join(',')
              }
            </FormPlaceholder>
          </PickerSelect>
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
            <FormPlaceholder align="right" isPlaceholder={others.address.length === 0}>
              {others.address.length === 0 ? '请选择地址' : others.address.join(',')}
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
            <FormPlaceholder align="right" isPlaceholder={addressBackup.length === 0}>
              {addressBackup.length === 0 ? '请选择地址' : addressBackup.join(',')}
            </FormPlaceholder>
          </Picker>
        </FormItem>
      </DemoBlock>


      <DemoBlock title="只读模式（展示）" simple>
        <FormItem label="年龄" readOnly content="18" arrow={false}>
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
        <FormItem label="送货上门" readOnly content={<Text>是</Text>} arrow={false}>
          <Switch
            checked={others.delivery}
            onChange={(ev) => setOthers(ev, 'delivery')}
          />
        </FormItem>
        <FormItem
          label="地址"
          readOnly
          content={['广东省', '广州市', '天河区'].join(', ')}
        >
          <Picker
            value={others.address}
            mode="region"
            onChange={(ev) => {
              const { value } = ev.detail;
              setOthers(value, 'address');
            }}
          >
            <View className="picker-placeholder">
              {others.address.length === 0 ? '请选择地址' : others.address.join()}
            </View>
          </Picker>
        </FormItem>
        <FormItem
          label="备用地址"
          readOnly
          content={['广东省', '佛山市', '南海区'].join(', ')}
        >
          <Picker
            value={addressBackup}
            mode="region"
            onChange={(ev) => {
              setAddressBackup(ev.detail.value);
            }}
          >
            <View className="picker-placeholder">{addressBackup.length === 0 ? '请选择地址' : addressBackup.join(',')}</View>
          </Picker>
        </FormItem>
      </DemoBlock>


    </View>
  );
}
