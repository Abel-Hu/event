// 生成错误码文档
global.ErrorCode = function (code, message) {
  this.getCode = function () {
    return code;
  };
  this.getMessage = function () {
    return message;
  };
};

const fs = require('fs');
const path = require('path');

const runtimeFile = path.resolve(`${__dirname}${path.sep}..${path.sep}runtime${path.sep}errorcode.json`);
const filename = path.resolve(`${__dirname}${path.sep}..${path.sep}..${path.sep}接口文档${path.sep}2-错误码文档.MD`);
const errorcodePath = path.resolve(`${__dirname}${path.sep}..${path.sep}src${path.sep}common${path.sep}errorcode${path.sep}zh`);

// 读取上次的错误码内容
const lastErrorCode = fs.exists(runtimeFile) ? fs.readFileSync(runtimeFile).toString().trim() : '';

// 组织文档内容
let content = '[返回公共文档](/接口文档/1-公共文档.MD)\r\n\r\n';
content += '# 错误码文档\r\n\r\n\r\n';

// 遍历所有错误码文件夹，根据errorCode排好序
const errorObj = {};
const errorModuleName = {};
fs.readdirSync(errorcodePath).filter((v) => {
  const file = `${errorcodePath}${path.sep}${v}`;
  const errorCode = require(file) || {};
  Object.keys(errorCode).filter((k) => {
    const tmp = parseInt(errorCode[k].getCode() % 100000, 10) || 0;
    const moduleCode = errorCode[k].getCode() - tmp;
    errorObj[moduleCode] = errorObj[moduleCode] ? errorObj[moduleCode] : errorObj[moduleCode] = {};
    errorObj[moduleCode][errorCode[k].getCode()] = errorCode[k].getMessage();
    return true;
  });
  let fileContent = fs.readFileSync(file, 'utf8');
  fileContent = fileContent.substring(0, fileContent.indexOf('module.exports'));
  fileContent = fileContent.replace(/\//g, '').trim();
  fileContent = fileContent.replace(/\*/g, '').trim();
  let key = fileContent.substring(fileContent.indexOf('('));
  key = key.replace(/[^0-9]+/g, '');
  errorModuleName[key] = fileContent.substring(0, fileContent.indexOf('('));
  return true;
});

// 比较与上次是否不同，如果不同则重新生成，相同则退出
const thisErrorCode = JSON.stringify(errorObj).trim();
if (lastErrorCode !== thisErrorCode) {
  // 遍历所有模块生成文档
  Object.keys(errorObj).filter((module) => {
    const moduleName = errorModuleName[module];
    content += `### ${moduleName}(${module})\r\n\r\n`;
    content += '错误码|错误描述\n';
    content += '--|--\n';

    const _errorObj = errorObj[module];
    Object.keys(_errorObj).filter((k) => {
      content += `${k}|${_errorObj[k]}\n`;
      return true;
    });
    content += '\r\n\r\n';
    return true;
  });

  // 写入文件
  fs.writeFileSync(runtimeFile, thisErrorCode);
  fs.writeFileSync(filename, content);

  // 提交到github
  const process = require('child_process');
  process.exec('ifconfig', function (error, stdout, stderr) {
    console.log(stdout);
  });
}
