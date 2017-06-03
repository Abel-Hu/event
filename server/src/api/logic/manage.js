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

  userupdateAction() {
    this.allowMethods = 'post';
    this.rules = {
      uid: 'required|string',
      isVip: 'string|in:true,false',
    };
  }
};
