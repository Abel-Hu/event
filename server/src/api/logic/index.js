module.exports = class extends think.logic.base {
  indexAction() {
    this.allowMethods = 'get';// 只允许 GET 请求类型
  }
};
