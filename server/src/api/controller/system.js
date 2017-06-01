const Base = requireBaseController();
// const qiniu = requireCommon('qiniu');
const jwtConfig = think.config('jwt');

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    this.whiteList = ['upload'];
  }

  /**
   * 验证token
   */
  async tokenAction() {
    const token = await jwt.encrypt({ uid: this.member.uid, env: think.env }, jwtConfig.expire);
    return this.success(token);
  }

  /**
   * 上传文件
   */
  async uploadAction() {
    console.log(this.file());
    // const filename = await qiniu.upload('E:\\1.jpg','event/');
    return this.success(1);
  }
};
