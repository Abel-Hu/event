module.exports = {
  log_request: true,  // 是否打印请求的日志
  log_level: 'ALL',
  // mongodb配置
  mongodb: {
    host: '127.0.0.1',
    port: 27017,
    user: 'house',
    pass: 'house',
    database: 'event',
  },
  // redis配置
  // ioredis: {
  //   // 运行模式：single-单点模式；cluster-集群模式
  //   mode: 'single',
  //   hosts: {
  //     host: '127.0.0.1',
  //     port: 6379,
  //     password: 'admin',
  //   },
  // },
  // 微信SDK
  wechatSDK: {
    // 微信小程序appId
    wxAppId: 'wx2ffcac7f61012c07',
    // 微信小程序appSecret
    wxAppSecret: '87b22656dabe2731c02d1b9a854e9bc0',
  },
  // 建站初期，大V的openId
  vip: [
    'om0oZ0R0ESHEW_2_d-2nZTOy1AsM',
  ],
  port: 9394,
};
