module.exports = class extends think.logic.base {
  loginAction() {
    this.allowMethods = 'post';
    this.rules = {
      code: 'required|string',
      iv: 'required|string',
      rawData: 'required|string',
      encryptedData: 'required|string',
    };
  }

  infoAction() {
    this.allowMethods = 'get';
  }
};
