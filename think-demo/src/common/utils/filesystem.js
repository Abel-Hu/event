/**
 * 文件工具集
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const isWindows = os.platform() === 'win32';
module.exports = {
  /**
   * 创建文件夹(多层)
   * @param dirpath 文件夹路径
   */
  mkdirsSync(dirpath) {
    if (fs.existsSync(dirpath)) {
      return true;
    }
    try {
      let pathtmp = '';
      const dirpathArray = dirpath.split(path.sep).filter((v) => {
        const b = !think.isEmpty(v);
        return b;
      }).map(v => v || '');

      // 处理windows盘符的问题
      if (isWindows) {
        const tmp = dirpathArray.shift();
        dirpathArray[0] = `${tmp}${path.sep}${dirpathArray[0]}`;
      }
      dirpathArray.filter((dirname) => {
        if (!think.isEmpty(pathtmp)) {
          pathtmp = path.join(pathtmp, dirname);
        } else {
          pathtmp = isWindows ? dirname : `/${dirname}`;
        }
        if (!fs.existsSync(pathtmp)) {
          fs.mkdirSync(pathtmp);
        }
        return true;
      });
      return true;
    } catch (e) {
      return false;
    }
  },
  /**
   * 删除文件夹
   * @param dir 文件夹路径
   */
  rmdirSync(dir) {
    let files = [];
    if (fs.existsSync(dir)) {
      files = fs.readdirSync(dir);
      files.filter((file) => {
        const curPath = `${dir}/${file}`;
        if (fs.statSync(curPath).isDirectory()) { // recurse
          this.rmdirSync(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
        return true;
      });
      fs.rmdirSync(dir);
    }
  },
  /**
   * 获取文件大小
   * @param filepath 文件绝对路径
   */
  getFileSize(filepath) {
    const stats = fs.statSync(filepath);
    return stats.isFile() ? stats.size : 0;
  },
};
