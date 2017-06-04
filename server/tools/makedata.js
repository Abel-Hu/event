// 造数据
const axios = require('axios');

// const host = 'https://testevent.ruanzhijun.cn';
const host = 'http://127.0.0.1:59394/';
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1OTMxNzc0ZTZhNTRiZTFiMGQ5MWUyN2YiLCJlbnYiOiJkZXZlbG9wbWVudCIsImlhdCI6MTQ5NjQ3MjQ0NywiZXhwIjoxNDk5MDY0NDQ3fQ.c3hQWKhqEsL9JVxxYzWdIwQXrj23D_to-dqk_HvQsEk9HeCSG_SpOqJAY4e8w2s6kTxd-rB4-qIRdSNBXrJiFKsDE-J51--4zzfIC2pBIS0lM_fTc1XvTE3fbi3q7N9jwT0LhjFnsJpJYVVDlyhdfvNgFSO0Fz-xndeb9vZ1HSSpvWIJyZmpcggPDKDtLFAmOAAgg1SmDM1sXdH34vQxt4ej4lgChOYEUTWOAYvonhERAnhHdogeoLxQ0B4-00WTylc97O-Jp_H2GC06wpbk4qscwPqjxBXpE9jEJEsn0EPVcj5xnoHrqy4H500dNk3vSzDOpnkojgvm_gueMxVQhA';


const httpClient = axios.create({
  baseURL: host,
  headers: { token },
});

// 收藏活动
function eventFav() {
  httpClient.post('/api/event/fav', {
    eventId: '593177746a54be1b0d91e288',
  }).then((response) => {
    console.log(JSON.stringify(response.data));
  });
}

// 取消收藏活动
function eventUnfav() {
  httpClient.post('/api/event/unfav', {
    eventId: '593177746a54be1b0d91e288',
  }).then((response) => {
    console.log(JSON.stringify(response.data));
  });
}

// 活动详情
function eventInfo() {
  httpClient.get('/api/event/info?eventId=593177746a54be1b0d91e288').then((response) => {
    console.log(JSON.stringify(response.data));
  });
}


// 活动列表
function eventList() {
  httpClient.get('/api/event/list').then((response) => {
    console.log(JSON.stringify(response.data));
  });
}

// 发布活动
function eventPublish() {
  for (let i = 1; i < 10; i += 1) {
    httpClient.post('/api/event/publish', {
      title: `测试活动标题—${i}`,
      description: `${i}测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~测试活动描述，好长啊~~好长啊~~好长啊~~`,
      images: ['http://image.ruanzhijun.cn/event/1.jpg', 'http://image.ruanzhijun.cn/event/2.JPEG', 'http://image.ruanzhijun.cn/event/3.jpg'],
      longitude: 113.45 + i,
      latitude: 23.54 - i,
      address: `珠江新城马场路${i * 7}号`,
      startTime: '2017-06-04 23:00:00',
      endTime: '2017-06-14 18:00:00',
      joinLimit: 3,
      deadline: '2017-06-10 18:00:00',
    }).then((response) => {
      console.log(JSON.stringify(response.data));
    });
  }
}

// 发表评论
function eventCommentAdd() {
  httpClient.post('/api/event/commentadd', {
    eventId: '593177746a54be1b0d91e288',
    content: '好好玩~！~！',
  }).then((response) => {
    console.log(JSON.stringify(response.data));
  });
}


// /////////////////////////////////////////////////////////////////
eventPublish();
// /////////////////////////////////////////////////////////////////
