const path = require('path');

module.exports = class extends think.service.base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 根据业务模块自动切换日志频道
    const filename = (this.__filename || __filename).replace(think.APP_PATH, '');
    const arr = filename.split(path.sep);
    const channel = `${arr[1]}.${arr[2]}.${think.camelCase(arr[3].replace('.js', ''))}`;
    this.LOG = getLogger(channel);
  }

  /**
   * 爬虫入口(必须要子类继承)
   */
  crawler() {
    throw new Error(`please implement the method: ${this.LOG.category}.crawler()`);
  }
};
