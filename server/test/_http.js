const path = require('path');
const Thinkjs = require('thinkjs');
const http = require('http');
const log4js = require('log4js');

const req = new http.IncomingMessage();
req.headers = {
  'x-real-ip': '127.0.0.1',
  'x-forwarded-for': '127.0.0.1',
  host: 'event.ruanzhijun.cn',
  'x-nginx-proxy': 'true',
  connection: 'close',
  'cache-control': 'max-age=0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36',
  'accept-encoding': 'gzip,deflate,sdch',
  'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,nl;q=0.2,zh-TW;q=0.2',
};

const res = new http.ServerResponse(req);
res.write = function () {
  return true;
};

// 初始化think
const ROOT_PATH = path.dirname(__dirname);
const instance = new Thinkjs({
  ROOT_PATH,
  APP_PATH: `${ROOT_PATH + think.sep}src`,
  RUNTIME_PATH: `${ROOT_PATH + think.sep}runtime`,
  RESOURCE_PATH: ROOT_PATH,
  env: 'development',
});
instance.load();

function camelCase(str) {
  let _str = str;
  if (_str.indexOf('_') > -1) {
    _str = _str.replace(/_(\w)/g, (a, b) => b.toUpperCase());
  }
  return _str;
}

// 引入jwt
require('../src/common/init/jwt');

const jwtConfig = think.config('jwt');
module.exports.uid = '5931774e6a54be1b0d91e27f';
async function token() {
  module.exports.token = await jwt.encrypt({ uid: module.exports.uid, env: think.env }, jwtConfig.expire);
  return module.exports.token;
}

/**
 * 全局切换日志频道
 * @param channel 日志频道(建议传当前文件名)
 */
global.getTestLogger = function (channel = 'console') {
  const category = channel.replace(__filename.replace('_http.js', ''), '').replace('.js', '');
  const tmp = category.split(path.sep);
  const module = camelCase(tmp.join('.'));
  const logger = log4js.getLogger(`test.${module}`);
  logger.setLevel('ALL');
  return logger;
};

async function invoke(_http) {
  try {
    const Controller = think.lookClass(_http.url.substr(1, _http.url.lastIndexOf('/') - 1), 'controller');
    const controller = new Controller(_http);

    // 一定要重写controller.json方法,success才能拿到data;error还是拿不到data.(拿不到data的原因是获取不了语言包)
    controller.json = function (data) {
      return data;
    };

    // 因为单元测试里think不会解析这三个值，所以提前赋值给它们
    think.extend(_http, { module: _http.url.split('/')[1] });
    think.extend(_http, { controller: _http.url.split('/')[2] });
    think.extend(_http, { action: _http.url.split('/')[3] });

    // 因为单元测试里think不会自动执行aop，所以手动帮它执行
    await controller.__before();

    const data = await controller[`${_http.url.substr(_http.url.lastIndexOf('/') + 1)}Action`]();
    if (data.code === 1) {
      return data.data;
    }
    return data;
  } catch (err) {
    if (think.isPrevent(err)) {
      return {};
    }
    getTestLogger(__filename).error(err);
    return { code: -1 };
  }
}

/**
 * 发送post请求
 */
module.exports.post = async function (url, data = {}) {
  req.headers.token = await token();
  return think.http(think.extend({}, req, { url }), think.extend({}, res)).then(async (_http) => {
    const __http = think.extend(_http, { _config: {} }, { method: 'POST' }, { _post: data });
    const result = await invoke(__http);
    return result;
  });
};

/**
 * 发送get请求
 */
module.exports.get = async function (url, data = {}) {
  req.headers.token = await token();
  return think.http(think.extend({}, req, { url }), think.extend({}, res)).then(async (_http) => {
    const __http = think.extend(_http, { _config: {} }, { method: 'GET' }, { _get: data });
    const result = await invoke(__http);
    return result;
  });
};

/**
 * 发送put请求
 */
module.exports.put = async function (url, data = {}) {
  req.headers.token = await token();
  return think.http(think.extend({}, req, { url }), think.extend({}, res)).then(async (_http) => {
    const __http = think.extend(_http, { _config: {} }, { method: 'PUT' }, { _put: data });
    const result = await invoke(__http);
    return result;
  });
};

/**
 * 发送delete请求
 */
module.exports.delete = async function (url, data = {}) {
  req.headers.token = await token();
  return think.http(think.extend({}, req, { url }), think.extend({}, res)).then(async (_http) => {
    const __http = think.extend(_http, { _config: {} }, { method: 'DELETE' }, { _delete: data });
    const result = await invoke(__http);
    return result;
  });
};

/**
 * new一个service
 */
module.exports.service = function (name, module) {
  const Service = think.service(name, module);
  return new Service();
};
