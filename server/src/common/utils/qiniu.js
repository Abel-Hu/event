// 七牛

const LOG = getLogger(__filename);
const random = requireCommon('random');
const timeUtil = requireCommon('time');
const config = think.config('qiniu');
const qiniu = require('qiniu');

// 七牛配置
qiniu.conf.ACCESS_KEY = config.accesskey;
qiniu.conf.SECRET_KEY = config.secretkey;

// 名空间配置
const bucketConfig = ['image'];

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
   * 上传文件
   * @param bucket 名空间(file：文件, image：图片, report：报告)
   * @param filepath 文件路径
   * @return 文件地址
   */
  upload(bucket, filepath) {
    if (bucketConfig.indexOf(bucket) <= -1) {
      throw new Error(`error bucket, ${bucket}`);
    }
    const uploadToken = this.uptoken;
    return new Promise((resolve, reject) => {
      const extra = new qiniu.io.PutExtra();
      let filename = timeUtil.nowMillisecond();
      filename += '_';
      filename += random.rand(1000000000, 2147483647);
      filename += '_';
      filename += random.rand(1000000000, 2147483647);
      filename += '.';
      filename += filepath.substring(filepath.lastIndexOf('.') + 1).toLowerCase();
      const uptoken = uploadToken(bucket, filename);
      qiniu.io.putFile(uptoken, filename, filepath, extra, (err, ret) => {
        if (!err) {
          let link = 'http://image.ruanzhijun.cn/';
          link += ret.key;
          resolve(link);
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
