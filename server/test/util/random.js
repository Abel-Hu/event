const httpClient = require('../_http.js');
const test = require('ava');

const random = httpClient.util('random');

test('test util.random.rand()', async (t) => {
  for (let i = 0; i < 20; i += 1) {
    t.is(new Set([1, 2, 3]).has(random.rand(1, 3)), true);
  }
});
