const Base = think.service('base', 'common');
const timeUtil = requireCommon('time');

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入model
    this.eventModel = this.model('event');
    this.userModel = this.model('user');
  }

  /**
   * 发布一个活动
   * @param uid 发布用户id
   * @param title 活动标题
   * @param description 活动详情
   * @param images 活动图片
   * @param longitude 活动所在地点的经度
   * @param latitude 活动所在地点的纬度
   * @param startTime 活动开始时间
   * @param endTime 活动结束时间
   * @param joinLimit 报名人数上限
   * @param deadline 报名截至时间
   */
  async publish(uid, title, description, images, longitude, latitude, startTime, endTime, joinLimit, deadline) {
    const event = await this.eventModel.publish({
      uid,
      title,
      description,
      images,
      longitude,
      latitude,
      startTime: timeUtil.str2time(startTime),
      endTime: timeUtil.str2time(endTime),
      joinLimit,
      deadline: timeUtil.str2time(deadline),
    });
    event.eventId = event._id;
    delete event._id;

    // 发布成功，用户发布活动数+1
    const userEventPublishs = await this.userModel.incrEventPublishs(uid);
    event.userEventPublishs = userEventPublishs;
    return event;
  }

  /**
   * 修改一个活动
   * @param eventId 活动id
   * @param data 要修改的数据
   */
  async update(eventId, data) {
    const event = this.eventModel.update(eventId, data);
    return event;
  }

  /**
   * 获取一个活动
   * @param eventId 活动id
   */
  async getEvent(eventId) {
    const event = this.eventModel.getEvent(eventId);
    return event;
  }
};
