/* eslint-disable */
module.exports = function (ctx) {
  ctx.register({
    name: 'onPreviewComplete',
    fn: ({ success, data, error }) => {
      console.log('接收预览后数据(开发版)', success, data, error)
      // 可以在这里发送钉钉或者飞书消息
    },
  });


  ctx.register({
    name: 'onUploadComplete',
    fn: ({ success, data, error }) => {
      console.log('接收上传后数据(开发版)', success, data, error)
      // 可以在这里发送钉钉或者飞书消息
    },
  });
}