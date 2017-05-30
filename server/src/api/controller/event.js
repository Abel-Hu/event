const Base = requireBaseController();

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this);
  }

  /**
   * 用户发布活动
   */
  async publishAction() {
    return this.success(1);
  }
};
