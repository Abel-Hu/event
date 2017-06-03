const httpClient = require('../../_http.js');
const test = require('ava');

test('test /api/manage/userlist', async (t) => {
  const data = await httpClient.get('/api/manage/userlist', {
    order: 'uid',
    by: 'desc',
  });
  t.is(data.pageSize, 1);
});

test('test /api/manage/userlist', async (t) => {
  const data = await httpClient.get('/api/manage/userlist', {
    nickName: '小',
    order: 'uid',
    by: 'desc',
  });
  t.is(data.pageSize, 1);
});

test('test /api/manage/userupdate', async (t) => {
  const data = await httpClient.get('/api/manage/userupdate', {
    uid: httpClient.uid,
    isVip: 'true',
  });
  t.is(data, 1);
});

test('test /api/manage/userupdate', async (t) => {
  const data = await httpClient.get('/api/manage/userupdate', {
    uid: httpClient.uid,
  });
  t.is(data, 1);
});

test('test /api/manage/eventlist', async (t) => {
  const data = await httpClient.get('/api/manage/eventlist', {
    order: 'eventId',
    by: 'desc',
  });
  t.is(data.pageSize, 30);
});

test('test /api/manage/eventlist', async (t) => {
  const data = await httpClient.get('/api/manage/eventlist', {
    title: '测试',
    order: 'eventId',
    by: 'desc',
  });
  t.is(data.pageSize, 30);
});

test('test /api/manage/eventupdate', async (t) => {
  const data = await httpClient.get('/api/manage/eventupdate', {
    eventId: '59327311774f9920f4590945',
    status: '0',
  });
  t.is(data, 1);
});

test('test /api/manage/eventupdate', async (t) => {
  const data = await httpClient.get('/api/manage/eventupdate', {
    eventId: '59327311774f9920f4590945',
  });
  t.is(data, 1);
});
