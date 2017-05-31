/**
 * 活动表
 */
const Base = requireBaseModel();
module.exports = class extends Base {
  /**
   * 发布一个活动
   * @param data 活动数据
   */
  async publish(data) {
    const event = await this.add(data);
    return event;
  }

  /**
   * 修改一个活动
   * @param eventId 活动id
   * @param data 要修改的数据
   */
  async update(eventId, data) {
    const event = await this.update({ _id: eventId }, { $set: data });
    return event;
  }

  /**
   * 获取一个活动
   * @param eventId 活动id
   */
  async getEvent(eventId) {
    const event = await this.findOne({ _id: eventId });
    return event;
  }
};
