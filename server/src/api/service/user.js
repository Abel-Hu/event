const Base = think.service('base', 'common');
const vipConfig = think.config('vip') || [];
module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入model
    this.userModel = this.model('user');
  }

  /**
   * 创建用户
   * @param wxdata 微信小程序登录数据
   * @param ip 用户创建时获取到的ip
   */
  async create(wxdata, ip) {
    // 如果数据库有就不要创建了
    let user = await this.userModel.getUserByOpenId(wxdata.openId);
    if (think.isEmpty(user)) {
      user = wxdata;
      user.ip = ip;
      user.isVip = vipConfig.indexOf(user.openId) > -1;
      user = await this.userModel.create(user);
    }
    user = JSON.parse(JSON.stringify(user));
    user.uid = user._id;
    delete user._id;
    return user;
  }
};
