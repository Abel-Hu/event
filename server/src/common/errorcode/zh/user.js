/**
 * 简体中文错误提示
 * key规则：
 * 模块名_具体错误_ERROR(全部大写)，所有标点符号用中文
 */
const path = require('path');

console.log(path.parse(__filename).name.toUpperCase());
global.Error[__filename] = {
  /**
   * 微信登录数据解析失败
   */
  USER_WXDATA_PARSE_ERROR: new ErrorCode(11, '微信登录数据解析失败!'),
};
