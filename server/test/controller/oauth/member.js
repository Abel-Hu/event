const httpClient = require('../../_http.js');
const test = require('ava');

test('/oauth/member/loginbypassport success test', async (t) => {
  const param = {
    passport: '15919630721',
    password: 'ruanzhijun',
  };
  const data = await httpClient.post('/oauth/member/loginbypassport', param);
  t.is(data.passport, param.passport);
});

test('/oauth/member/loginbypassport error test', async (t) => {
  const param = {
    passport: '15919630721',
    password: 'ib8vifdcsdvou',
  };
  const data = await httpClient.post('/oauth/member/loginbypassport', param);
  t.is(data.code, -1);
});

test('/oauth/member/info test', async (t) => {
  const data = await httpClient.get('/oauth/member/info');
  t.is(data.passport, '15919630721');
});

