module.exports = {
  log_request: true,  // 是否打印请求的日志
  log_level: 'ALL',
  mongodb: {
    host: '127.0.0.1',
    port: 27017,
    user: 'house',
    pass: 'house',
    database: 'event',
  },
  // 微信SDK
  wechatSDK: {
    wxAppId: 'wx2ffcac7f61012c07',
    wxAppSecret: '87b22656dabe2731c02d1b9a854e9bc0',
  },
  port: 9394,
};
