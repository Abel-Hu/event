const Base = requireBaseController();
const jwtConfig = think.config('jwt');

module.exports = class extends Base {
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
};
