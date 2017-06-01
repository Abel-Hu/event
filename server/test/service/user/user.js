const httpClient = require('../../_http.js');
const test = require('ava');

test('user service test', async (t) => {
  const passport = '15919630721';
  const userService = httpClient.service('user', 'user');
  const user = await userService.getUserByPassport(passport);
  t.is(user.passport, passport);
});

