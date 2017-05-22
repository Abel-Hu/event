const crypto = require('crypto');

module.exports = {
  /**
   * md5加密
   * @param data
   * @returns {String} 返回类型:hex
   */
  md5(data = '') {
    return crypto.createHash('md5').update(data).digest('hex');
  },

  /**
   * 哈希加密
   * @param str 字符串
   */
  sha1(str) {
    return crypto.createHash('sha1').update(str).digest('hex');
  },

  /**
   * hmac_sha1加密
   * @param data
   * @param key
   * @returns {String} 返回类型:hex
   */
  hmacSha1(data, key, outCode = 'hex') {
    return crypto.createHmac('sha1', key).update(data).digest(outCode);
  },

  /**
   * des3加密
   * @param data 数据类型:utf8
   * @param key
   * @returns {String} 返回类型:base64
   */
  des3Encrypt(data, key) {
    let encryptKey = key;
    if (encryptKey.length > 24) {
      encryptKey = encryptKey.substring(0, 24);
    } else {
      throw new Error('Wrong key size');
    }
    const cipher = crypto.createCipheriv('des-ede3', new Buffer(encryptKey), new Buffer(0));
    return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
  },

  /**
   * des3解密
   * @param data 数据类型:base64
   * @param key
   * @returns {String} 返回类型:utf8
   */
  des3Decrypt(data, key) {
    let decrypt = key;
    if (decrypt.length > 24) {
      decrypt = decrypt.substring(0, 24);
    } else {
      throw new Error('Wrong key size');
    }
    const decipher = crypto.createDecipheriv('des-ede3', new Buffer(decrypt), new Buffer(0));
    return decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
  },
  /**
   * aes解密
   * @param data 待解密的数据
   * @param key 加密key
   * @param iv 位移量
   */
  aesDecrypt(data, key, iv) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    return decipher.update(data, 'binary', 'utf8') + decipher.final('utf8');
  },
  /**
   * rsa 256 加密
   * @param data 待加密的数据
   * @param key rsa私钥
   */
  rsa256Encrypt(data, key) {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(data);
    return sign.sign(key, 'base64', 'utf8');
  },
  /**
   * rsa 256 解密
   * @param data 待解密的数据
   * @param key rsa公钥
   */
  rsa256Decrypt(data, key) {
    const decipher = crypto.createDecipheriv('RSA-SHA256', new Buffer(key), new Buffer(0));
    return decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
  },
  /**
   * rsa 256 加密验证
   * @param data 原文
   * @param encryptData 密文
   * @param key rsa公钥
   */
  rsa256Verify(data, encryptData, key) {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(data);
    return verify.verify(key, encryptData, 'base64', 'utf8');
  },
  /**
   * base64编码
   * @param data 待编码数据
   */
  base64Encode(data) {
    return Buffer.from(data.toString().trim(), 'binary').toString('base64').trim();
  },
  /**
   * base64解码
   * @param data 待解码数据
   */
  base64Decode(data) {
    return new Buffer(data.toString().trim(), 'base64').toString().trim();
  },
};
