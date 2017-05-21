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
    const module = require(`${errorcode}${path.sep}${v}`);
    Object.keys(module).filter((k) => {
      object[k] = module[k];
      return true;
    });
    return true;
  });
  E[lang] = object;
  return true;
});

console.log(E['zh'].SYSTEM_ERROR.getCode());
console.log(E['zh'].SYSTEM_ERROR.getMessage());