const Base = requireBaseController();
const wechatSDK = requireThirdparty('wechat');
module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    /*

    // 小程序解到的userinfo
    { nickName: '小丸子',
      gender: 1,
      language: 'zh_CN',
      city: 'Guangzhou',
      province: 'Guangdong',
      country: 'CN',
      avatarUrl: 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqSf82W4I6bFLIr40ko7VzNrPwicicVKpO0Vq9vscgfzuzeSxZ4Uic8Nu2Zzib1hnRJWLVfP6Y4GbdD4g/0'
    }

    */
  }

  async login() {
    await wechatSDK.wxLoginDataDataDecrypt(this.param());
  }
};
