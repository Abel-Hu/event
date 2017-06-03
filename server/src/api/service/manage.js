const Base = think.service('base', 'common');

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this.controller);

    // 注入model
    this.userModel = this.model('user');
    this.eventModel = this.model('event');
  }

  /**
   * 用户列表
   * @param condition 查询条件
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   * @param sort 排序规则
   */
  async userList(condition, lastSequence = '', headSequence = '', pageSize = 30, sort = { _id: -1 }) {
    const pageData = await this.userModel.cursorPage(condition, lastSequence, headSequence, pageSize, sort);
    pageData.list = pageData.list.map((e) => {
      const user = e;
      user.uid = user._id;
      delete user._id;
      delete user.openId;
      return user;
    });
    return pageData;
  }

  /**
   * 活动列表
   * @param condition 查询条件
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   * @param sort 排序规则
   */
  async eventList(condition, lastSequence = '', headSequence = '', pageSize = 30, sort = { _id: -1 }) {
    const pageData = await this.eventModel.cursorPage(condition, lastSequence, headSequence, pageSize, sort);
    pageData.list = pageData.list.map((e) => {
      const event = e;
      event.eventId = event._id;
      event.image = JSON.parse(event.images)[0];
      delete event._id;
      delete event.images;
      return event;
    });
    return pageData;
  }
};
