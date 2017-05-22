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
    const ip = this.ip();
    const wxdata = await wechatSDK.wxLoginDataDataDecrypt(this.param());
    if (think.isEmpty(wxdata)) {
      return this.showError(E.USER.WXDATA_PARSE_ERROR);
    }

    const user = await this.userService.create(wxdata, ip);
    console.log(user);
    const token = await this.encryptToken(user);
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
