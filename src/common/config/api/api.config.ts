
export interface EnvConfig {
  /** 名称 */
  name: string;

  /** 环境标识 */
  code: string;

  /** api 配置 */
  apiBase: {
    base: string;
    open: string;
    [key: string]: string;
  };
}

// 各个环境的 API
export const ENV_MAP: EnvConfig[] = [
  {
    name: '开发',
    code: 'dev',
    apiBase: {
      base: 'https://dev-cnodejs.org/api/v1',
      open: 'https://dev-cnodejs.org/openapi/v1',
    },
  },
  {
    name: '测试',
    code: 'test',
    apiBase: {
      base: 'https://test-cnodejs.org/api/v1',
      open: 'https://test-cnodejs.org/openapi/v1',
    },
  },
  {
    name: '生产',
    code: 'prod',
    apiBase: {
      base: 'https://cnodejs.org/api/v1',
      open: 'https://cnodejs.org/openapi/v1',
    },
  },
];
