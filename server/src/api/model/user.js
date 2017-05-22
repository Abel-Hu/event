/**
 * 用户表
 */
const Base = requireBaseModel();
module.exports = class extends Base {
  /**
   * 创建用户
   * @param data 用户数据
   */
  async create(data) {
    this.beforeAdd(data);
    const user = await this._model.create(data);
    return user;
  }

  /**
   * 根据openId获取用户
   * @param openId 微信小程序第三方id
   */
  async getUserByOpenId(openId) {
    const user = await this._model.findOne({ openId });
    return user;
  }
};
