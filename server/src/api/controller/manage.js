const Base = requireBaseController();

module.exports = class extends Base {
  init(...args) {
    super.init(...args);
  }

  /**
   * 用户列表
   */
  async userlistAction() {
    return this.success(1);
  }

  /**
   * 用户设大V
   */
  async usersetvAction() {
    return this.success(1);
  }

  /**
   * 用户撤销大V
   */
  async userremovevAction() {
    return this.success(1);
  }
};
