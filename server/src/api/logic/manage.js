const Base = requireBaseLogic();

module.exports = class extends Base {
  userlistAction() {
    this.allowMethods = 'get';
    this.rules = {
      nickName: 'string',
      order: 'string|in:uid,eventPublishs,eventJoins|default:uid',
      by: 'string|in:asc,desc|default:desc',
    };
  }

  usersetvAction() {
    this.allowMethods = 'post';
    this.rules = {
      uid: 'required|string',
    };
  }

  userremovevAction() {
    this.allowMethods = 'post';
    this.rules = {
      uid: 'required|string',
    };
  }
};
