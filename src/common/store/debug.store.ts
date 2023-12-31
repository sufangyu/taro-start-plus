import { create } from 'zustand';

import { StorageKey } from '@/common/constants';
import { storageUtil } from '@/core/utils';


interface DebugStore {
  envCode: string;
  setEnvCode: (code:string) => void;
  retEnvCode: () => void;
}

export const useDebugStore = create<DebugStore>()(
  (set) => ({
    envCode: storageUtil.getAsync(StorageKey.API_ENV_CODE_KEY) ?? '',
    setEnvCode(code) {
      storageUtil.set(StorageKey.API_ENV_CODE_KEY, code);

      set(() => ({
        envCode: code,
      }));
    },
    retEnvCode() {
      storageUtil.remove(StorageKey.API_ENV_CODE_KEY);

      set(() => ({
        envCode: '',
      }));
    },
  }),
);


