const Base = requireBaseLogic();

module.exports = class extends Base {
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

  updateAction() {
    this.allowMethods = 'post';
    this.rules = {
      nickName: 'string',
      mobile: 'string|mobile:zh-CN',
      birthday: 'string|before',
      sex: 'int|in:1,2',
      description: 'string',
    };
  }

  joinlistAction() {
    this.allowMethods = 'get';
  }
};
