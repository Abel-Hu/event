const test = require('ava');
const httpClient = require('../../_http.js');

const pojoService = httpClient.service('pojo', 'api');

test('test pojoService.makeUserBase()', async (t) => {
  let userBases = await pojoService.makeUserBase();
  t.is(userBases.length, 0);

  userBases = await pojoService.makeUserBase('5931774e6a54be1b0d91e27f');
  t.is(userBases.uid, '5931774e6a54be1b0d91e27f');
  t.is(userBases.nickName, '小丸子');
  t.is(userBases.sex, 1);
  t.is(userBases.avatarUrl, 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo8944nhkvLIAJLAlmJjeo64EVp4cnkS19LJ1rs4vCkl8Zteyrg3jy2m9Pk8XtJ8YkuBIhc7rQcqQ/0');
  t.is(userBases.isVip, true);
  t.is(userBases.description, '哈哈哈');

  userBases = await pojoService.makeUserBase('5931774e6a54be1b0d91e27f', '5932c03522359d19cc195fa9');
  t.is(userBases.length, 2);
});

test('test pojoService.makeEventBase()', async (t) => {
  let eventBases = await pojoService.makeEventBase();
  t.is(eventBases.length, 0);

  eventBases = await pojoService.makeEventBase('59326d53cc01993204d2f064');
  t.is(eventBases.eventId, '59326d53cc01993204d2f064');

  eventBases = await pojoService.makeEventBase('59326d53cc01993204d2f064', '5932c03522359d19cc195fa9');
  t.is(eventBases.length, 2);
});

