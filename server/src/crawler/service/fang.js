const Base = think.service('base', 'common');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

module.exports = class extends Base {
  // 最先执行
  init(...args) {
    super.init(...args);
  }

  /**
   * 爬虫入口
   */
  async crawler() {
    await this.city();
  }

  async city() {
    const url = `http://fang.com/SoufunFamily.htm?t=${moment.now()}`;
    const data = await axios.get(url);
    // const $ = cheerio.load(data.data);
    // console.log($('.letterSelt').html());
    console.log(data.data);
  }
};
