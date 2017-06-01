const Base = requireBaseController();
const qiniu = requireCommon('qiniu');
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
    const file = this.file('file');
    console.log(file);
    const filename = await qiniu.upload(file.path,'event/');
    return this.success(filename);
  }
};
