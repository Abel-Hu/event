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

  eventlistAction() {
    this.allowMethods = 'get';
    this.rules = {
      title: 'string',
      order: 'string|in:eventId,join,share,uv,comment|default:eventId',
      by: 'string|in:asc,desc|default:desc',
    };
  }

  eventupdateAction() {
    this.allowMethods = 'post';
    this.rules = {
      eventId: 'required|string',
      status: 'int|in:1,0',
    };
  }
};
