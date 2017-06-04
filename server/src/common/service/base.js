const path = require('path');

module.exports = class extends think.service.base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 约定第一个参数是控制器对象
    this.controller = think.isEmpty(args) || think.isEmpty(args[0]) ? null : args[0][0];

    // 根据业务模块自动切换日志频道
    const filename = this.__filename.replace(think.APP_PATH, '');
    const arr = filename.split(path.sep);
    const channel = `${arr[1]}.${arr[2]}.${think.camelCase(arr[3].replace('.js', ''))}`;
    this.LOG = getLogger(channel);
  }
};
