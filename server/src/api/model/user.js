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
    return JSON.parse(JSON.stringify(user));
  }

  /**
   * 根据uid获取用户
   * @param uid 用户id
   */
  async getUserByUid(uid) {
    const user = await this._model.findOne({ _id: uid });
    return JSON.parse(JSON.stringify(user));
  }

  /**
   * 根据openId获取用户
   * @param openId 微信小程序第三方id
   */
  async getUserByOpenId(openId) {
    const user = await this._model.findOne({ openId });
    return JSON.parse(JSON.stringify(user));
  }

  /**
   * 修改用户个人资料
   * @param uid 用户id
   * @param data 要修改的数据
   */
  async updateUserInfo(uid, data) {
    if (think.isEmpty(data)) {
      return null;
    }
    this.beforeUpdate(data);
    const user = await this._model.findByIdAndUpdate(uid, { $set: data });
    think.extend(user, data);
    return JSON.parse(JSON.stringify(user));
  }
};
