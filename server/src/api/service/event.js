const Base = think.service('base', 'common');
const timeUtil = requireCommon('time');
const stringUtil = requireCommon('string');

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this.controller);
    this.pojoService = requireService('pojo', 'api', this.controller);

    // 注入model
    this.eventModel = this.model('event');
    this.eventFavModel = this.model('event_fav');
    this.eventJoinModel = this.model('event_join');
    this.eventUvModel = this.model('event_uv');
    this.eventShareModel = this.model('event_share');
    this.eventCommentModel = this.model('event_comment');
  }

  /**
   * 发布一个活动
   * @param uid 发布用户id
   * @param title 活动标题
   * @param description 活动详情
   * @param images 活动图片
   * @param longitude 活动所在地点的经度
   * @param latitude 活动所在地点的纬度
   * @param address 活动所在地址
   * @param startTime 活动开始时间
   * @param endTime 活动结束时间
   * @param joinLimit 报名人数上限
   * @param deadline 报名截至时间
   */
  async publish(uid, title, description, images, longitude, latitude, address, startTime, endTime, joinLimit, deadline) {
    const event = await this.eventModel.add({
      uid,
      title,
      description,
      images,
      longitude,
      latitude,
      address,
      startTime: timeUtil.str2time(startTime),
      endTime: timeUtil.str2time(endTime),
      joinLimit,
      deadline: timeUtil.str2time(deadline),
    });
    event.eventId = event._id;
    delete event._id;

    // 发布成功，用户发布活动数+1
    const userEventPublishs = await this.userService.incrEventPublishs(uid);
    event.userEventPublishs = userEventPublishs;
    return event;
  }

  /**
   * 修改一个活动
   * @param eventId 活动id
   * @param data 要修改的数据
   */
  async update(eventId, data) {
    const event = this.eventModel.update({ _id: eventId }, { $set: data });
    return event;
  }

  /**
   * 获取一个活动
   * @param eventId 活动id
   */
  async getEvent(eventId) {
    const event = this.eventModel.findOne({ _id: eventId });
    event.eventId = event._id;
    delete event._id;
    return event;
  }

  /**
   * 收藏活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventFav(uid, eventId) {
    const fav = await this.eventFavModel.add({ uid, eventId });
    if (!think.isEmpty(fav)) {
      await this.incrFavs(eventId);
    }
  }

  /**
   * 取消收藏活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventUnfav(uid, eventId) {
    const result = await this.eventFavModel.remove({ uid, eventId });
    if (result.ok === 1) {
      await this.decrFavs(eventId);
    }
  }

  /**
   * 判断是否有收藏此活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventHasFav(uid, eventId) {
    const fav = await this.eventFavModel.findOne({ uid, eventId });
    return !think.isEmpty(fav);
  }

  /**
   * 报名活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventJoin(uid, eventId) {
    await this.eventJoinModel.add({ uid, eventId });
  }

  /**
   * 判断是否有报名此活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventHasJoin(uid, eventId) {
    const join = await this.eventJoinModel.findOne({ uid, eventId });
    return !think.isEmpty(join);
  }

  /**
   * 增加活动的收藏数量
   * @param eventId 活动id
   * @param fav 增加的收藏数量
   */
  async incrFavs(eventId, fav = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { fav });
    return result.fav || 0;
  }

  /**
   * 减少活动的收藏数量
   * @param eventId 活动id
   * @param fav 减少的收藏数量
   */
  async decrFavs(eventId, fav = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { fav: -Math.abs(fav) });
    return result.fav || 0;
  }

  /**
   * 增加活动的uv数量
   * @param eventId 活动id
   * @param uv 增加的uv数量
   */
  async incrUvs(eventId, uv = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { uv });
    return result.uv || 0;
  }

  /**
   * 判断是否看过此活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventHasView(uid, eventId) {
    const view = await this.eventUvModel.findOne({ uid, eventId });
    return !think.isEmpty(view);
  }

  /**
   * 增加活动的分享数量
   * @param eventId 活动id
   * @param share 增加的分享数量
   */
  async incrShares(eventId, share = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { share });
    return result.share || 0;
  }

  /**
   * 减少活动的分享数量
   * @param eventId 活动id
   * @param share 减少的分享数量
   */
  async decrShares(eventId, share = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { share: -Math.abs(share) });
    return result.share || 0;
  }

  /**
   * 判断是否分享过此活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventHasShare(uid, eventId) {
    const share = await this.eventShareModel.findOne({ uid, eventId });
    return !think.isEmpty(share);
  }

  /**
   * 记录分享过此活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventShare(uid, eventId) {
    const share = await this.eventShareModel.add({ uid, eventId });
    if (!think.isEmpty(share)) {
      await this.incrShares(eventId);
    }
  }

  /**
   * 增加活动的报名数量
   * @param eventId 活动id
   * @param join 增加的报名数量
   */
  async incrJoins(eventId, join = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { join });
    return result.join || 0;
  }

  /**
   * 减少活动的报名数量
   * @param eventId 活动id
   * @param join 减少的报名数量
   */
  async decrJoins(eventId, join = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { join: -Math.abs(join) });
    return result.join || 0;
  }

  /**
   * 增加活动的评论数量
   * @param eventId 活动id
   * @param comment 增加的评论数量
   */
  async incrComment(eventId, comment = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { comment });
    return result.comment || 0;
  }

  /**
   * 减少活动的评论数量
   * @param eventId 活动id
   * @param comment 减少的评论数量
   */
  async decrComment(eventId, comment = 1) {
    const result = await this.eventModel.incr({ _id: eventId }, { comment: -Math.abs(comment) });
    return result.comment || 0;
  }

  /**
   * 发表评论
   * @param uid 用户id
   * @param eventId 活动id
   * @param replyUid 回复的用户id
   * @param content 评论内容
   * @returns {Promise.<void>}
   */
  async addComment(uid, eventId, replyUid, content) {
    const comment = await this.eventCommentModel.add({ uid, eventId, replyUid, content });
    comment.commentId = comment._id;
    delete comment._id;
    await this.incrComment(eventId);
    return comment;
  }

  /**
   * 获取评论
   * @param commentId 评论id
   */
  async getComment(commentId) {
    const comment = await this.eventCommentModel.findOne({ _id: commentId });
    return comment;
  }

  /**
   * 删除评论
   * @param eventId 活动id
   * @param commentId 评论id
   */
  async deleteComment(eventId, commentId) {
    const result = await this.eventCommentModel.remove({ _id: commentId });
    if (result.ok === 1) {
      await this.decrComment(eventId);
    }
  }

  /**
   * 活动列表
   * @param uid 用户id
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async eventList(uid, lastSequence = '', headSequence = '', pageSize = 30) {
    const pageData = await this.eventModel.cursorPage({}, lastSequence, headSequence, pageSize);
    pageData.list = pageData.list.map(async (e) => {
      const event = {};
      event.eventId = e._id;
      event.title = e.title;
      event.image = JSON.parse(e.images)[0];
      event.isFav = await this.eventHasFav(uid, event.eventId);
      event.join = e.join;
      event.joinList = await this.eventJoinList(event.eventId, '', '', 10);
      return event;
    });
    return pageData;
  }

  /**
   * 活动收藏列表
   * @param eventId 活动id
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async eventFavList(eventId, lastSequence = '', headSequence = '', pageSize = 30) {
    const pageData = await this.eventFavModel.cursorPage({ eventId }, lastSequence, headSequence, pageSize);
    const uidList = pageData.list.map(e => e.uid);
    pageData.list = await this.pojoService.makeUserBase(uidList);
    return pageData;
  }

  /**
   * 活动报名列表
   * @param eventId 活动id
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async eventJoinList(eventId, lastSequence = '', headSequence = '', pageSize = 30) {
    const pageData = await this.eventJoinModel.cursorPage({ eventId }, lastSequence, headSequence, pageSize);
    const uidList = pageData.list.map(e => e.uid);
    pageData.list = await this.pojoService.makeUserBase(uidList);
    return pageData;
  }

  /**
   * 活动分享列表
   * @param eventId 活动id
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async eventShareList(eventId, lastSequence = '', headSequence = '', pageSize = 30) {
    const pageData = await this.eventShareModel.cursorPage({ eventId }, lastSequence, headSequence, pageSize);
    const uidList = pageData.list.map(e => e.uid);
    pageData.list = await this.pojoService.makeUserBase(uidList);
    return pageData;
  }

  /**
   * 活动列表
   * @param eventId 活动id
   * @param lastSequence 上一页游标
   * @param headSequence 顶部游标
   * @param pageSize 页面大小
   */
  async eventCommentList(eventId, lastSequence = '', headSequence = '', pageSize = 30) {
    const pageData = await this.eventCommentModel.cursorPage({ eventId }, lastSequence, headSequence, pageSize);
    const userList = await this.pojoService.makeUserBase(pageData.list.map(e => e.uid));
    const replyUserList = await this.pojoService.makeUserBase(pageData.list.map(e => e.replyUid));
    let i = -1;

    pageData.list = pageData.list.map((v) => {
      const comment = {};
      i += 1;
      think.extend(comment, { userBase: userList[i] });
      think.extend(comment, { replyUserBase: replyUserList[i] });
      think.extend(comment, { commentId: v.commentId });
      think.extend(comment, { content: v.content });
      think.extend(comment, { createTime: v.createTime });
      return comment;
    });
    return pageData;
  }
};
