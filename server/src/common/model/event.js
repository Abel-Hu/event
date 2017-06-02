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
   * 活动详情
   */
  description: { type: String, default: '' },
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
   * 活动所在地址
   */
  address: { type: String, default: '' },
  /**
   * 活动开始时间
   */
  startTime: { type: mongoose.Types.Long, default: 0 },
  /**
   * 活动结束时间
   */
  endTime: { type: mongoose.Types.Long, default: 0 },
  /**
   * 活动状态(1-正常，0-下架)
   */
  status: { type: Number, default: 1 },
  /**
   * 看过的人数
   */
  uv: { type: Number, default: 0 },
  /**
   * 收藏人数
   */
  fav: { type: Number, default: 0 },
  /**
   * 分享的人数
   */
  share: { type: Number, default: 0 },
  /**
   * 实际报名人数
   */
  join: { type: Number, default: 0 },
  /**
   * 报名人数上限
   */
  joinLimit: { type: Number, default: 0 },
  /**
   * 报名截至时间
   */
  deadline: { type: mongoose.Types.Long, default: 0 },
};
