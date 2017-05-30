/**
 * model基类
 */
const timeUtil = requireCommon('time');
const path = require('path');
require('mongoose-long')(mongoose);

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

      // 自动注册一个非严格的Schema
      if (think.isEmpty(mongoose.modelSchemas[this.name])) {
        // 自动获取表结构(不需要定义createTime、updateTime自动补上)
        const pojo = require(`./${this.name}`) || {};
        think.extend(pojo, { createTime: { type: mongoose.Types.Long, default: 0 } });
        think.extend(pojo, { updateTime: { type: mongoose.Types.Long, default: 0 } });
        const schema = new mongoose.Schema(pojo, { strict: true, versionKey: false });
        this._model = mongoose.model(this.name, schema, this.name);
      } else {
        this._model = mongoose.model(this.name);
      }
    } catch (e) {
      this.LOG.error(e);
    }
  }

  /**
   * 添加前aop实现
   * @param data 待添加的数据
   */
  async beforeAdd(data) {
    const tmp = data;
    tmp.createTime = mongoose.Types.Long.fromNumber(timeUtil.nowMillisecond());
    tmp.updateTime = mongoose.Types.Long.fromNumber(tmp.createTime);
    return tmp;
  }

  /**
   * 修改前aop实现
   * @param data 待修改的数据
   */
  async beforeUpdate(data) {
    const tmp = data;
    tmp.updateTime = mongoose.Types.Long.fromNumber(timeUtil.nowMillisecond());
    return tmp;
  }
};
