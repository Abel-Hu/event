// 造数据
const axios = require('axios');

const host = 'https://testevent.ruanzhijun.cn';
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJkZXZlbG9wbWVudCIsImlhdCI6MTQ5NjQxMjAzNCwiZXhwIjoxNDk5MDA0MDM0fQ.v0wTDky9xTTxptp54ukWSU4c3cPvBkepN_PvLKZGSNMxPT3ZGiJYlxP7Xh1kqmyv_fVmmilvoPslhXzplQh57KssyMyaImx2v3x6nqF3gaV6Jm3zJWuQt_QTy57uAA8yqsU9bzUj-Ee0iOwO23HMqAeRUA8K6tNKkU_KFJgJhrRkHNd2Zvc9sVXVrj-lBNbnCgSLIzeQr4pq_Bhv9M6orPnsF40EmqOETABIUjqCpti4oR-A3M6OMJ4zk2fpvz-qcidUNp2m0Aj-ngu1JGFtfpIMC5JAaHGN_x8pmjIg1pPWkOxMcM3Mgy7nS8pbDLvYJjlL5B82dzzsZYus_6n3rQ';


const httpClient = axios.create({
  baseURL: host,
  headers: { token }
});


// 发布活动
for (let i = 1; i < 10; i++) {
  httpClient.post(`${host}/api/event/publish`, {
    title: `测试活动标题—${i}`,
    description: `${i}测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~`,
    images: ['http://image.ruanzhijun.cn/event/1.jpg', 'http://image.ruanzhijun.cn/event/2.JPEG', 'http://image.ruanzhijun.cn/event/3.jpg'],
    longitude: 113.45 + i,
    latitude: 23.54 - i,
    address: `珠江新城马场路${i * 7}号`,
    startTime: '2017-06-02 23:00:00',
    endTime: '2017-06-14 18:00:00',
    joinLimit: 3,
    deadline: '2017-06-10 18:00:00'
  }).then((response) => {
    console.log(response);
  });
}