// 实例化jwt对象
const LOG = getLogger(__filename);
const Jwt = requireCommon('jwt');
const config = think.config('jwt');
global.jwt = new Jwt(config.publicCert, config.privateCert);
LOG.warn(`init jwt ...`);
