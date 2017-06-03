const httpClient = require('../_http.js');
const test = require('ava');

const Jwt = httpClient.util('jwt');
const config = think.config('jwt');
const jwt = new Jwt(config.publicCert, config.privateCert);

test('test util.jwt.encrypt()', async (t) => {
  t.is((await jwt.encrypt()).startsWith('ey'), true);
  t.is((await jwt.encrypt('')).startsWith('ey'), true);
  t.is((await jwt.encrypt(123)).startsWith('ey'), true);
  t.is((await jwt.encrypt('ruanzhijun')).startsWith('ey'), true);
});

test('test util.jwt.decrypt()', async (t) => {
  t.is(await jwt.decrypt(), null);
  t.is(await jwt.decrypt('abc'), null);
  t.is(JSON.stringify(await jwt.decrypt(await jwt.encrypt())), JSON.stringify({}));
  t.is(JSON.stringify(await jwt.decrypt(await jwt.encrypt(''))), JSON.stringify({}));
  t.is(await jwt.decrypt(await jwt.encrypt(123)), '123');
  t.is(await jwt.decrypt(await jwt.encrypt('ruanzhijun')), 'ruanzhijun');
});
