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
      this._model = null;
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

  /**
   * 添加数据
   * @param data 待添加的数据
   */
  async add(data) {
    this.beforeAdd(data);
    const add = await this._model.create(data);
    return JSON.parse(JSON.stringify(add));
  }

  /**
   * 查询一条数据
   * @param condition 查询条件
   */
  async findOne(condition) {
    const one = await this._model.findOne(condition);
    return JSON.parse(JSON.stringify(one));
  }

  /**
   * 修改数据
   * @param condition 查询条件
   * @param data 要修改的数据
   */
  async update(condition, data) {
    this.beforeUpdate(data);
    const tmp = await this._model.update(condition, { $set: data });
    think.extend(tmp, data);
    return JSON.parse(JSON.stringify(tmp));
  }

  /**
   * 删除数据
   * @param condition 查询条件
   */
  async remove(condition) {
    const tmp = await this._model.remove(condition);
    return JSON.parse(JSON.stringify(tmp));
  }

  /**
   * 自增(或者自减)
   * @param condition 查询条件
   * @param data 要自增的字段以及它的步长(例如：{seq: 1})
   */
  async incr(condition, data) {
    const tmp = await this._model.findOneAndUpdate(condition, { $inc: data }, { multi: false, new: true });
    const result = {};
    Object.keys(data).filter((k) => {
      think.extend(result, { [k]: tmp[k] });
      return true;
    });
    return result;
  }

  /**
   * 游标分页mongodb查询封装
   * @param condition 查询条件
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async cursorPage(condition = {}, lastSequence = '', headSequence = '', pageSize = 30) {
    const where = {};
    // 如果有上拉刷新的需求，则优先查询上拉刷新
    if (!think.isEmpty(headSequence)) {
      think.extend(where, { _id: { $gt: headSequence } });
    } else if (!think.isEmpty(lastSequence)) {
      // 否则才查询下拉刷新的
      think.extend(where, { _id: { $lt: lastSequence } });
    }

    // 合并其他查询条件
    think.extend(where, condition);

    // 查询
    const list = await this._model.find(where, {}, { sort: { _id: -1 }, limit: pageSize });

    // 顶部游标：只有"第一页的时候"或者"上拉刷新的时候"才返回
    let b = true;
    b = b && (think.isEmpty(lastSequence) || !think.isEmpty(headSequence));
    b = b && !think.isEmpty(list);
    const _headSequence = b ? list[0]._id : '';
    let _lastSequence = '';
    if (list.length >= pageSize) {
      list.length -= 1;
      _lastSequence = list[list.length - 1]._id;
    }
    return { list, lastSequence: _lastSequence, headSequence: _headSequence };
  }
};
