// 活动表
require('mongoose-long')(mongoose);

module.exports = {
  /**
   * 发布用户的uid
   */
  uid: { type: String, default: '' },
  /**
   * 活动标题
   */
  title: { type: String, default: '' },
  /**
   * 活动图片
   */
  images: { type: String, default: '[]' },
  /**
   * 活动所在地点的经度
   */
  longitude: { type: Number, default: null },
  /**
   * 活动所在地点的纬度
   */
  latitude: { type: Number, default: null },
  /**
   * 活动开始时间
   */
  startTime: { type: mongoose.Types.Long, default: 0 },
  /**
   * 报名人数上限
   */
  peoples: { type: Number, default: 0 },
  /**
   * 报名截至时间
   */
  deadline: { type: mongoose.Types.Long, default: 0 },
};
