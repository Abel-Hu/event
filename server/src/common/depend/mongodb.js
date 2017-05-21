global.mongodb = require('mongoose');

mongodb.Promise = global.Promise;
const config = think.config('mongodb');
const LOG = getLogger(__filename);

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

mongodb.connect(uri, options);

mongodb.connection.on('connected', () => {
  LOG.warn(`Connect to mongodb://${config.host}:${config.port}/${config.database} success`);
});
mongodb.connection.on('error', (err) => {
  LOG.warn(`Connect to mongodb://${config.host}:${config.port}/${config.database} failed`);
  LOG.warn(err);
  process.exit(1);
});
mongodb.connection.on('disconnected', () => {
  LOG.warn(`Disconnected mongodb://${config.host}:${config.port}/${config.database}`);
});
