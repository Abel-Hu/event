const Base = requireBaseController();
module.exports = class extends Base {
  init(...args) {
    super.init(...args);
    this.whiteList = ['index'];
  }

  async indexAction() {
    return this.success('实业误国，炒楼兴邦');
  }
};
