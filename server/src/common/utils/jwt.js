const LOG = getLogger(__filename);
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = class {
  /**
   * 构造函数
   * @param publicKey 公钥文件
   * @param privateKey 私钥文件
   */
  constructor(publicKey, privateKey) {
    this.publicKey = fs.readFileSync(publicKey, 'utf-8');
    this.privateKey = fs.readFileSync(privateKey, 'utf-8');
  }

  /**
   * jwt加密
   * @param data 要加密的数据
   * @param expiresIn 过期时间(单位：秒)
   */
  async encrypt(data, expiresIn) {
    const encrypt = await jwt.sign(data || {}, this.privateKey, { algorithm: 'RS256', expiresIn });
    return encrypt;
  }

  /**
   * jwt解密
   * @param data 待解密数据
   */
  async decrypt(data) {
    if (think.isEmpty(data)) {
      LOG.error('token is empty');
      return null;
    }
    try {
      const json = await jwt.verify(data, this.publicKey);
      delete json.iat;
      delete json.exp;
      return json;
    } catch (e) {
      LOG.error(`token decrypt error, token: ${data}`);
      LOG.error(e);
      return null;
    }
  }
};
