const Base = think.service('base', 'common');

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this.controller);

    // 注入model
    this.userModel = this.model('user');
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
    const promiseArray = pageData.list.map(e => this.userService.getUserByUid(e._id));
    pageData.list = await Promise.all(promiseArray);
    return pageData;
  }
};
