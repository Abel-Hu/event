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
};
