module.exports = {
  log_request: true,  // 是否打印请求的日志
  log_level: 'ALL',
  mongodb: {
    host: '127.0.0.1',
    port: 27017,
    user: 'house',
    pass: 'house',
    database: 'house',
  },
  crawlerRandom: { min: 3600000, max: 7200000 },
  port: 12345,
};
