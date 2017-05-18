/**
 * model基类
 */
const path = require('path');

module.exports = class extends think.model.base {
  // 最先执行
  init(...args) {
    super.init(...args);

    try {
      // 根据业务模块自动切换日志频道
      const filename = (this.__filename || __filename).replace(think.APP_PATH, '');
      const arr = filename.split(path.sep);
      const channel = `${arr[1]}.${arr[2]}.${think.camelCase(arr[3].replace('.js', ''))}`;
      this.LOG = getLogger(channel);

      // 自动注册一个非严格的Schema，方便做爬虫
      if (think.isEmpty(mongodb.modelSchemas[this.name])) {
        const schema = new mongodb.Schema({}, { strict: false, versionKey: false });
        this._model = mongodb.model(this.name, schema, this.name);
      } else {
        this._model = mongodb.model(this.name);
      }
    } catch (e) {
      this.LOG.error(e);
    }
  }
};
