const Base = requireBaseController();
const wechatSDK = requireThirdparty('wechat');
const jwtConfig = think.config('jwt');

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this);

    // 白名单
    this.whiteList = ['login'];
  }

  /**
   * 用户登录
   */
  async loginAction() {
    const ip = this.ip();
    //const wxdata = await wechatSDK.wxLoginDataDataDecrypt(this.param());
    const wxdata = (this.param());
    if (think.isEmpty(wxdata)) {
      return this.showError(ERROR.USER.WXDATA_PARSE_ERROR);
    }

    const user = await this.userService.create(wxdata, ip);
    think.extend(user, { env: think.env });
    think.extend(user, { token: await jwt.encrypt(user, jwtConfig.expire) });
    delete user.env;
    return this.success(user);
  }

  /**
   * 用户个人资料
   */
  async infoAction() {
    return this.success(this.member);
  }
};
