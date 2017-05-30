const Base = requireBaseController();

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.eventService = requireService('event', 'api', this);
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
    return this.success(event.eventId);
  }
};
