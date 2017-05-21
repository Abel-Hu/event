// 自动加载错误码
const LOG = getLogger(__filename);
const path = require('path');
const fs = require('fs');

LOG.info(path.parse(__filename).name.toUpperCase());
fs.readdirSync(dependDir).filter(v => require(`${dependDir}${path.sep}${v}`));
