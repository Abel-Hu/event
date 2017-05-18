// 启动所有爬虫
const path = require('path');
const fs = require('fs');

const { min, max } = think.config('crawlerRandom');
const { rand } = requireCommon('random');
const crawlerDir = `${think.APP_PATH}${path.sep}crawler${path.sep}service${path.sep}`;
let crawlerlist = fs.readdirSync(crawlerDir);
crawlerlist = crawlerlist.map((v) => {
  const js = v.replace('.js', '');
  return js;
});
crawlerlist.filter((crawler) => {
  const CrawlerService = think.service(crawler, 'crawler');
  const crawlerService = new CrawlerService();
  const timer = setInterval(() => {
    crawlerService.crawler();
    timer._repeat = rand(min, max);
  }, rand(min, max));
  return true;
});
module.exports = crawlerlist;
