const test = require('ava');
const httpClient = require('../../_http.js');

const manageService = httpClient.service('manage', 'api');

test('test manageService.userList()', async (t) => {
  let pageData = await manageService.userList({});
  t.is(pageData.list.length > 0, true);

  pageData = await manageService.userList({ nickName: { $regex: new RegExp('小', 'ig') } });
  t.is(pageData.list.length > 0, true);

  pageData = await manageService.userList({ nickName: { $regex: new RegExp('小', 'ig') } }, '5931774e6a54be1b0d91e27f');
  t.is(pageData.list.length === 0, true);
});


test('test manageService.eventList()', async (t) => {
  let pageData = await manageService.eventList({});
  t.is(pageData.list.length > 0, true);

  pageData = await manageService.eventList({ nickName: { $regex: new RegExp('测试', 'ig') } });
  t.is(pageData.list.length === 0, true);

  pageData = await manageService.eventList({ nickName: { $regex: new RegExp('测试', 'ig') } }, '5931774e6a54be1b0d91e27f');
  t.is(pageData.list.length === 0, true);
});

