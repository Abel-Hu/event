// 用户表
module.exports = [
  /**
   * openId唯一索引
   */
  [{ openId: 1 }, { unique: true }],
  /**
   * 手机号唯一索引
   */
  [{ mobile: 1 }, { unique: true }],
];
