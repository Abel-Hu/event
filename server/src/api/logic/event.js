module.exports = class extends think.logic.base {
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
  }
};
