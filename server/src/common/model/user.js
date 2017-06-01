// 用户表
module.exports = {
  /**
   * 用户昵称(取微信的)
   */
  nickName: { type: String, default: '' },
  /**
   * 微信小程序第三方id
   */
  openId: { type: String, default: '' },
  /**
   * 用户头像(取微信的)
   */
  avatarUrl: { type: String, default: '' },
  /**
   * 个性签名
   */
  description: { type: String, default: '' },
  /**
   * 用户性别(1-男 2-女)
   */
  sex: { type: Number, default: 2 },
  /**
   * 用户生日
   */
  birthday: { type: String, default: '' },
  /**
   * 是否为大V用户
   */
  isVip: { type: Boolean, default: false },
  /**
   * 用户手机
   */
  mobile: { type: String, default: '' },
  /**
   * 发布的活动数
   */
  eventPublishs: { type: Number, default: 0 },
  /**
   * 参加的活动数
   */
  eventJoins: { type: Number, default: 0 },
  /**
   * 用户注册时的ip
   */
  ip: { type: String, default: '' },
};
