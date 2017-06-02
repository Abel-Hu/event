// 自动创建索引
const LOG = getLogger(__filename);
const path = require('path');
const fs = require('fs');

module.exports = () => {
  const basePath = path.resolve(`${__dirname}${path.sep}..${path.sep}indexes`);
  fs.readdirSync(basePath).filter((index) => {
    const indexes = require(`${basePath}${path.sep}${index}`) || [];
    const collectionName = index.replace('.js', '');
    const schema = new mongoose.Schema({}, { autoIndex: true, strict: true, versionKey: false });
    indexes.filter((v) => {
      schema.index(v[0], v[1]);
      LOG.warn(`collection ${collectionName} ensureIndex: ${JSON.stringify(v[0])}${!think.isEmpty(v[1]) ? ', '+JSON.stringify(v[1]) : ''}`);
      return true;
    });
    mongoose.model(collectionName, schema, collectionName);
    return true;
  });
  LOG.warn(`ensureIndex finish ...`);
};