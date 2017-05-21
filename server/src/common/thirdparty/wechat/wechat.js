/**
 * 微信SDK
 */
const config = think.config('wechatSDK');
const LOG = getLogger(__filename);
const crypto = require('crypto');
const axios = require('axios');

module.exports = {
  /**
   * 通过code换取会话密钥session_key
   * @param code 用户授权后获得的code
   */
  async getSessionKeyByCode(code) {
    let url = 'https://api.weixin.qq.com/sns/jscode2session?';
    const data = {
      appid: config.wxAppId,
      secret: config.wxAppSecret,
      js_code: code,
      grant_type: 'authorization_code',
    };
    Object.keys(data).filter((k) => {
      url += `${k}=${data[k]}&`;
      return true;
    });
    url = url.substring(0, url.length - 1);
    const response = await axios.get(url);
    LOG.warn(`get sessionKey by js_code from wechat, code: ${code}, data: ${JSON.stringify(response.data)}`);
    return response.data;
  },
  /**
   * 微信小程序登录数据解密
   * @param data 微信小程序登录数据
   */
  async wxLoginDataDataDecrypt(data) {
    let {sessionKey} = await this.getSessionKeyByCode(data.code);
    if (!think.isEmpty(sessionKey.errcode)) {
      return {};
    }

    // 解析出来的结构
    // {"session_key":"mbmix9T8JLbRvBesHr0QWw==","expires_in":7200,"openid":"om0oZ0R0ESHEW_2_d-2nZTOy1AsM"}
    sessionKey = new Buffer(sessionKey.sessionk_ley, 'base64');
    const encryptedData = new Buffer(data.encryptedData, 'base64');
    const iv = new Buffer(data.iv, 'base64');

    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      let decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);

      // 验证水印是否正确
      if (decoded.watermark.appid !== config.wxAppId) {
        LOG.error(`appId error, appId: ${config.wxAppId}, watermark.appid: ${decoded.watermark.appid}`);
        return {};
      }

      // 验证userinfo是否正确
      const rawData = JSON.parse(data.rawData);
      Object.keys(rawData).filter((key) => {
        if (rawData[key] !== decoded[key]) {
          decoded = {};
          this.LOG.error(`check rawData error, rawData: ${JSON.stringify(rawData)}, wxdata: ${decoded}`);
          return true;
        }
        return true;
      });

      return decoded;
    } catch (err) {
      LOG.error(err);
      return {};
    }
  },
};
