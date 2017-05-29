const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateCert = fs.readFileSync(`${think.ROOT_PATH}/cert/private.pem`, 'utf-8');
const publicCert = fs.readFileSync(`${think.ROOT_PATH}/cert/public.pem`, 'utf-8');
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
    this.member = {};

    // 鉴权白名单初始化
    this.whiteList = [];
  }

  /**
   * 执行鉴权逻辑
   */
  async _before() {
    // 白名单内不鉴权
    if (this.whiteList.indexOf(this.http.action) > -1) {
      return;
    }

    // 解析token
    const token = this.header('token').trim();
    this.member = await this.decryptToken(token);
    if (think.isEmpty(this.member)) {
      this.showError(ERROR.SYSTEM.SYSTEM_NOT_FIND_RESPONSE_ERROR);
      return;
    }

    // 判断token环境
    const ip = this.ip();
    if (this.member.env !== think.env) {
      this.LOG.warn(`token env error, client token env: ${this.member.env}, server token env: ${think.env}, ip: ${ip}`);
      this.showError(ERROR.SYSTEM.SYSTEM_NOT_FIND_RESPONSE_ERROR);
      return;
    }
  }

  /**
   * 获取客户端ip(覆盖thinkjs的，它的获取有问题)
   */
  ip() {
    const ipArray = this.header('X-Forwarded-For').split(',') || [];
    return ipArray[ipArray.length - 1].trim() || '0.0.0.0';
  }

  /**
   * 生成token
   * @param data 要加密的数据
   * @param expiresIn 过期时间(单位：秒)
   */
  async encryptToken(data, expiresIn = 86400) {
    think.extend(data, { env: think.env });
    const token = await jwt.sign(data, privateCert, { algorithm: 'RS256', expiresIn });
    return token;
  }

  /**
   * 解析token
   * @param token 鉴权凭证
   */
  async decryptToken(token) {
    try {
      const json = await jwt.verify(token, publicCert);
      delete json.iat;
      delete json.exp;
      return json;
    } catch (e) {
      this.LOG.error(`token decrypt error, ip: ${this.ip()}`);
      this.LOG.error(e);
      return null;
    }
  }

  /**
   * 获取当前页面大小
   */
  pageSize() {
    const maxPageSize = 30;
    const pageSize = parseInt(this.param('pageSize'), 10) || maxPageSize;
    return pageSize > maxPageSize ? maxPageSize : pageSize;
  }

  /**
   * 游标分页面列表规范
   * @param list 返回数据(list类型)
   * @param moreItem 额外字段(json格式)
   * @param sequenceField 游标使用的对象字段
   * @param lastSequence 自定义游标值,默认0
   * @returns {{lastSequence: number, pageSize: number, list: array}}
   */
  cursorPage(list = [], moreItem = {}, sequenceField, lastSequence = 0) {
    const pageSize = this.pageSize();
    const _list = list;
    let _lastSequence = lastSequence;
    if (_lastSequence === 0 && _list.length >= pageSize) {
      _list.length -= 1;
      const obj = _list[_list.length - 1];
      if (think.isEmpty(obj[sequenceField])) {
        throw new Error(`missing 'sequence' field, sequenceField :${sequenceField}`);
      }
      _lastSequence = parseInt(obj[sequenceField], 10) || 0;
    }

    const format = { _lastSequence, pageSize: _list.length, _list };
    think.extend(format, moreItem);
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
