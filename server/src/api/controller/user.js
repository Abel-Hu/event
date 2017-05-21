const Base = requireBaseController();
const wechatSDK = requireThirdparty('wechat');
module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api');

    // 白名单
    this.whiteList = ['login'];
  }

  /**
   * 用户登录
   */
  async loginAction() {
    const { ip } = this.param();
    const wxdata = await wechatSDK.wxLoginDataDataDecrypt(this.param());
    if (think.isEmpty(wxdata)) {
      return this.showError(E.USER.WXDATA_PARSE_ERROR);
    }

    await this.userService.create(wxdata, ip);
    const token = await this.encryptToken(wxdata);
    wxdata.token = token;
    return this.success(wxdata);
  }
};
