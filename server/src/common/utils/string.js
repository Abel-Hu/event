/**
 * 字符串工具集
 */
const { toString } = require('lodash');

module.exports = {
  /**
   * 判断是否为json字符串
   * @param str 字符串或者对象
   */
  isJSON(str) {
    const type = Object.prototype.toString.call(str).toLowerCase();
    if (typeof (str) === 'object' && (type === '[object object]' || type === '[object array]' ) && !str.length) {
      return true;
    }

    if (/^[0-9]+$/g.test(str)) {
      return false;
    }

    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  },
  /**
   * 判断字符串是否为url格式
   * @param str 字符串
   */
  isURL(str) {
    return /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(str);
  },
  /**
   * 首字母大写
   * @param str 字符串
   */
  firstUpperCase(str) {
    const string = toString(str).trim();
    return think.isEmpty(string) ? '' : string.substring(0, 1).toUpperCase() + string.substring(1);
  },
  /**
   * 首字母小写
   * @param str 字符串
   */
  firstLowerCase(str) {
    const string = toString(str).trim();
    return think.isEmpty(string) ? '' : string.substring(0, 1).toLowerCase() + string.substring(1);
  },
};
