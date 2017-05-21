const Base = think.service('base', 'common');
module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);
  }
};
