const fs = require('fs');
const path = require('path');

//
/**
 * 异步 递归创建目录
 *
 * @export
 * @param {*} dirname
 * @param {*} mode
 * @param {*} callback
 */
function mkdirs(dirname, mode, callback) {
  fs.exists(dirname, function (exists){
    if (exists) {
        callback();
    } else {
      mkdirs(path.dirname(dirname), mode, function() {
        fs.mkdir(dirname, mode, callback);
      });
    }
  });
}


/**
 * 同步 递归创建文件
 *
 * @param {*} dirname
 * @param {*} mode
 * @returns
 */
function mkdirsSync(dirname, mode) {
  if (fs.existsSync(dirname)){
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname), mode)) {
      fs.mkdirSync(dirname, mode);
      return true;
    }
  }
}

module.exports = {
  mkdirs,
  mkdirsSync,
};