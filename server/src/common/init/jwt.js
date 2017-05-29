const Jwt = requireCommon('jwt');
const config = think.config('jwt');
think.jwt = new Jwt(config.publicCert, config.privateCert);
