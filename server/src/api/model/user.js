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
    const user = await this.add(data);
    return user;
  }

  /**
   * 根据uid获取用户
   * @param uid 用户id
   */
  async getUserByUid(uid) {
    const user = await this.findOne({ _id: uid });
    return user;
  }

  /**
   * 根据openId获取用户
   * @param openId 微信小程序第三方id
   */
  async getUserByOpenId(openId) {
    const user = await this.findOne({ openId });
    return user;
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
    const user = await this.update({ _id: uid }, { $set: data });
    return user;
  }

  /**
   * 给用户的活动发布数量增加1
   * @param uid 用户id
   */
  async incrEventPublishs(uid) {
    const result = await this.incr(uid, { eventPublishs: 1 });
    return result.eventPublishs || 0;
  }

  /**
   * 给用户的活动参与数量增加1
   * @param uid 用户id
   */
  async incrEventPublishs(uid) {
    const result = await this.incr(uid, { eventJoins: 1 });
    return result.eventJoins || 0;
  }
};
