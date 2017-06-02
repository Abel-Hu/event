const Base = think.service('base', 'common');
const vipConfig = think.config('vip') || [];

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入service
    this.pojoService = requireService('pojo', 'api', this.controller);

    // 注入model
    this.userModel = this.model('user');
    this.eventModel = this.model('event');
    this.eventFavModel = this.model('event_fav');
    this.eventJoinModel = this.model('event_join');
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

  /**
   * 我参与过的报名列表
   * @param uid 用户id
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async joinList(uid, lastSequence = '', headSequence = '', pageSize = 30) {
    const pageData = await this.eventJoinModel.cursorPage({ uid }, lastSequence, headSequence, pageSize);
    const eventIdList = pageData.list.map(e => e.eventId);
    pageData.list = await this.pojoService.makeEventBase(...eventIdList);
    return pageData;
  }
  /**
   * 我收藏过的活动列表
   * @param uid 用户id
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async favList(uid, lastSequence = '', headSequence = '', pageSize = 30) {
    const pageData = await this.eventFavModel.cursorPage({ uid }, lastSequence, headSequence, pageSize);
    const eventIdList = pageData.list.map(e => e.eventId);
    pageData.list = await this.pojoService.makeEventBase(...eventIdList);
    return pageData;
  }
};
