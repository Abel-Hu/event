[返回公共文档](/接口文档/1-公共文档.MD)

# Y-用户模块


### 用户登录  POST   /api/user/login 【免鉴权】

参数			|是否必要		|类型			|说明
--				|--				|--				|--
code			|是				|string			|微信小程序登录返回的code
iv 				|是				|string			|解密偏移量
rawData			|是				|string			|微信小程序登录返回的源数据
encryptedData	|是				|string			|微信小程序登录返回的加密数据

### 响应数据
```json
"data":{
    "uid": "5921d4c6ea3",		// 用户id
    "nickName": "小丸子",		// 微信昵称
	"mobile":"13800138000",		// 用户手机
	"sex":2,		// 用户性别(1-男 2-女)
    "avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
    "isVip": true,			// 是否为大V用户
    "token": "xxxxxxxxxx"		// 登录成功后，服务器颁发的token，用于后续的请求
}
```

### 用户个人资料  GET   /api/user/info

参数			|是否必要		|类型			|说明
无

### 响应数据
```json
"data":{
    "uid": "5921d4c6ea3",		// 用户id
    "nickName": "小丸子",		// 微信昵称
	"mobile":"13800138000",		// 用户手机
	"sex":2,		// 用户性别(1-男 2-女)
    "avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
    "isVip": true			// 是否为大V用户
}
```