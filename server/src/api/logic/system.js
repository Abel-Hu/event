const Base = requireBaseLogic();

module.exports = class extends Base {
  tokenAction() {
    this.allowMethods = 'post';
  }

  uploadAction() {
    this.allowMethods = 'put';
  }
};
