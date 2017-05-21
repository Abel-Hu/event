/**
 * 全局加载 redis 集群
 * https://www.npmjs.com/package/ioredis
 * debug 指令 DEBUG=ioredis:* npm start
 */
const redisConfig = think.config('ioredis') || {};
const { firstUpperCase } = requireCommon('string');
const LOG = getLogger(__filename);
const Redis = require('ioredis');

// 初始化方法
const init = {
  initSingle() {
    return new Redis(redisConfig.hosts);
  },

  initCluster() {
    return new Redis.Cluster(redisConfig.hosts);
  },
};

const afterRedisReady = function () {
  LOG.info(`Redis ${firstUpperCase(redisConfig.mode)} Ready`);
};


if (!think.isEmpty(redisConfig.hosts)) {
  const initFunction = `init${firstUpperCase(redisConfig.mode)}`;
  global.redis = init[initFunction]();

  redis.on('ready', () => {
    afterRedisReady();
  });

  redis.on('reconnecting', () => {
    // todo
  });

  redis.on('connect', () => {
    // todo
  });

  redis.on('error', (err) => {
    console.error(err);
    LOG.error(err);
  });
}
