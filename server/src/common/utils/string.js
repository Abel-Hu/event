/**
 * 字符串工具集
 */
module.exports = {
  /**
   * 强转成字符串
   * @param obj 某对象
   */
  toString(obj) {
    let string = String(obj).toString();
    string = string.replace('null', '');
    string = string.replace('undefined', '');
    return string.trim();
  },
  /**
   * 判断是否为json字符串
   * @param str 字符串或者对象
   */
  isJSON(str) {
    const typeSet = new Set(['object', '[object object]', '[object array]']);
    const type = Object.prototype.toString.call(str).toLowerCase();
    if (typeSet.has(type)) {
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
    const regexp = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/;
    return regexp.test(this.toString(str));
  },
  /**
   * 首字母大写
   * @param str 字符串
   */
  firstUpperCase(str) {
    const string = this.toString(str);
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  },
  /**
   * 首字母小写
   * @param str 字符串
   */
  firstLowerCase(str) {
    const string = this.toString(str);
    return string.substring(0, 1).toLowerCase() + string.substring(1);
  },
};
