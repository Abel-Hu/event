/**
 * 全局加载 redis 集群
 * https://www.npmjs.com/package/ioredis
 * debug 指令 DEBUG=ioredis:* npm start
 */
const redisConfig = think.config('ioredis') || {};
const { firstUpperCase } = requireCommon('string');
const LOG = getLogger(__filename);
global.redis = {};
const Redis = require('ioredis');

// 初始化方法
const init = {
  initSingle() {
    redis = new Redis({
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      family: 4,           // 4 (IPv4) or 6 (IPv6)
      password: 'admin',
      db: 0,
    });
  },

  initCluster() {
    redis = new Redis.Cluster(redisConfig.hosts);
  },
};

if (!think.isEmpty(redisConfig.hosts)) {
  const initFunction = `init${firstUpperCase(redisConfig.mode)}`;
  init[initFunction]();

  redis.on('ready', () => {
    LOG.info(`Redis ${firstUpperCase(redisConfig.mode)} Ready`);
  });

  redis.on('reconnecting', () => {
    LOG.info(`Reconnecting Redis ${firstUpperCase(redisConfig.mode)} with ${redis.stream._handle.owner._peername.address}:${redis.stream._handle.owner._peername.port}`);
  });

  redis.on('connect', () => {
    LOG.info(`Connect Redis ${firstUpperCase(redisConfig.mode)} with ${redis.stream._handle.owner._peername.address}:${redis.stream._handle.owner._peername.port}`);
  });

  redis.on('error', (err) => {
    LOG.error('redis error: ', err.stack);
  });
}
