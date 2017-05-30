module.exports = class extends think.logic.base {
  publishAction() {
    this.allowMethods = 'post';
    this.rules = {
      a: 'string'
    };
  }
};
