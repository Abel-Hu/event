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
    const user = await this.userModel.getUserByOpenId(wxdata.openId);
    if (!think.isEmpty(user)) {
      return user;
    }

    const tmp = wxdata;
    tmp.ip = ip;
    tmp.isVip = vipConfig.indexOf(tmp.openId) > -1;
    await this.userModel.create(tmp);
    return tmp;
  }
};
