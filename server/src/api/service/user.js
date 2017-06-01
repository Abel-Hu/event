const Base = think.service('base', 'common');
const vipConfig = think.config('vip') || [];
module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入model
    this.userModel = this.model('user');
  }

  /**
   * 创建用户
   * @param wxdata 微信小程序登录数据
   * @param ip 用户创建时获取到的ip
   */
  async create(wxdata, ip) {
    // 如果数据库有就不要创建了
    let user = await this.getUserByOpenId(wxdata.openId);
    if (think.isEmpty(user)) {
      user = wxdata;
      user.ip = ip;
      user.sex = wxdata.gender;
      user.isVip = vipConfig.indexOf(user.openId) > -1;
      user = await this.userModel.add(user);
    }
    return this.makeUserInfo(user);
  }

  /**
   * 修改用户个人资料
   * @param uid 用户id
   * @param data 要修改的数据
   */
  async updateUserInfo(uid, data = {}) {
    const user = await this.userModel.update({ _id: uid }, { $set: data });
    return this.makeUserInfo(user);
  }

  /**
   * 根据uid，获取userBase
   * @param uid 一堆uid
   */
  async makeUserBase(...uid) {
    const promiseArray = uid.map(v => this.getUserInfoByUid(v));

    const matcher = ['uid', 'nickName', 'sex', 'avatarUrl', 'isVip', 'description'];
    const promiseResult = await Promise.all(promiseArray);
    const list = promiseResult.map((user) => {
      const tmp = {};
      matcher.filter((k) => {
        think.extend(tmp, { [k]: user[k] });
        return true;
      });
      return tmp;
    });
    return uid.length === 1 ? list[0] : list;
  }

  /**
   * 生成用户个人资料
   * @param user 用户对象
   */
  makeUserInfo(user) {
    if (think.isEmpty(user)) {
      return {};
    }
    const member = {};
    ['_id', 'nickName', 'avatarUrl', 'isVip', 'sex', 'mobile', 'birthday', 'description', 'eventPublishs', 'eventJoins'].filter((k) => {
      member[k] = user[k];
      return true;
    });
    member.uid = member._id;
    delete member._id;
    return member;
  }

  /**
   * 根据uid获取用户
   * @param uid 用户id
   */
  async getUserByUid(uid) {
    const user = await this.userModel.findOne({ _id: uid });
    return this.makeUserInfo(user);
  }

  /**
   * 根据openId获取用户
   * @param openId 微信小程序第三方id
   */
  async getUserByOpenId(openId) {
    const user = await this.userModel.findOne({ openId });
    return this.makeUserInfo(user);
  }

  /**
   * 给用户的活动发布数量增加1
   * @param uid 用户id
   */
  async incrEventPublishs(uid) {
    const result = await this.userModel.incr({ _id: uid }, { eventPublishs: 1 });
    return result.eventPublishs || 0;
  }

  /**
   * 给用户的活动参与数量增加1
   * @param uid 用户id
   */
  async incrEventJoins(uid) {
    const result = await this.userModel.incr({ _id: uid }, { eventJoins: 1 });
    return result.eventJoins || 0;
  }
};
