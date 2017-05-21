// 自动加载错误码
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
      object[module] = object[module] ? object[module] : object[module] = {};
      object[module][k] = object[module][k] ? object[module][k] : object[module][k] = {};
      object[module][k][lang] = kv[k];
      return true;
    });
    return true;
  });
  global.E = object;
  return true;
});
