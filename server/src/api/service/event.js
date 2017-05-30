const Base = think.service('base', 'common');
module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入model
    this.eventModel = this.model('event');
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
   * @param peoples 报名人数上限
   * @param deadline 报名截至时间
   */
  async publish(uid, title, description, images, longitude, latitude, startTime, endTime, peoples, deadline) {
    const event = await this.eventModel.publish({
      uid,
      title,
      description,
      images,
      longitude,
      latitude,
      startTime,
      endTime,
      peoples,
      deadline,
    });
    return event;
  }
};
