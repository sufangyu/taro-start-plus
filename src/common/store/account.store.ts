import { storageUtil } from '@/core/utils';
import { StorageKey } from '@/common/constants';
import { create } from 'zustand'


export interface Account {
  token: string;
  name: string;
  age: number;
}

interface AccountStore {
  /** 账户信息 */
  account: Account | null;
  /** 是否已登录 */
  isLogged: boolean;
  /** 登录 */
  login: (account: Account) => void;
  /** 退出登录 */
  logout: () => void;
}

export const useAccountStore = create<AccountStore>()(
  (set) => ({
    account: storageUtil.getAsync(StorageKey.ACCOUNT_KEY) ?? null,
    isLogged: storageUtil.getAsync(StorageKey.ACCOUNT_KEY) ?? false,
    login: (account) => {
      const isLogged = true;
      set(() => ({ account: account }));
      set(() => ({ isLogged: isLogged }));

      storageUtil.set(StorageKey.ACCOUNT_KEY, account);
      storageUtil.set(StorageKey.LOGGED_KEY, isLogged);
    },
    logout:()=> {
      set(() => ({ account: null }));
      set(() => ({ isLogged: false }));

      storageUtil.remove(StorageKey.ACCOUNT_KEY);
      storageUtil.remove(StorageKey.LOGGED_KEY);
    },
  }),
);




