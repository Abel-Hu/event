const log4js = {
  customBaseDir: `${think.ROOT_PATH}/log/`,
  appenders: [
    // 控制台分级别输出日志
    {
      type: 'categoryFilter',
      compress: true,
      exclude: [],
      appender: {
        type: 'console',
      },
    },
    // {type: 'console'}, //控制台输出所有日志
  ],
  replaceConsole: true,
  // ALL TRACE DEBUG INFO WARN ERROR FATAL OFF
  levels: {
    log_file: 'ALL',
    console: 'info',
    log_date: 'ALL',
  },
};

// 本地开发环境没必要写日志
if (think.app.env !== 'development') {
  log4js.appenders.push({// 写文件
    type: 'dateFile',
    compress: true,
    filename: `${think.ROOT_PATH}/log/${think.app.env}/`,
    alwaysIncludePattern: true,
    pattern: 'yyyy-MM-dd.log',
  });
}

module.exports = {
  workers: process.env.NUMBER_OF_PROCESSORS,
  log_request: true,  // 是否打印请求的日志
  log_level: 'ALL',
  log4js,
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
