const Base = requireBaseController();

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this);
    this.pojoService = requireService('pojo', 'api', this);
    this.eventService = requireService('event', 'api', this);
  }

  /**
   * 活动权限前置检查
   */
  async __before() {
    await super.__before();
    if (['publish', 'update'].indexOf(this.http.action) <= -1) {
      return true;
    }

    // 只有大V才可以发布活动
    const user = await this.userService.getUserByUid(this.member.uid);
    if (!user.isVip) {
      return this.showError(ERROR.EVENT.ONLY_VIP_CAN_PUBLISH);
    }

    return true;
  }

  /**
   * 用户发布活动
   */
  async publishAction() {
    const title = this.param('title');
    const description = this.param('description');
    const images = JSON.stringify(this.param('images'));
    const longitude = this.param('longitude');
    const latitude = this.param('latitude');
    const address = this.param('address');
    const startTime = this.param('startTime');
    const endTime = this.param('endTime');
    const joinLimit = this.param('joinLimit');// 0为不限制
    const deadline = this.param('deadline');
    const event = await this.eventService.publish(this.member.uid, title, description, images, longitude, latitude, address, startTime, endTime, joinLimit, deadline);
    return this.success({ eventId: event.eventId, userEventPublishs: event.userEventPublishs });
  }

  /**
   * 用户修改活动
   */
  async updateAction() {
    const eventId = this.param('eventId');
    const title = this.param('title');
    const description = this.param('description');
    const images = JSON.stringify(this.param('images'));
    const longitude = this.param('longitude');
    const latitude = this.param('latitude');
    const address = this.param('address');
    const startTime = this.param('startTime');
    const endTime = this.param('endTime');
    const joinLimit = this.param('joinLimit');// 0为不限制，只可增多，不可减少
    const deadline = this.param('deadline');

    // 判断活动是否存在
    const event = await this.eventService.getEvent(eventId);
    if (think.isEmpty(event)) {
      return this.showError(ERROR.EVENT.NOT_EXISTS);
    }

    // 报名人数限制，只可增多，不可减少
    let b = false;
    b = b || (event.joinLimit === 0 && joinLimit > 0);
    b = b || (event.joinLimit > 0 && joinLimit < event.joinLimit);
    if (b) {
      return this.showError(ERROR.EVENT.JOIN_LIMIT_ONLY_CAN_INCREMENT);
    }

    await this.eventService.update(eventId, { title, description, images, longitude, latitude, address, startTime, endTime, joinLimit, deadline });
    return this.success(1);
  }

  /**
   * 活动详情
   */
  async infoAction() {
    // 判断活动是否存在
    const eventId = this.param('eventId');
    const event = await this.eventService.getEvent(eventId);
    if (think.isEmpty(event)) {
      return this.showError(ERROR.EVENT.NOT_EXISTS);
    }

    // 统计uv
    const b = await this.eventService.eventHasView(this.member.uid, eventId);
    if (!b) {
      await this.eventService.incrUvs(this.member.uid, eventId);
    }

    // 并行获取
    const [
      userBase,
      isFav,
      joinList,
      favList,
      commentList,
    ] = await Promise.all([
      this.pojoService.makeUserBase(event.uid),
      this.eventService.eventHasFav(this.member.uid, eventId),
      this.eventService.eventJoinList(eventId, '', '', 10),
      this.eventService.eventFavList(eventId, '', '', 10),
      this.eventService.eventCommentList(eventId, '', '', 11),
    ]);

    // 返回结果
    const info = {};
    think.extend(info, { title: event.title });
    think.extend(info, { description: event.description });
    think.extend(info, { images: JSON.parse(event.images) });
    think.extend(info, { userBase });
    think.extend(info, { longitude: event.longitude });
    think.extend(info, { latitude: event.latitude });
    think.extend(info, { address: event.address });
    think.extend(info, { createTime: event.createTime });
    think.extend(info, { startTime: event.startTime });
    think.extend(info, { endTime: event.endTime });
    think.extend(info, { isFav });
    think.extend(info, { fav: event.fav });
    think.extend(info, { uv: event.uv });
    think.extend(info, { share: event.share });
    think.extend(info, { comment: event.comment });
    think.extend(info, { join: event.join });
    think.extend(info, { joinLimit: event.joinLimit });
    think.extend(info, { joinList: joinList.list });
    think.extend(info, { favList: favList.list });
    think.extend(info, { lastCommentSequence: commentList.lastSequence });
    think.extend(info, { commentList: commentList.list });
    return this.success(info);
  }

  /**
   * 首页活动列表
   */
  async listAction() {
    const lastSequence = this.lastSequence();
    const headSequence = this.headSequence();
    const pageSize = this.pageSize();

    const pageData = await this.eventService.eventList(this.member.uid, lastSequence, headSequence, pageSize);
    return this.cursorPage(pageData);
  }

  /**
   * 收藏活动
   */
  async favAction() {
    // 判断活动是否存在
    const eventId = this.param('eventId');
    const event = await this.eventService.getEvent(eventId);
    if (think.isEmpty(event)) {
      return this.showError(ERROR.EVENT.NOT_EXISTS);
    }

    // 判断是否收藏这个活动
    const b = await this.eventService.eventHasFav(this.member.uid, eventId);
    if (b) {
      return this.showError(ERROR.EVENT.HAS_FAV);
    }

    await this.eventService.eventFav(this.member.uid, eventId);
    return this.success(1);
  }

  /**
   * 取消收藏活动
   */
  async unfavAction() {
    // 判断活动是否存在
    const eventId = this.param('eventId');
    const event = await this.eventService.getEvent(eventId);
    if (think.isEmpty(event)) {
      return this.showError(ERROR.EVENT.NOT_EXISTS);
    }

    // 判断是否收藏这个活动
    const b = await this.eventService.eventHasFav(this.member.uid, eventId);
    if (!b) {
      return this.showError(ERROR.EVENT.HAS_NOT_FAV);
    }

    await this.eventService.eventUnfav(this.member.uid, eventId);
    return this.success(1);
  }

  /**
   * 报名参加活动
   */
  async joinAction() {
    // 判断活动是否存在
    const eventId = this.param('eventId');
    const event = await this.eventService.getEvent(eventId);
    if (think.isEmpty(event)) {
      return this.showError(ERROR.EVENT.NOT_EXISTS);
    }

    // 判断报名人数是否已满
    // 先加1，如果加了没超过上限，证明是可以报名的
    const joins = await this.eventService.incrJoins(eventId);
    if (event.joinLimit > 0 && joins > event.joinLimit) {
      // 由于是先加的，所以要减回来
      await this.eventService.decrJoins(eventId);
      return this.showError(ERROR.EVENT.IS_FULL_OF_PEOPLE);
    }

    // 是否已报名
    const b = await this.eventService.eventHasJoin(this.member.uid, eventId);
    if (b) {
      // 由于是先加的，所以要减回来
      await this.eventService.decrJoins(eventId);
      return this.showError(ERROR.EVENT.HAS_JOIN);
    }

    await this.eventService.eventJoin(this.member.uid, eventId);
    return this.success(1);
  }

  /**
   * 发表评论
   */
  async commentaddAction() {
    const eventId = this.param('eventId');
    const replyUid = this.param('replyUid') || '';
    const content = this.param('content');
    const comment = {};

    const [
      tmp,
      userBases,
    ] = await Promise.all([
      this.eventService.addComment(this.member.uid, eventId, replyUid, content),
      this.pojoService.makeUserBase(this.member.uid, replyUid),
    ]);

    think.extend(comment, { userBase: userBases[0] });
    think.extend(comment, { replyUserBase: userBases.length > 1 ? userBases[2] : {} });
    think.extend(comment, { commentId: tmp.commentId });
    think.extend(comment, { content: tmp.content });
    think.extend(comment, { createTime: tmp.createTime });
    return this.success(comment);
  }

  /**
   * 删除评论
   */
  async commentdelAction() {
    const commentId = this.param('commentId');
    const comment = await this.eventService.getComment(commentId);
    if (think.isEmpty(comment)) {
      return this.showError(ERROR.EVENT.COMMENT_NOT_EXISTS);
    }

    // 不是自己发的评论不可以删除
    if (comment.uid !== this.member.uid) {
      return this.showError(ERROR.EVENT.COMMENT_NOT_PUBLISH_BY_ME);
    }

    await this.eventService.deleteComment(comment.eventId, commentId);
    return this.success(1);
  }

  /**
   * 评论列表
   */
  async commentlistAction() {
    const eventId = this.param('eventId');
    const lastSequence = this.lastSequence();
    const headSequence = this.headSequence();
    const pageSize = this.pageSize();

    const pageData = await this.eventService.eventCommentList(eventId, lastSequence, headSequence, pageSize);
    return this.cursorPage(pageData);
  }

  /**
   * 报名列表
   */
  async joinlistAction() {
    const eventId = this.param('eventId');
    const lastSequence = this.lastSequence();
    const headSequence = this.headSequence();
    const pageSize = this.pageSize();

    const pageData = await this.eventService.eventJoinList(eventId, lastSequence, headSequence, pageSize);
    return this.cursorPage(pageData);
  }

  /**
   * 分享上报
   */
  async shareAction() {
    // 判断有无记录过分享，有就记录，无论如何都正确
    const eventId = this.param('eventId');
    const b = await this.eventService.eventHasShare(this.member.uid, eventId);
    if (!b) {
      await this.eventService.eventShare(this.member.uid, eventId);
    }
    return this.success(1);
  }
};
