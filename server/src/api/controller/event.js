const Base = requireBaseController();

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this);
    this.eventService = requireService('event', 'api', this);
  }

  /**
   * 活动权限前置检查
   */
  async __before() {
    await super.__before();
    if (['publish', 'update'].indexOf(this.http.action) <= -1) {
      return true;
    }

    // 只有大V才可以发布活动
    const user = await this.userService.getUserInfoByUid(this.member.uid);
    if (!user.isVip) {
      return this.showError(ERROR.EVENT.ONLY_VIP_CAN_PUBLISH);
    }

    return true;
  }

  /**
   * 用户发布活动
   */
  async publishAction() {
    const title = this.param('title');
    const description = this.param('description');
    const images = JSON.stringify(this.param('images'));
    const longitude = this.param('longitude');
    const latitude = this.param('latitude');
    const startTime = this.param('startTime');
    const endTime = this.param('endTime');
    const joinLimit = this.param('joinLimit');// 0为不限制
    const deadline = this.param('deadline');
    const event = await this.eventService.publish(this.member.uid, title, description, images, longitude, latitude, startTime, endTime, joinLimit, deadline);
    return this.success({ eventId: event.eventId, userEventPublishs: event.userEventPublishs });
  }

  /**
   * 用户修改活动
   */
  async updateAction() {
    const eventId = this.param('eventId');
    const title = this.param('title');
    const description = this.param('description');
    const images = JSON.stringify(this.param('images'));
    const longitude = this.param('longitude');
    const latitude = this.param('latitude');
    const startTime = this.param('startTime');
    const endTime = this.param('endTime');
    const joinLimit = this.param('joinLimit');// 0为不限制，只可增多，不可减少
    const deadline = this.param('deadline');

    // 判断活动是否存在
    const event = await this.eventService.getEvent(eventId);
    if (think.isEmpty(event)) {
      return this.showError(ERROR.EVENT.NOT_EXISTS);
    }

    // 报名人数限制，只可增多，不可减少
    let b = false;
    b = b || (event.joinLimit === 0 && joinLimit > 0);
    b = b || (event.joinLimit > 0 && joinLimit < event.joinLimit);
    if (b) {
      return this.showError(ERROR.EVENT.JOIN_LIMIT_ONLY_CAN_INCREMENT);
    }

    await this.eventService.update(eventId, { title, description, images, longitude, latitude, startTime, endTime, joinLimit, deadline });
    return this.success(1);
  }

  /**
   * 活动详情
   */
  async infoAction() {
    // 判断活动是否存在
    const eventId = this.param('eventId');
    const event = await this.eventService.getEvent(eventId);
    if (think.isEmpty(event)) {
      return this.showError(ERROR.EVENT.NOT_EXISTS);
    }
    return this.success(1);
  }

  /**
   * 首页活动列表
   */
  async listAction() {
  }
};
