const httpClient = require('../_http.js');
const test = require('ava');
const fs = require('fs');
const path = require('path');

const filesystem = httpClient.util('filesystem');
const basePath = path.resolve(`${__dirname}${path.sep}..${path.sep}`) + path.sep;

test('test util.filesystem.copy()', async (t) => {
  const targetFile = `${basePath}copy_test.jpg`;
  filesystem.copy(`${basePath}test.jpg`, targetFile);
  t.is(fs.existsSync(targetFile), true);
  fs.unlinkSync(targetFile);
});

test('test util.filesystem.mkdirsSync()', async (t) => {
  const targetDir = `${basePath}a${path.sep}b${path.sep}c${path.sep}`;
  filesystem.mkdirsSync(targetDir);
  t.is(fs.existsSync(targetDir), true);
  filesystem.rmdirSync(`${basePath}a`);
});

test('test util.filesystem.rmdirSync()', async (t) => {
  const targetDir = `${basePath}a${path.sep}b${path.sep}c${path.sep}`;
  filesystem.mkdirsSync(targetDir);
  t.is(fs.existsSync(targetDir), true);
  filesystem.rmdirSync(`${basePath}a`);
  t.is(fs.existsSync(targetDir), false);
});

test('test util.filesystem.getFileSize()', async (t) => {
  const targetFile = `${basePath}test.jpg`;
  t.is(filesystem.getFileSize(targetFile), 172182);
});
