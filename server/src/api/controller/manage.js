const Base = requireBaseController();
const vipConfig = think.config('vip') || [];

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this);
    this.manageService = requireService('manage', 'api', this);
  }

  /**
   * 管理权限前置检查
   */
  async __before() {
    await super.__before();

    // 配置文件配的大V就是管理员
    const user = await this.userService.getUserByUid(this.member.uid);
    if (vipConfig.indexOf(user.openId) <= -1) {
      return this.showError(ERROR.SYSTEM.SYSTEM_NOT_FIND_RESPONSE_ERROR);
    }

    return true;
  }

  /**
   * 用户列表
   */
  async userlistAction() {
    const lastSequence = this.lastSequence();
    const headSequence = this.headSequence();
    const pageSize = this.pageSize();

    const nickName = this.param('nickName');
    const order = this.param('order') === 'uid' ? '_id' : this.param('order');
    const by = this.param('by') === 'asc' ? 1 : -1;

    let condition = {};
    if (!think.isEmpty(nickName)) {
      condition = { nickName: { $regex: new RegExp(nickName, 'ig') } };
    }

    const pageData = await this.manageService.userList(condition, lastSequence, headSequence, pageSize, { [order]: by });
    return this.cursorPage(pageData);
  }

  /**
   * 修改用户数据
   */
  async userupdateAction() {
    const uid = this.param('uid');
    const isVip = this.param('isVip');

    // 判断用户是否存在
    const user = await this.userService.getUserByUid(uid);
    if (think.isEmpty(user)) {
      return this.showError(ERROR.USER.NOT_EXISTS);
    }

    const data = {};
    if (!think.isEmpty(isVip)) {
      data.isVip = isVip;
    }

    if (think.isEmpty(data)) {
      return this.success(1);
    }
    await this.userService.updateUserInfo(uid, data);
    return this.success(1);
  }

  /**
   * 活动列表
   */
  async eventlistAction() {
    const lastSequence = this.lastSequence();
    const headSequence = this.headSequence();
    const pageSize = this.pageSize();

    const title = this.param('title');
    const order = this.param('order') === 'eventId' ? '_id' : this.param('order');
    const by = this.param('by') === 'asc' ? 1 : -1;

    let condition = {};
    if (!think.isEmpty(title)) {
      condition = { title: { $regex: new RegExp(title, 'ig') } };
    }

    const pageData = await this.manageService.eventList(condition, lastSequence, headSequence, pageSize, { [order]: by });
    return this.cursorPage(pageData);
  }

  /**
   * 修改活动数据
   */
  async eventupdateAction() {

  }
};
