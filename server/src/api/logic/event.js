const timeUtil = requireCommon('time');
const Base = requireBaseLogic();

module.exports = class extends Base {
  publishAction() {
    this.allowMethods = 'post';
    this.rules = {
      title: 'required|string',
      description: 'required|string',
      images: 'required|array',
      longitude: 'required|float:-180,180',
      latitude: 'required|float:-90,90',
      address: 'required|string',
      startTime: 'required|string|after',
      endTime: 'required|string|after',
      joinLimit: 'required|int|min:0',
      deadline: 'required|string|after',
    };

    // 开始时间不能小于等于结束时间
    const startTime = this.param('startTime');
    const endTime = this.param('endTime');
    const st = timeUtil.str2time(startTime);
    const et = timeUtil.str2time(endTime);
    if (st >= et) {
      this.LOG.warn(`publish | startTime can not less then endTime, startTime: ${startTime}, endTime: ${endTime}`);
      return this.showError(ERROR.EVENT.TIME_ERROR);
    }

    this.rules.startTime = timeUtil.str2time(this.rules.startTime);
    this.rules.endTime = timeUtil.str2time(this.rules.endTime);
    this.rules.deadline = timeUtil.str2time(this.rules.deadline);
    return true;
  }

  updateAction() {
    this.allowMethods = 'post';
    this.rules = {
      eventId: 'required|string',
      title: 'required|string',
      description: 'required|string',
      images: 'required|array',
      longitude: 'required|float:-180,180',
      latitude: 'required|float:-90,90',
      address: 'required|string',
      startTime: 'required|string|after',
      endTime: 'required|string|after',
      joinLimit: 'required|int|min:0',
      deadline: 'required|string|after',
    };

    // 开始时间不能小于等于结束时间
    const startTime = this.param('startTime');
    const endTime = this.param('endTime');
    const st = timeUtil.str2time(startTime);
    const et = timeUtil.str2time(endTime);
    if (st >= et) {
      this.LOG.warn(`update | startTime can not less then endTime, startTime: ${startTime}, endTime: ${endTime}`);
      return this.showError(ERROR.EVENT.TIME_ERROR);
    }

    return true;
  }

  infoAction() {
    this.allowMethods = 'get';
    this.rules = {
      eventId: 'required|string',
    };
  }

  listAction() {
    this.allowMethods = 'get';
  }

  favAction() {
    this.allowMethods = 'post';
    this.rules = {
      eventId: 'required|string',
    };
  }

  unfavAction() {
    this.allowMethods = 'post';
    this.rules = {
      eventId: 'required|string',
    };
  }

  joinAction() {
    this.allowMethods = 'post';
    this.rules = {
      eventId: 'required|string',
    };
  }

  /**
   * 发表评论
   */
  commentaddAction() {
    this.allowMethods = 'post';
    this.rules = {
      eventId: 'required|string',
      content: 'required|string',
      replyUid: 'string',
    };
  }

  /**
   * 删除评论
   */
  commentdelAction() {
    this.allowMethods = 'post';
    this.rules = {
      commentId: 'required|string',
    };
  }

  /**
   * 评论列表
   */
  commentlistAction() {
    this.allowMethods = 'get';
    this.rules = {
      eventId: 'required|string',
    };
  }

  /**
   * 活动的报名列表
   */
  joinlistAction() {
    this.allowMethods = 'get';
    this.rules = {
      eventId: 'required|string',
    };
  }

  /**
   * 分享上报
   */
  shareAction() {
    this.allowMethods = 'post';
    this.rules = {
      eventId: 'required|string',
    };
  }
};
