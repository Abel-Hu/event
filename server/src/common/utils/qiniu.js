// 七牛

const LOG = getLogger(__filename);
const timeUtil = requireCommon('time');
const config = think.config('qiniu');
const qiniu = require('qiniu');

// 七牛配置
qiniu.conf.ACCESS_KEY = config.accesskey;
qiniu.conf.SECRET_KEY = config.secretkey;

module.exports = {
  /**
   * 返回上传策略
   * @param bucket 名空间
   * @param filename 文件名
   */
  uptoken(bucket, filename) {
    return new qiniu.rs.PutPolicy(filename ? (`${bucket}:${filename}`) : bucket).token();
  },
  /**
   * 上传文件(自动生成文件名)
   * @param sourceFilePath 源文件路径
   * @param targetFilePath 目标文件夹路径
   * @return 文件地址
   */
  upload(sourceFilePath, targetFilePath = '') {
    const uploadToken = this.uptoken;
    return new Promise((resolve, reject) => {
      const extra = new qiniu.io.PutExtra();
      const surfix = sourceFilePath.substring(sourceFilePath.lastIndexOf('.') + 1).toLowerCase();
      const filename = `${targetFilePath}${timeUtil.format('yyyyMMdd')}/${think.uuid(40)}.${surfix}`;
      const uptoken = uploadToken(config.bucket, filename);
      qiniu.io.putFile(uptoken, filename, sourceFilePath, extra, (err, ret) => {
        if (!err) {
          resolve(`${config.baseURL}${ret.key}`);
        } else {
          // 上传失败， 处理返回代码
          LOG.error(err);
          reject(err);
        }
      });
    }).catch((error) => {
      LOG.error(error);
    });
  },
};
