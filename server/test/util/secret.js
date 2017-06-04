const httpClient = require('../_http.js');
const test = require('ava');
const fs = require('fs');
const path = require('path');

const secret = httpClient.util('secret');
const shortKey = 'ruanzhijun';
const longKey = 'bij8g78ftyfyukgilho;76fctyvubigfryxctuyiguiuh';
const publicKey = fs.readFileSync(path.resolve(`${__dirname}${path.sep}..${path.sep}..${path.sep}cert${path.sep}public.pem`)).toString().trim();
const privateKey = fs.readFileSync(path.resolve(`${__dirname}${path.sep}..${path.sep}..${path.sep}cert${path.sep}private.pem`)).toString().trim();

test('test util.secret.md5()', async (t) => {
  t.is(secret.md5(123), '202cb962ac59075b964b07152d234b70');
  t.is(secret.md5(), 'd41d8cd98f00b204e9800998ecf8427e');
  t.is(secret.md5(''), 'd41d8cd98f00b204e9800998ecf8427e');
  t.is(secret.md5('ruanzhijun'), '5ee2707eb09a2fa47d6c26d59ff32a3e');
});

test('test util.secret.sha1()', async (t) => {
  t.is(secret.sha1(123), '40bd001563085fc35165329ea1ff5c5ecbdbbeef');
  t.is(secret.sha1(), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  t.is(secret.sha1(''), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  t.is(secret.sha1('ruanzhijun'), '21ff89fbb3a0ccdc6d4c53e02563dad66d1e227d');
});

test('test util.secret.hmacSha1()', async (t) => {
  t.is(secret.hmacSha1(123, longKey), 'cbeb6ec96ece9fdb2dd8ea3df91819ed04300d26');
  t.is(secret.hmacSha1('', longKey), 'fbdf30137484ab6643f3ee84071efe1c3f37ecbc');
  t.is(secret.hmacSha1('ruanzhijun', longKey), 'f66f126927a484926af5928b9e00941bae26b27e');
});

test('test util.secret.des3Encrypt()', async (t) => {
  try {
    t.is(secret.des3Encrypt(123, shortKey));
    t.is(secret.des3Encrypt('', shortKey));
    t.is(secret.des3Encrypt('ruanzhijun', shortKey));
  } catch (e) {
    t.is(e.message, 'Wrong key size');
  }

  t.is(secret.des3Encrypt(123, longKey), 'gIk/9skcYpo=');
  t.is(secret.des3Encrypt('', longKey), 'jYDHOyaFSrE=');
  t.is(secret.des3Encrypt('ruanzhijun', longKey), 'F/iLssIlrFH6tj85t7ja0Q==');
});

test('test util.secret.des3Decrypt()', async (t) => {
  try {
    t.is(secret.des3Decrypt('gIk/9skcYpo=', shortKey), '123');
    t.is(secret.des3Decrypt('jYDHOyaFSrE=', shortKey), '');
    t.is(secret.des3Decrypt('F/iLssIlrFH6tj85t7ja0Q==', shortKey), 'ruanzhijun');
  } catch (e) {
    t.is(e.message, 'Wrong key size');
  }

  t.is(secret.des3Decrypt('gIk/9skcYpo=', longKey), '123');
  t.is(secret.des3Decrypt('jYDHOyaFSrE=', longKey), '');
  t.is(secret.des3Decrypt('F/iLssIlrFH6tj85t7ja0Q==', longKey), 'ruanzhijun');
});


test('test util.secret.rsa256Encrypt()', async (t) => {
  t.is(secret.rsa256Encrypt(123, privateKey), 'Pa0mz8sJRfCv+KRUGBXFnkAprs0tALe2keb2HZosh779+9QVhqEontVQFue1jmT8JgQWmfuWGEC92JRxc/LHQwYWQqf3hjQoZE2qXw1LLwHC9n+TYzj/SN83EnwytLIuuqogHIEdzA2XwgWKjECzftdqHX1U/LUHxnGDCsNUbNQLpIMeJ+ogweVVsmYX/q/C/NqccVHkZlSQP/TVISukO86g77XQcVIBOfYVGMFoCSZBbFqvKSP1NnecAH3NMkg/TwGU7PyjhPKLJb+IMzCRLELhY3ASsYqnmBT0g+Mx5akLy5ausNfTexmHw9E06TcJysOj3CQ2O+8K3Xpu8ABTMA==');
  t.is(secret.rsa256Encrypt('', privateKey), 'Iv9xLutDG50ij4ODVIGjq7PDQci/vuCWtJC67hqIIRiccNDI0XJRdLzE7VxpbqW1NhGhriVQDlefjBtzr+XbaXWeMXKsfo7DHcBfytGvMdyTmD5QGcD934sAZLdgKu/Z7SjRiqGUhVkpxYzRxymPKjFTe+9jlCzIfHJqmGMLVFLmx2SVYoVQZyh7Wt8OpLjddArqARGokRd/fXCMnopkWGmV+3Y+3lN8YuF3uBak2Eny0eh5aVGmQ/EfwiOnZcgY0Hjc4X4IBdXZq1ReDm02TYBygVznq5Afp/Bew2m1kGJKbMT6xXpaNYq48cI0p844hAlXUuU3MD/Ab+DFC6JW3A==');
  t.is(secret.rsa256Encrypt('ruanzhijun', privateKey), 'pn1DnAJTW7fzcSNp7G0RHq1kEtTe4sP/HW+m3V5WdKbACjFviuH6lSkQ9h69O89FcnIdbxQsGHd8xrwhvLSztTt91R9XI6UQwUEwrbW3tIsf3PT5ql9YxLeyYxq0UWT6UUg9duG5VXvm7EkOZXiIIDrrcOmrvTyOXpNWAr0vvdTz6zrYbuYZL3azLncIEvR0JfcywJrds0bHOiYdop2B9bHL7un9d2rYbFMXCtSNi+7foueaSVgRujU5asqejercVckGvgKjL/BLBZvBze2nbizkSTxRnGp+Prj0kgSv/jh1Dp0AxSRg7TcONJcwT0cjif5VEjlvBOajwK0qwR4d1w==');
});

test('test util.secret.rsa256Verify()', async (t) => {
  t.is(secret.rsa256Verify(123, secret.rsa256Encrypt(123, privateKey), publicKey), true);
  t.is(secret.rsa256Verify('', secret.rsa256Encrypt('', privateKey), publicKey), true);
  t.is(secret.rsa256Verify('ruanzhijun', secret.rsa256Encrypt('ruanzhijun', privateKey), publicKey), true);

  t.is(secret.rsa256Verify('ruan', secret.rsa256Encrypt('ruanzhijun', privateKey), publicKey), false);
});

test('test util.secret.base64Encode()', async (t) => {
  t.is(secret.base64Encode(123), 'MTIz');
  t.is(secret.base64Encode(''), '');
  t.is(secret.base64Encode('ruanzhijun'), 'cnVhbnpoaWp1bg==');
});

test('test util.secret.base64Decode()', async (t) => {
  t.is(secret.base64Decode(secret.base64Encode(123)), '123');
  t.is(secret.base64Decode(secret.base64Encode('')), '');
  t.is(secret.base64Decode(secret.base64Encode('ruanzhijun')), 'ruanzhijun');

  t.is(secret.base64Decode(secret.base64Encode('ruan')), 'ruan');
});
