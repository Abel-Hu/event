/**
 * Created by ken on 16/8/8.
 */
const config = think.config();
const logconfig = {
  customBaseDir: `${think.RUNTIME_PATH}/log/`,
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
    log_file: config.log_level,
    console: 'info',
    log_date: config.log_level,
  },
};

// 本地开发环境没必要写日志
if (think.env !== 'development') {
  logconfig.appenders.push({// 写文件
    type: 'dateFile',
    compress: true,
    filename: `${think.RUNTIME_PATH}/log/${think.env}/`,
    alwaysIncludePattern: true,
    pattern: 'yyyy-MM-dd.log',
  });
}
module.exports = logconfig;
