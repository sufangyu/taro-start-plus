/* eslint-disable */
const yargs = require('yargs')
const pkg = require('../package.json')

// 可以执行脚步时指定构建用户：npm run build:weapp:upload -- --user={zsf}
const CIPluginFn = async () => {
  /**
   * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
   * @type {CIOptions}
   */
  const { user } = yargs.argv;
  const version = pkg.taroConfig.version;
  let desc = pkg.taroConfig.desc;
  desc = user ? `${desc}(由${user}发布)` : desc;

  return {
    weapp: {
      appid: 'wx71816a8ee509f483',
      privateKeyPath: 'key/private.wx71816a8ee509f483.key',
    },
    tt: {
      email: '字节小程序邮箱',
      password: '字节小程序密码',
    },
    alipay: {
      appid: '支付宝小程序appid',
      toolId: '工具id',
      privateKeyPath: '密钥文件相对项目根目录的相对路径，例如 key/pkcs8-private-pem',
    },
    dd: {
      appid: '钉钉小程序appid,即钉钉开放平台后台应用管理的 MiniAppId 选项',
      token: '令牌，从钉钉后台获取',
    },
    swan: {
      token: '鉴权需要的token令牌',
    },
    version,
    desc,
  }
}

module.exports = CIPluginFn;