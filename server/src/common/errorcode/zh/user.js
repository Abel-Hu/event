/**
 * 用户模块错误码(200000)
 */
module.exports = {
  /**
   * 微信登录数据解析失败(200001)
   */
  WXDATA_PARSE_ERROR: new ErrorCode(200001, '微信登录数据解析失败'),
  /**
   * 用户token过期
   */
  TOKEN_EXPIRE: new ErrorCode(200002, '用户token过期'),
  /**
   * 用户不存在(200003)
   */
  NOT_EXISTS: new ErrorCode(200003, '用户不存在'),
};
