const test = require('ava');
const httpClient = require('../../_http.js');

const userService = httpClient.service('user', 'api');

test('test userService.create()', async (t) => {
  let user = await userService.create({
    openId: think.uuid(32),
    gender: 1,
    isVip: true,
  }, '127.0.0.1');
  t.is(!think.isEmpty(user.uid), true);

  user = await userService.create({
    openId: 'om0oZ0R0ESHEW_2_d-2nZTOy1AsM',
    gender: 1,
    isVip: true,
  }, '127.0.0.1');
  t.is(!think.isEmpty(user.uid), true);
});

test('test userService.updateUserInfo()', async (t) => {
  const user = await userService.updateUserInfo('5931774e6a54be1b0d91e27f', {
    nickName: '小丸子',
    mobile: '13800138000',
    birthday: '2017-02-14',
    sex: 1,
    description: '哈哈哈',
  });

  t.is(user.uid, '5931774e6a54be1b0d91e27f');
  t.is(user.nickName, '小丸子');
  t.is(user.mobile, '13800138000');
  t.is(user.birthday, '2017-02-14');
  t.is(user.sex, 1);
  t.is(user.description, '哈哈哈');
});

test('test userService.makeUserInfo()', async (t) => {
  const uid = '5931774e6a54be1b0d91e27f';
  let user = await userService.getUserByUid(uid);
  user = userService.makeUserInfo(user);

  t.is(user.uid, '5931774e6a54be1b0d91e27f');
  t.is(user.nickName, '小丸子');
  t.is(user.mobile, '13800138000');
  t.is(user.birthday, '2017-02-14');
  t.is(user.sex, 1);
  t.is(user.description, '哈哈哈');

  user = userService.makeUserInfo();
  t.is(JSON.stringify(user), JSON.stringify({}));

  user = userService.makeUserInfo(null);
  t.is(JSON.stringify(user), JSON.stringify({}));

  user = userService.makeUserInfo(undefined);
  t.is(JSON.stringify(user), JSON.stringify({}));

  user = userService.makeUserInfo({});
  t.is(JSON.stringify(user), JSON.stringify({}));
});

test('test userService.getUserByOpenId()', async (t) => {
  const openId = 'om0oZ0R0ESHEW_2_d-2nZTOy1AsM';
  const user = await userService.getUserByOpenId(openId);

  t.is(user.uid, '5931774e6a54be1b0d91e27f');
  t.is(user.nickName, '小丸子');
  t.is(user.mobile, '13800138000');
  t.is(user.birthday, '2017-02-14');
  t.is(user.sex, 1);
  t.is(user.description, '哈哈哈');
});

test('test userService.incrEventPublishs()', async (t) => {
  const uid = '5931774e6a54be1b0d91e27f';
  const user = await userService.getUserByUid(uid);
  const eventPublishs = await userService.incrEventPublishs(uid);
  t.is(user.eventPublishs + 1, eventPublishs);
});

test('test userService.incrEventJoins()', async (t) => {
  const uid = '5931774e6a54be1b0d91e27f';
  const user = await userService.getUserByUid(uid);
  const eventJoins = await userService.incrEventJoins(uid);
  t.is(user.eventJoins + 1, eventJoins);
});

test('test userService.getUserByUid()', async (t) => {
  const uid = '5931774e6a54be1b0d91e27f';
  let user = await userService.getUserByUid(uid);
  t.is(user.uid, '5931774e6a54be1b0d91e27f');
  t.is(user.nickName, '小丸子');
  t.is(user.mobile, '13800138000');
  t.is(user.birthday, '2017-02-14');
  t.is(user.sex, 1);
  t.is(user.description, '哈哈哈');

  user = await userService.getUserByUid('5932b0a5d08dbf1e4046ab95');
  t.is(JSON.stringify(user), JSON.stringify({}));

  user = await userService.getUserByUid('ruanzhijun');
  t.is(JSON.stringify(user), JSON.stringify({}));
});

test('test userService.joinList()', async (t) => {
  const uid = '5931774e6a54be1b0d91e27f';

  let pageData = await userService.joinList(uid);
  t.is(pageData.list.length > 0, true);

  pageData = await userService.joinList(uid, '5932c03522359d19cc195fa9');
  t.is(pageData.list.length === 0, true);

  pageData = await userService.joinList(uid, '', '5932c03522359d19cc195fa9');
  t.is(pageData.list.length === 0, true);

  pageData = await userService.joinList(uid, '5932c03522359d19cc195fa9', '5932c03522359d19cc195fa9');
  t.is(pageData.list.length === 0, true);

  pageData = await userService.joinList(uid, '5932c03522359d19cc195fa9', '5932c03522359d19cc195fa9', 30);
  t.is(pageData.list.length === 0, true);
});

test('test userService.favList()', async (t) => {
  const uid = '5931774e6a54be1b0d91e27f';

  let pageData = await userService.favList(uid);
  t.is(pageData.list.length === 0, true);

  pageData = await userService.favList(uid, '5932c03522359d19cc195fa9');
  t.is(pageData.list.length === 0, true);

  pageData = await userService.favList(uid, '', '5932c03522359d19cc195fa9');
  t.is(pageData.list.length === 0, true);

  pageData = await userService.favList(uid, '5932c03522359d19cc195fa9', '5932c03522359d19cc195fa9');
  t.is(pageData.list.length === 0, true);

  pageData = await userService.favList(uid, '5932c03522359d19cc195fa9', '5932c03522359d19cc195fa9', 30);
  t.is(pageData.list.length === 0, true);
});
