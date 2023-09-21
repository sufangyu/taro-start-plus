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


/**
 * 将中划线字符转换为驼峰字符,默认转为小驼峰。
 * @param {string} str 需要转换的字符
 * @param {number} num 转换后的类型，默认值1（0是大驼峰  1是小驼峰）
 * @returns  示例:t-button-test-1 => tButtonTest1
 * 参考: https://blog.csdn.net/liuyan1106_/article/details/121648157
 */
function formatConversion(str, num = 0) {
  const arr = str.split('-');
  for (let i = 0; i < arr.length; i += 1) {
    if (i === 0 && num === 1) {
      arr[i] = arr[i].charAt(0).toLowerCase() + arr[i].substring(1).toLowerCase();
    } else {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1).toLowerCase();
    }
  }
  return arr.join('');
}



module.exports = {
  mkdirs,
  mkdirsSync,
  formatConversion,
};