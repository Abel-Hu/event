const Base = think.service('base', 'common');
const timeUtil = requireCommon('time');

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this.controller);

    // 注入model
    this.eventModel = this.model('event');
    this.eventFavModel = this.model('event_fav');
  }

  /**
   * 发布一个活动
   * @param uid 发布用户id
   * @param title 活动标题
   * @param description 活动详情
   * @param images 活动图片
   * @param longitude 活动所在地点的经度
   * @param latitude 活动所在地点的纬度
   * @param startTime 活动开始时间
   * @param endTime 活动结束时间
   * @param joinLimit 报名人数上限
   * @param deadline 报名截至时间
   */
  async publish(uid, title, description, images, longitude, latitude, startTime, endTime, joinLimit, deadline) {
    const event = await this.eventModel.add({
      uid,
      title,
      description,
      images,
      longitude,
      latitude,
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
    return event;
  }

  /**
   * 收藏活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventFav(uid, eventId) {
    const fav = await this.eventModel.add({ uid, eventId });
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
    const result = await this.eventModel.remove({ uid, eventId });
    if (result) {
      await this.decrFavs(eventId);
    }
  }

  /**
   * 判断是否有收藏此活动
   * @param uid 用户id
   * @param eventId 活动id
   */
  async eventHasFav(uid, eventId) {
    const fav = await this.eventModel.findOne({ uid, eventId });
    return !think.isEmpty(fav);
  }

  /**
   * 给活动的收藏数量增加1
   * @param eventId 活动id
   */
  async incrFavs(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { fav: 1 });
    return result.fav || 0;
  }

  /**
   * 给活动的收藏数量减少1
   * @param eventId 活动id
   */
  async decrFavs(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { fav: -1 });
    return result.fav || 0;
  }

  /**
   * 给活动的uv数量增加1
   * @param eventId 活动id
   */
  async incrUvs(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { uv: 1 });
    return result.uv || 0;
  }

  /**
   * 给活动的uv数量减少1
   * @param eventId 活动id
   */
  async decrUvs(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { uv: -1 });
    return result.uv || 0;
  }


  /**
   * 给活动的分享数量增加1
   * @param eventId 活动id
   */
  async incrShares(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { share: 1 });
    return result.share || 0;
  }

  /**
   * 给活动的分享数量减少1
   * @param eventId 活动id
   */
  async decrShares(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { share: -1 });
    return result.share || 0;
  }


  /**
   * 给活动的报名数量增加1
   * @param eventId 活动id
   */
  async incrJoins(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { join: 1 });
    return result.join || 0;
  }

  /**
   * 给活动的报名数量减少1
   * @param eventId 活动id
   */
  async decrJoins(eventId) {
    const result = await this.eventModel.incr({ _id: eventId }, { join: -1 });
    return result.join || 0;
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
      event.joinList = [{
        uid: '5921d4c6ea3',
        nickName: '小丸子',
        description: '刷锅一枚',
        sex: 2,
        avatarUrl: 'http://xx/0',
        isVip: true,
      }, {
        uid: '5921d4c6ea3',
        nickName: '小丸子',
        description: '刷锅一枚',
        sex: 2,
        avatarUrl: 'http://xx/0',
        isVip: true,
      }];
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
    const pageData = await this.eventModel.cursorPage({ _id: eventId }, lastSequence, headSequence, pageSize);
    return pageData;
  }
};
