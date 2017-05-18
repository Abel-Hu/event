const Base = think.service('base', 'common');
module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);
  }

  /**
   * 爬虫入口
   */
  crawler() {
    this.LOG.warn('安居客。。。安居客。。。安居客。。。');
  }

  show() {
    const fang = this.model('fang');
    fang.save({ xxx: 1, tttt: 43 });
  }
};
