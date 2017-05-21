# Y-用户模块


### 登录接口  POST   /api/user/login 【免鉴权】

参数			|是否必要		|类型			|说明
--				|--				|--				|--
code			|是				|string			|微信小程序登录返回的code
iv 				|是				|string			|解密偏移量
rawData			|是				|string			|微信小程序登录返回的源数据
encryptedData	|是				|string			|微信小程序登录返回的加密数据

### 响应数据
```json
"data":{
    "openId": "xxxxx",			// 微信小程序第三方id
    "nickName": "小丸子",		// 微信昵称
    "avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
    "isVip": true,				// 是否为大V用户
    "token": "xxxxxxxxxx"		// 登录成功后，服务器颁发的token，用于后续的请求
}
```
