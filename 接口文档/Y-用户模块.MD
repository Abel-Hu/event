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
	"birthday":"1990-11-12",	// 用户生日
	"sex":2,			// 用户性别(1-男 2-女)
	"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
	"isVip": true,			// 是否为大V用户
	"description":"哈哈哈",		// 个性签名
	"eventPublishs":123,		// 发布的活动数
	"eventJoins":123,		// 参与的活动数
	"isManager":true,		// 是否为管理员
	"token": "xxxxxxxxxx"		// 登录成功后，服务器颁发的token，用于后续的请求
}
```

### 用户个人资料  GET   /api/user/info

参数			|是否必要		|类型			|说明
--				|--				|--				|--
uid		 		|否				|string			|要查看的用户uid(如果不传或者传自己的uid，将以主态形式查看自己的个人资料；否则将以客态的形式查看ta的个人资料)

### 响应数据
```json
"data":{
	"uid": "5921d4c6ea3",		// 用户id
	"nickName": "小丸子",		// 微信昵称
	"mobile":"13800138000",		// 用户手机
	"birthday":"1990-11-12",	// 用户生日
	"sex":2,			// 用户性别(1-男 2-女)
	"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
	"isVip": true,			// 是否为大V用户
	"description":"哈哈哈",		// 个性签名
	"eventPublishs":123,		// 发布的活动数
	"eventJoins":123		// 参与的活动数
}
```

### 修改用户个人资料  POST   /api/user/update

参数			|是否必要		|类型			|说明
--				|--				|--				|--
nickName 		|否				|string			|用户昵称
mobile 			|否				|string			|用户手机
birthday 		|否				|date			|用户生日(格式：1990-11-12)
sex		 		|否				|int			|用户性别(1-男 2-女)
description		|否				|string			|个性签名


### 响应数据
```json
"data":{
	"uid": "5921d4c6ea3",		// 用户id
	"nickName": "小丸子",		// 微信昵称
	"mobile":"13800138000",		// 用户手机
	"birthday":"1990-11-12",	// 用户生日
	"sex":2,			// 用户性别(1-男 2-女)
	"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
	"isVip": true,			// 是否为大V用户
	"description":"哈哈哈",		// 个性签名
	"eventPublishs":123,		// 发布的活动数
	"eventJoins":123		// 参与的活动数
}
```


### 我参与的活动列表  GET   /api/user/joinlist

参数			|是否必要		|类型			|说明
--				|--				|--				|--
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)


### 响应数据
```json
"list":[{
	"eventId":"bykuhioj",			// 活动id
	"title":"耍牛满试吃",			// 活动标题
	"image":"http://xxxx.com/xx.jpg",	// 活动图片
},{...}]
```


### 我收藏过的活动列表  GET   /api/user/favlist

参数			|是否必要		|类型			|说明
--				|--				|--				|--
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)


### 响应数据
```json
"list":[{
	"eventId":"bykuhioj",			// 活动id
	"title":"耍牛满试吃",			// 活动标题
	"image":"http://xxxx.com/xx.jpg",	// 活动图片
},{...}]
```
