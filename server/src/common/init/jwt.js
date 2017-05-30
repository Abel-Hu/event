// 实例化jwt对象
const Jwt = requireCommon('jwt');
const config = think.config('jwt');
global.jwt = new Jwt(config.publicCert, config.privateCert);
