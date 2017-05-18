// 本地环境
const Thinkjs = require('thinkjs');
const path = require('path');

const rootPath = path.dirname(__dirname);
const instance = new Thinkjs({
  APP_PATH: `${rootPath + path.sep}src`,
  RUNTIME_PATH: `${rootPath + path.sep}runtime`,
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  env: __filename.replace(`${__dirname}${path.sep}`, '').replace('.js', ''),
});
instance.run(true);
