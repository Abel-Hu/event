const httpClient = require('../../_http.js');
const test = require('ava');

test('test /api/user/login', async (t) => {
  const data = await httpClient.post('/api/user/login');
  t.is(data.code, 200001);
});

test('test /api/user/info', async (t) => {
  const data = await httpClient.get('/api/user/info');
  t.is(httpClient.uid, data.uid);
});

test('test /api/user/update', async (t) => {
  const update = {
    nickName: '小丸子',
    mobile: '13800138000',
    birthday: '2017-02-14',
    sex: 1,
    description: '哈哈哈',
  };
  const data = await httpClient.post('/api/user/update', update);
  t.is(httpClient.uid, data.uid);
  t.is(update.nickName, data.nickName);
  t.is(update.mobile, data.mobile);
  t.is(update.birthday, data.birthday);
  t.is(update.sex, data.sex);
  t.is(update.description, data.description);
});

test('test /api/user/joinlist', async (t) => {
  const data = await httpClient.get('/api/user/joinlist');
  t.is(data.list.length, 0);
});

test('test /api/user/favlist', async (t) => {
  const data = await httpClient.get('/api/user/favlist');
  t.is(data.list.length, 0);
});
