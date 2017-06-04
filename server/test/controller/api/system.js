const httpClient = require('../../_http.js');
const test = require('ava');

test('test /api/system/token', async (t) => {
  const data = await httpClient.post('/api/system/token');
  t.is(httpClient.token, data);
});

test('test /api/system/upload', async (t) => {
  const data = await httpClient.post('/api/system/upload');
  t.is(data, undefined);
});

test('test /api/system/upload', async (t) => {
  const data = await httpClient.post('/api/system/upload', { file: 'xxx' });
  t.is(data, undefined);
});

