// 自动加载错误码
const LOG = getLogger(__filename);
const path = require('path');
const fs = require('fs');

global.E = {};
const basePath = path.resolve(`${__dirname}${path.sep}..${path.sep}errorcode`);
fs.readdirSync(basePath).filter((lang) => {
  const object = {};
  const errorcode = `${basePath}${path.sep}${lang}`;
  fs.readdirSync(errorcode).filter((v) => {
    const module = v.replace('.js', '').toUpperCase();
    const kv = require(`${errorcode}${path.sep}${v}`);
    Object.keys(kv).filter((k) => {
      think.isEmpty(object[module]) ? object[module] = {} : true;
      think.isEmpty(object[module][k]) ? object[module][k] = {} : true;
      object[module][k][lang] = kv[k];
      return true;
    });
    return true;
  });
  global.E = object;
  return true;
});
