const Base = requireBaseController();
module.exports = class extends Base {
  init(...args) {
    super.init(...args);
    this.whiteList = ['index'];
  }

  async indexAction() {
    return this.success('work hard! play hard!');
  }
};
