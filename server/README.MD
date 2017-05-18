# “活动小程序”服务器api文档

## 注意事项
```json
服务器地址：https://event.ruanzhijun.cn
```

## 请求方式
```javascript
支持form表单方式提交或者raw json方式提交

// form表单方式
let data = {};
data.a = 1;
data.b = 2;
let res = await http.post('/url/url/url', data);

// raw json方式
let data = '{"a":1, "b":2}';
let res = await http.post('/url/url/url', data);
```

## 公共返回结构
```json
{	
	"code":1,						// 请求状态代码，1表示正常，非1表示异常，具体参考message
	"data":"实业误国，炒楼兴邦...",	// 根据不同接口，data的内容各不相同，具体参考各接口的文档
	"message":"请求出错",			// 错误信息，当且仅当code非1，才有此字段
	"time":1484113400126			// 当前服务器时间戳(单位：毫秒)
}
```

### 登录接口  POST   /api/user/login

参数			|是否必要		|类型			|说明
--				|--				|--				|--
lang			|否				|string			|语言(zh-中文; en-英文)，默认中文
code			|是				|string			|微信小程序登录返回的code
iv 				|是				|string			|解密偏移量
rawData			|是				|string			|微信小程序登录返回的源数据
encryptedData	|是				|string			|微信小程序登录返回的加密数据

### 响应数据
```json
"data":{
	// 服务器有自动对token续期的功能，由于微信小程序不可以在response header接收数据
	// 所以这个两个字段有可能在任何接口都会出现
	// 客户端自行做好token和语言环境的刷新逻辑
	"token":"nlkhkjjkkj",		// 登录成功后，服务器颁发的token，用于后续的请求
	"lang":"zh"					// 本次登录的语言环境
}
```