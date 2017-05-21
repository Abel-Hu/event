/**
 * 系统模块错误码(1xxxxx)
 */
module.exports = {
  /**
   * 系统代码错误(100001)
   */
  SYSTEM_ERROR: new ErrorCode(100001, '系统代码错误'),
  /**
   * 无效链接(100002)
   */
  SYSTEM_NOT_FIND_URL_ERROR: new ErrorCode(100002, '系统无效链接'),
  /**
   * 找不到相应权限，请重试(100003)
   */
  SYSTEM_NOT_FIND_RESPONSE_ERROR: new ErrorCode(100003, '找不到相应权限，请重试'),
  /**
   * 请求失败，请稍后再试(100004)
   */
  SYSTEM_REQUEST_FAILE_ERROR: new ErrorCode(100004, '请求失败，请稍后再试'),
  /**
   * 请求的参数不能为空(100005)
   */
  SYSTEM_REQUEST_PARAMS_CAN_NOT_EMPTY_ERROR: new ErrorCode(100005, '请求的参数不能为空'),
  /**
   * 请求参数错误(100006)
   */
  SYSTEM_REQUEST_PARAMS_ERROR: new ErrorCode(100006, '请求参数错误'),
};
