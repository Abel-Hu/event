module.exports = class extends think.logic.base {
  publishAction() {
    this.allowMethods = 'post';
    this.rules = {
      title: 'required|string',
      images: 'required|array|default:[]',
      longitude: 'required|float|min:-180|max:180',
      latitude: 'required|float|min:-90|max:90',
      startTime: 'required|string|after',
      peoples: 'required|int|min:1',
      deadline: 'required|string|after',
    };
  }
};
