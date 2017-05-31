const timeUtil = requireCommon('time');

module.exports = class extends think.controller.base {

  init(...arg) {
    super.init(...arg);

    // 自动切换日志log日志频道
    this.LOG = getLogger(`${this.http.module}.${this.http.controller}.${this.http.action}`);

    // 不让服务器信息暴露出去
    this.http.res.removeHeader('x-powered-by');

    // 自动获取语言
    this.lang(this.header('lang').trim() || think.config('locale').default);

    const method = this.http.method.toLowerCase();
    this.LOG.debug(`method: ${method}, url: ${this.http.url}`);
    this.LOG.debug(`request header: ${JSON.stringify(this.header())}`);
    this.LOG.debug(`request data: ${JSON.stringify(this.param())}`);

    // 跨域
    this.header('Access-Control-Allow-Origin', '*');
    this.header('Access-Control-Allow-Headers', 'x-requested-with,token,lang');
    this.header('Access-Control-Expose-Headers', 'token');
    if (method === 'options') {
      this.end();
      return;
    }

    // 会员对象初始化
    this.member = null;

    // 鉴权白名单初始化
    this.whiteList = [];
  }

  // 最先执行
  async __before() {
    const ok = await this.auth();
    if (ok !== true) {
      return this.showError(ERROR.USER.TOKEN_EXPIRE);
    }
    return true;
  }

  /**
   * 执行鉴权逻辑
   */
  async auth() {
    // 白名单内不鉴权
    if (this.whiteList.indexOf(this.http.action) > -1) {
      return true;
    }

    // 解析token
    const token = this.header('token').trim() || '';
    this.member = await jwt.decrypt(token);
    if (think.isEmpty(this.member)) {
      return false;
    }

    // 判断token环境
    const ip = this.ip();
    if (this.member.env !== think.env) {
      this.LOG.warn(`token env error, client token env: ${this.member.env}, server token env: ${think.env}, ip: ${ip}`);
      this.showError(ERROR.USER.TOKEN_EXPIRE);
      return false;
    }

    delete this.member.env;

    // 打印jwt解析出来的数据
    this.LOG.trace(`decoded jwt data: ${JSON.stringify(this.member)}`);
    return true;
  }

  /**
   * 获取客户端ip(覆盖thinkjs的，它的获取有问题)
   */
  ip() {
    const ipArray = this.header('X-Forwarded-For').split(',') || [];
    return ipArray[ipArray.length - 1].trim() || '0.0.0.0';
  }

  /**
   * 获取当前页面大小
   */
  pageSize() {
    const maxPageSize = 30;
    const pageSize = parseInt(this.param('pageSize'), 10) || maxPageSize;
    // 统一页面大小+1，用于计算lastSequence
    return (pageSize > maxPageSize ? maxPageSize : pageSize) + 1;
  }

  /**
   * 获取顶部游标
   */
  headSequence() {
    return this.param('headSequence') || '';
  }

  /**
   * 获取上一页的游标
   */
  lastSequence() {
    return this.param('lastSequence') || '';
  }

  /**
   * 游标分页面列表规范
   * @param pageData 分页数据
   */
  cursorPage(pageData = {}) {
    const format = {};
    think.extend(format, { pageSize: pageData.list.length });
    think.extend(format, { headSequence: pageData.headSequence });
    think.extend(format, { lastSequence: pageData.lastSequence });
    think.extend(format, { list: pageData.list });
    return this.success(format);
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
   * 响应数据
   * @param object 任意数据格式
   */
  success(object) {
    const data = {};
    data.code = 1;
    data.data = object;
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
