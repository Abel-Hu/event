const httpClient = require('../_http.js');
const test = require('ava');

const string = httpClient.util('string');

test('test util.string.toString()', async (t) => {
  t.is(typeof string.toString(), 'string');
  t.is(typeof string.toString(''), 'string');
  t.is(typeof string.toString(null), 'string');
  t.is(typeof string.toString(undefined), 'string');
  t.is(typeof string.toString(1), 'string');
  t.is(typeof string.toString('a'), 'string');
  t.is(typeof string.toString({ a: 1 }), 'string');

  t.is(string.toString(), '');
  t.is(string.toString(''), '');
  t.is(string.toString(null), '');
  t.is(string.toString(undefined), '');
  t.is(string.toString(1), '1');
  t.is(string.toString('a'), 'a');
  t.is(string.toString({ a: 1 }), '[object Object]');
});

test('test util.string.isJSON()', async (t) => {
  t.is(string.isJSON(1), false);
  t.is(string.isJSON('a'), false);
  t.is(string.isJSON('["a":1]'), false);
  t.is(string.isJSON('{"a":1}'), true);
  t.is(string.isJSON('[{"a":1}]'), true);
  t.is(string.isJSON('[{"a":1},{"b":2}]'), true);
  t.is(string.isJSON({ a: 1 }), true);
  t.is(string.isJSON([{ a: 1 }, { b: 1 }]), true);
});

test('test util.string.isURL()', async (t) => {
  t.is(string.isURL(1), false);
  t.is(string.isURL('a'), false);
  t.is(string.isURL('["a":1]'), false);
  t.is(string.isURL('{"a":1}'), false);
  t.is(string.isURL('[{"a":1}]'), false);
  t.is(string.isURL('http://ruanzhijun.cn'), true);
  t.is(string.isURL('https://ruanzhijun.cn'), true);
  t.is(string.isURL('https://ruanzhijun.cn?a=1'), true);
  t.is(string.isURL('https://ruanzhijun.cn?a=1&b=2'), true);
  t.is(string.isURL('https://ruanzhijun.cn/!#/index?a=1'), true);
});

test('test util.string.firstUpperCase()', async (t) => {
  t.is(string.firstUpperCase(), '');
  t.is(string.firstUpperCase(null), '');
  t.is(string.firstUpperCase(undefined), '');
  t.is(string.firstUpperCase('ruanzhijun'), 'Ruanzhijun');
  t.is(string.firstUpperCase('ruanZhiJun'), 'RuanZhiJun');
  t.is(string.firstUpperCase('RuanZhiJun'), 'RuanZhiJun');
});

test('test util.string.firstLowerCase()', async (t) => {
  t.is(string.firstLowerCase(), '');
  t.is(string.firstLowerCase(null), '');
  t.is(string.firstLowerCase(undefined), '');
  t.is(string.firstLowerCase('ruanzhijun'), 'ruanzhijun');
  t.is(string.firstLowerCase('ruanZhiJun'), 'ruanZhiJun');
  t.is(string.firstLowerCase('RuanZhiJun'), 'ruanZhiJun');
});

