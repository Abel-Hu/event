const string = requireCommon('string');
const crypto = require('crypto');

module.exports = {
  /**
   * md5加密
   * @param data
   * @returns {String} 返回类型:hex
   */
  md5(data = '') {
    return crypto.createHash('md5').update(string.toString(data)).digest('hex');
  },
  /**
   * 哈希加密
   * @param str 字符串
   */
  sha1(str) {
    return crypto.createHash('sha1').update(string.toString(str)).digest('hex');
  },
  /**
   * hmac_sha1加密
   * @param data
   * @param key
   */
  hmacSha1(data, key) {
    return crypto.createHmac('sha1', string.toString(key)).update(string.toString(data)).digest('hex');
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
    return cipher.update(string.toString(data), 'utf8', 'base64') + cipher.final('base64');
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
    return decipher.update(string.toString(data), 'base64', 'utf8') + decipher.final('utf8');
  },
  /**
   * rsa 256 加密
   * @param data 待加密的数据
   * @param privateKey rsa私钥
   */
  rsa256Encrypt(data, privateKey) {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(string.toString(data));
    return sign.sign(privateKey, 'base64', 'utf8');
  },
  /**
   * rsa 256 加密验证
   * @param data 原文
   * @param encryptData 密文
   * @param publicKey rsa公钥
   */
  rsa256Verify(data, encryptData, publicKey) {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(string.toString(data));
    return verify.verify(publicKey, string.toString(encryptData), 'base64', 'utf8');
  },
  /**
   * base64编码
   * @param data 待编码数据
   */
  base64Encode(data) {
    return Buffer.from(string.toString(data), 'binary').toString('base64').trim();
  },
  /**
   * base64解码
   * @param data 待解码数据
   */
  base64Decode(data) {
    return new Buffer(string.toString(data), 'base64').toString().trim();
  },
};
