// const Base = requireBaseController();
// const qiniu = requireCommon('qiniu');
const jwtConfig = think.config('jwt');

module.exports = class extends think.controller.base {
  init(...args) {
    super.init(...args);
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
    console.log(1);
    console.log(this.file());
    // const file = this.file('file');
    // const filename = await qiniu.upload(file.path, 'event/');
    return this.success(1);
  }
};
