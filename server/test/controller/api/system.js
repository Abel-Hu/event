const httpClient = require('../../_http.js');
const test = require('ava');

test('test /api/system/token', async (t) => {
  const data = await httpClient.post('/api/system/token');
  t.is(httpClient.token, data);
});

