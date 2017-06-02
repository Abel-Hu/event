// 自动生成索引
// 初始化mongodb
require('thinkjs');
const fs = require('fs');
const path = require('path');

// 读取上次保存的索引
const runtimeFile = path.resolve(`${__dirname}${path.sep}..${path.sep}runtime${path.sep}index.json`);
const lastIndexes = JSON.parse(fs.existsSync(runtimeFile) ? fs.readFileSync(runtimeFile).toString().trim() : '{}');
console.log(lastIndexes);
function ensureIndex() {
  const basePath = `${__dirname}${path.sep}collection`;
  fs.readdirSync(basePath).filter((file) => {
    const indexes = require(`${basePath}${path.sep}${file}`);
    console.log(indexes);
    return true;
  });
}


const configPath = path.resolve(`${__dirname}${path.sep}..${path.sep}src${path.sep}common${path.sep}config${path.sep}env`);
fs.readdirSync(configPath).filter((v) => {
  const mongoose = require('mongoose');
  mongoose.Promise = require('bluebird');
  const config = require(`${configPath}${path.sep}${v}`).mongodb;
  if (!think.isEmpty(config)) {
    // 连接mongodb
    const uri = `mongodb://${config.host}:${config.port}/${config.database}`;
    // const uri = `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.database}`;

    // 连接选项
    const options = {
      config: {
        autoIndex: false,
      },
      server: {
        poolSize: 5,
        reconnectTries: Number.MAX_SAFE_INTEGER,
        auto_reconnect: true,
      },
    };

    const conn = mongoose.createConnection(uri, options);

    console.log(conn.collection('event'));

    mongoose.connection.on('connected', () => {
      console.log(`Connect to mongodb://${config.host}:${config.port}/${config.database} success`);
      ensureIndex();
    });

    mongoose.connection.on('error', (err) => {
      console.log(`Connect to mongodb://${config.host}:${config.port}/${config.database} failed`);
      console.log(err);
    });
  }
  return true;
});
