const timeUtil = requireCommon('time');

module.exports = class extends think.logic.base {
  init(...arg) {
    super.init(...arg);

    // 自动切换日志log日志频道
    this.LOG = getLogger(`${this.http.module}.${this.http.controller}.${this.http.action}`);
  }

  /**
   * 输出报错
   * @param error 错误枚举对象
   */
  showError(error) {
    const data = {};
    const lang = this.lang();
    data.code = error[lang].getCode();
    data.message = error[lang].getMessage();
    data.time = timeUtil.nowMillisecond();
    this.type(this.config('json_content_type'));

    // 返回数据打log
    const returnData = JSON.stringify(data);
    const LOG = getLogger(__filename);
    LOG.debug(`response data, size: ${this.getSize(returnData.length)}, data: ${returnData}`);
    return this.json(data);
  }

  /**
   * 根据传进来的大小选择最适合的单位
   * @param size
   */
  getSize(size) {
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = parseInt(Math.floor(Math.log(size) / Math.log(1024)), 10);
    return `${Math.floor(size / (1024 ** i))} ${sizes[i]}`;
  }
};
