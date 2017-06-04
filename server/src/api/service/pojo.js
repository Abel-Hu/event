const Base = think.service('base', 'common');
const stringUtil = requireCommon('string');

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入model
    this.userModel = this.model('user');
    this.eventModel = this.model('event');
  }

  /**
   * 根据uid，获取userBase
   * @param uid 一堆uid
   */
  async makeUserBase(...uid) {
    if (think.isEmpty(uid)) {
      return [];
    }
    const promiseArray = uid.filter(v => !think.isEmpty(v)).map(v => this.userModel.findOne({ _id: v }));
    const matcher = ['nickName', 'sex', 'avatarUrl', 'isVip', 'description'];
    const promiseResult = await Promise.all(promiseArray);
    const list = promiseResult.map((user) => {
      if (think.isEmpty(user)) {
        return {};
      }
      const tmp = {};
      think.extend(tmp, { uid: user._id });
      matcher.filter((k) => {
        think.extend(tmp, { [k]: user[k] });
        return true;
      });
      return tmp;
    });
    return uid.length === 1 ? list[0] : list;
  }

  /**
   * 根据eventId，获取eventBase
   * @param eventId 一堆活动id
   */
  async makeEventBase(...eventId) {
    if (think.isEmpty(eventId)) {
      return [];
    }
    const promiseArray = eventId.filter(v => !think.isEmpty(v)).map(v => this.eventModel.findOne({ _id: v }));
    const matcher = ['title', 'images'];
    const promiseResult = await Promise.all(promiseArray);
    const list = promiseResult.map((event) => {
      if (think.isEmpty(event)) {
        return {};
      }
      const tmp = {};
      think.extend(tmp, { eventId: event._id });
      matcher.filter((k) => {
        think.extend(tmp, { [k]: stringUtil.isJSON(event[k]) ? JSON.parse(event[k])[0] : event[k] });
        return true;
      });
      think.extend(tmp, { image: tmp.images });
      delete tmp.images;
      return tmp;
    });
    return eventId.length === 1 ? list[0] : list;
  }
};
