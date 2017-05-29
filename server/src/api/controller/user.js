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

  async tAction() {
    console.log(111);
    return this.success(1);
  }

  /**
   * 用户登录
   */
  async loginAction() {
    const ip = this.ip();
    const wxdata = await wechatSDK.wxLoginDataDataDecrypt(this.param());
    if (think.isEmpty(wxdata)) {
      return this.showError(ERROR.USER.WXDATA_PARSE_ERROR);
    }

    const user = await this.userService.create(wxdata, ip);
    user.env = think.env;
    const token = await think.jwt.encrypt(user, jwtConfig.expire);
    const member = {};
    ['_id', 'nickName', 'avatarUrl', 'isVip'].filter((k) => {
      member[k] = user[k];
      return true;
    });
    member.token = token;
    member.uid = member._id;
    delete member._id;
    return this.success(member);
  }
};
