/**
 * 活动模块错误码(300000)
 */
module.exports = {
  /**
   * 活动时间设置错误(300001)
   */
  TIME_ERROR: new ErrorCode(300001, '活动的开始时间不能小于等于结束时间'),
  /**
   * 只有认证用户才可以发布活动(300002)
   */
  ONLY_VIP_CAN_PUBLISH: new ErrorCode(300002, '只有认证用户才可以发布活动'),
};
