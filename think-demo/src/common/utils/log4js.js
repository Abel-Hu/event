/**
 * log4js初始化 ALL TRACE DEBUG INFO WARN ERROR FATAL OFF
 */
const fs = require('fs');
const log4js = require('log4js');

const logconfig = think.config('log4js');
console.log(think.config());
if (!fs.existsSync(logconfig.customBaseDir)) {
  think.mkdir(logconfig.customBaseDir);
}
logconfig.appenders.filter((v) => {
  if (v.filename && !fs.existsSync(v.filename)) {
    think.mkdir(v.filename);
  }
  return true;
});
log4js.configure(logconfig);
log4js.loadAppender('categoryFilter');
/** 切换日志频道 不影响写日志操作
 level:
 ALL
 TRACE
 DEBUG
 INFO
 WARN
 ERROR
 FATAL
 OFF
 LOG.setLevel(level)
 */
module.exports = log4js;
