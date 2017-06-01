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
};
