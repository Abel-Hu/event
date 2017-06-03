const httpClient = require('../../_http.js');
const test = require('ava');

const eventId = '5932a1d7639b1051d0e26327';

test('test /api/event/publish', async (t) => {
  const data = await httpClient.get('/api/event/publish', {
    title: '测试活动~~',
    description: '测试活动描述~~',
    images: ['http://image.ruanzhijun.cn/event/1.jpg', 'http://image.ruanzhijun.cn/event/2.JPEG', 'http://image.ruanzhijun.cn/event/3.jpg'],
    longitude: '113.43',
    latitude: '34.56',
    address: '珠江新城马场路28号',
    startTime: '2027-02-14 18:00:00',
    endTime: '2027-03-14 18:00:00',
    joinLimit: '2',
    deadline: '2027-03-14 18:00:00',
  });
  t.is(data.userEventPublishs > 0, true);
});

test('test /api/event/update', async (t) => {
  const data = await httpClient.get('/api/event/update', {
    eventId: '5932a1d7639b1051d0e26327',
    title: '测试活动~~',
    description: '测试活动描述~~',
    images: ['http://image.ruanzhijun.cn/event/1.jpg', 'http://image.ruanzhijun.cn/event/2.JPEG', 'http://image.ruanzhijun.cn/event/3.jpg'],
    longitude: '113.43',
    latitude: '34.56',
    address: '珠江新城马场路28号',
    startTime: '1802599200000',
    endTime: '1805018400000',
    joinLimit: '0',
    deadline: '1805018400000',
  });
  t.is(data, 1);
});

test('test /api/event/info', async (t) => {
  const data = await httpClient.get('/api/event/info', { eventId });
  t.is(data.eventId, eventId);
});

test('test /api/event/list', async (t) => {
  const data = await httpClient.get('/api/event/list');
  t.is(data.pageSize, 30);
});

test('test /api/event/fav', async (t) => {
  const data = await httpClient.post('/api/event/fav', { eventId });
  t.is(data, 1);
});

test('test /api/event/unfav', async (t) => {
  const data = await httpClient.post('/api/event/unfav', { eventId });
  t.is(data, 1);
});

test('test /api/event/join', async (t) => {
  const data = await httpClient.post('/api/event/join', { eventId });
  t.is(data.code, 300008);
});

test('test /api/event/commentadd', async (t) => {
  const content = '好好玩~';
  const data = await httpClient.post('/api/event/commentadd', {
    eventId,
    content,
  });
  t.is(data.content, content);
});

test('test /api/event/commentdel', async (t) => {
  const content = '好好玩~';
  const comment = await httpClient.post('/api/event/commentadd', {
    eventId,
    content,
  });

  const data = await httpClient.post('/api/event/commentdel', {
    commentId: comment.commentId,
  });
  t.is(data, 1);
});

test('test /api/event/commentlist', async (t) => {
  const data = await httpClient.get('/api/event/commentlist', { eventId });
  t.is(data.list.length > 0, true);
});

test('test /api/event/joinlist', async (t) => {
  const data = await httpClient.get('/api/event/joinlist', { eventId });
  t.is(data.list.length > 0, true);
});

test('test /api/event/share', async (t) => {
  const data = await httpClient.post('/api/event/share', { eventId });
  t.is(data, 1);
});
