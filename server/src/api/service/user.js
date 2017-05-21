const Base = think.service('base', 'common');
module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);
  }

  /**
   * 创建用户
   * @param wxdata 微信小程序登录数据
   * @param ip 用户创建时获取到的ip
   */
  async create(wxdata, ip) {
    console.log(wxdata);
  }
};
