/* eslint-disable @typescript-eslint/no-var-requires */
// 参考: https://github.com/ecstAsy/Taro-Mock/blob/master/mock/index.js

const delay = require('mocker-api/lib/delay');
const Query = require('./utils');
const ListData = require('./list');


const data = {
  'GET /api/list': (req, res) => {
    const { query } = req;
    const { page, size, dataSource } = Query(query, ListData.list);

    res.status('200').json({
      success: true,
      message: '请求成功',
      data: {
        list: dataSource.slice((page - 1) * size, page * size),
        page: Number(page),
        size: Number(size),
        pages: Math.ceil(dataSource.length / size),
        total: dataSource.length,
      },
    });
  },

  'POST /api/post': (req, res) => {
    const { body } = req;
    res.status('200').json({
      success: true,
      message: '请求成功',
      data: {
        name: body.name,
      },
    });
  },

  'PUT /api/put': (req, res) => {
    const { body } = req;
    res.status('200').json({
      success: true,
      message: `更新${body.name}信息成功`,
      data: {
        name: body.name,
      },
    });
  },

  'DELETE /api/delete/:id': (req, res) => {
    const { id } = req.params;
    res.status('200').json({
      success: true,
      message: `ID:${id}的用户删除成功`,
    });
  },
};

// 使用delay方法可以延迟返回数据
module.exports = delay(data, 1000);
