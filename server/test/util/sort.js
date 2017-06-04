const httpClient = require('../_http.js');
const test = require('ava');

const sort = httpClient.util('sort');

test('test util.sort.sortKey()', async (t) => {
  t.is(JSON.stringify(sort.sortKey(123)), JSON.stringify([]));
  t.is(JSON.stringify(sort.sortKey(123, 'asc')), JSON.stringify([]));
  t.is(JSON.stringify(sort.sortKey(123, 'desc')), JSON.stringify([]));

  t.is(JSON.stringify(sort.sortKey('ruan')), JSON.stringify(['0', '1', '2', '3']));
  t.is(JSON.stringify(sort.sortKey('ruan', 'asc')), JSON.stringify(['0', '1', '2', '3']));
  t.is(JSON.stringify(sort.sortKey('ruan', 'desc')), JSON.stringify(['3', '2', '1', '0']));

  t.is(JSON.stringify(sort.sortKey({ a: 1, b: 2, c: 3 })), JSON.stringify(['a', 'b', 'c']));
  t.is(JSON.stringify(sort.sortKey({ a: 1, b: 2, c: 3 }, 'asc')), JSON.stringify(['a', 'b', 'c']));
  t.is(JSON.stringify(sort.sortKey({ a: 1, b: 2, c: 3 }, 'desc')), JSON.stringify(['c', 'b', 'a']));

  t.is(JSON.stringify(sort.sortKey({ f: 1, u: 2, c: 3, k: 4 })), JSON.stringify(['c', 'f', 'k', 'u']));
  t.is(JSON.stringify(sort.sortKey({ f: 1, u: 2, c: 3, k: 4 }, 'asc')), JSON.stringify(['c', 'f', 'k', 'u']));
  t.is(JSON.stringify(sort.sortKey({ f: 1, u: 2, c: 3, k: 4 }, 'desc')), JSON.stringify(['u', 'k', 'f', 'c']));
});

test('test util.sort.sortArray()', async (t) => {
  t.is(sort.sortArray(1), 1);
  t.is(sort.sortArray(1, 'asc'), 1);
  t.is(sort.sortArray(1, 'desc'), 1);

  t.is(sort.sortArray('ruanzhijun'), 'ruanzhijun');
  t.is(sort.sortArray('ruanzhijun', 'asc'), 'ruanzhijun');
  t.is(sort.sortArray('ruanzhijun', 'desc'), 'ruanzhijun');

  t.is(JSON.stringify(sort.sortArray({ a: 1 })), JSON.stringify({ a: 1 }));
  t.is(JSON.stringify(sort.sortArray({ a: 1 }, 'asc')), JSON.stringify({ a: 1 }));
  t.is(JSON.stringify(sort.sortArray({ a: 1 }, 'desc')), JSON.stringify({ a: 1 }));

  t.is(JSON.stringify(sort.sortArray([54, 34, 12, 78])), JSON.stringify([12, 34, 54, 78]));
  t.is(JSON.stringify(sort.sortArray([54, 34, 12, 78], 'asc')), JSON.stringify([12, 34, 54, 78]));
  t.is(JSON.stringify(sort.sortArray([54, 34, 12, 78], 'desc')), JSON.stringify([78, 54, 34, 12]));

  t.is(JSON.stringify(sort.sortArray(['f', 'u', 'c', 'k'])), JSON.stringify(['f', 'u', 'c', 'k']));
  t.is(JSON.stringify(sort.sortArray(['f', 'u', 'c', 'k'], 'asc')), JSON.stringify(['f', 'u', 'c', 'k']));
  t.is(JSON.stringify(sort.sortArray(['f', 'u', 'c', 'k'], 'desc')), JSON.stringify(['f', 'u', 'c', 'k']));
});
