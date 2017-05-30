module.exports = class extends think.logic.base {
  init(...arg) {
    super.init(...arg);

    // 自动切换日志log日志频道
    this.LOG = getLogger(`${this.http.module}.${this.http.controller}.${this.http.action}`);
  }
};
