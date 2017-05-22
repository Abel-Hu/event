[返回公共文档](https://github.com/share-group/event/blob/master/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/1-%E5%85%AC%E5%85%B1%E6%96%87%E6%A1%A3.MD)

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
