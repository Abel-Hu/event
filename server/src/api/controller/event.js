const Base = requireBaseController();

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.eventService = requireService('event', 'api', this);
  }

  /**
   * 活动权限前置检查
   */
  __before() {
    if (['publish', 'update'].indexOf(this.http.action) <= -1) {
      return true;
    }

    // 只有大V才可以发布活动
    if (!this.member.isVip) {
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
    const joinLimit = this.param('joinLimit');
    const deadline = this.param('deadline');
    const event = await this.eventService.publish(this.member.uid, title, description, images, longitude, latitude, startTime, endTime, joinLimit, deadline);
    return this.success({ eventId: event.eventId, userEventPublishs: event.userEventPublishs });
  }

  /**
   * 用户修改活动
   */
  async updateAction() {

  }
};
