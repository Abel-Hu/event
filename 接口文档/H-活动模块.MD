[返回公共文档](/接口文档/1-公共文档.MD)

# H-活动模块


### 用户发布活动  POST   /api/event/publish

参数			|是否必要		|类型			|说明
--				|--				|--				|--
title			|是				|string			|活动标题
description		|是				|string			|活动详情
images			|是				|array			|活动图片
longitude		|是				|float			|活动所在地点的经度(-180 ~ 180)
latitude		|是				|float			|活动所在地点的纬度(-90 ~ 90)
address			|是				|string			|活动所在地址
startTime		|是				|date			|活动开始时间(格式：2017-02-14 18:00:00)
endTime			|是				|date			|活动结束时间(格式：2017-02-15 18:00:00)
joinLimit		|是				|int			|报名人数上限(0为不限制)
deadline		|是				|date			|报名截至时间(格式：2017-02-14 18:00:00)


### 响应数据
```json
"data": {
	"eventId":"592dafe8518d2924f022a70d",	// 活动id
	"userEventPublishs":20			// 当前用户发布过的总活动数
}
```

### 用户修改活动  POST   /api/event/update

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id
title			|否				|string			|活动标题
description		|否				|string			|活动详情
images			|否				|array			|活动图片
longitude		|否				|float			|活动所在地点的经度(-180 ~ 180)
latitude		|否				|float			|活动所在地点的纬度(-90 ~ 90)
address			|否				|string			|活动所在地址
startTime		|否				|date			|活动开始时间(格式：2017-02-14 18:00:00)
endTime			|否				|date			|活动结束时间(格式：2017-02-15 18:00:00)
joinLimit		|否				|int			|报名人数上限(0为不限制，只可增多，不可减少)
deadline		|否				|date			|报名截至时间(格式：2017-02-14 18:00:00)


### 响应数据
```json
"data": 1	// 修改成功返回1，错误返回错误码
```

### 活动详情  GET   /api/event/info

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id

### 响应数据
```json
"data": {
	"title":"耍牛满免费试吃活动",			// 活动标题
	"description":"有颜值的牛肉火锅",		// 当前用户发布过的总活动数
	"images":[					// 活动图片(无限张)
		"https://xxxx.com/xxx.png",
		"https://xxxx.com/xxx.png",
		"..."
	],
	"userBase":{					// 发布者用户信息
		"uid": "5921d4c6ea3",			// 用户id
		"nickName": "小丸子",			// 微信昵称
		"description":"刷锅一枚",		// 个性签名
		"sex":2,				// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
		"isVip": true				// 是否为大V用户
	},
	"longitude":113.234,				// 活动所在地点的经度
	"latitude":23.234,				// 活动所在地点的纬度
	"address":"琶醍B区",			// 活动所在地址
	"createTime":1477423423456,			// 活动发布时间
	"startTime":1478423423456,			// 活动开始时间
	"endTime":1498423423456,			// 活动结束时间
	"isFav":true,					// 我是否有收藏这个活动
	"fav":432443,					// 收藏人数
	"uv":139804,					// 看过的人数
	"share":235435,					// 分享的人数
	"comment":6345455,				// 评论数
	"join":75445,					// 已报名的人数
	"joinLimit":100000,				// 报名人数限制
	"joinList":[{					// 报名人列表(取前10个)
		"uid": "5921d4c6ea3",			// 用户id
		"nickName": "小丸子",			// 微信昵称
		"description":"刷锅一枚",		// 个性签名
		"sex":2,				// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
		"isVip": true				// 是否为大V用户
	},{...}],
	"favList":[{					// 收藏人列表(取前10个)
		"uid": "5921d4c6ea3",			// 用户id
		"nickName": "小丸子",			// 微信昵称
		"description":"刷锅一枚",		// 个性签名
		"sex":2,				// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
		"isVip": true				// 是否为大V用户
	},{...}],
	"lastCommentSequence":"3twrag",	// 评论列表翻页游标(空即是commentList连10条都不够)
	"commentList":[{				// 评论列表(取前10个)
		"userBase":{				// 发布评论的用户信息
			"uid": "5921d4c6ea3",		// 用户id
			"nickName": "小丸子",		// 微信昵称
			"description":"刷锅一枚",	// 个性签名
			"sex":2,			// 用户性别(1-男 2-女)
			"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
			"isVip": true			// 是否为大V用户
		},
		"replyUserBase":{			// 被回复的用户信息(可能没有)
			"uid": "5921d4c6ea3",		// 用户id
			"nickName": "小丸子",		// 微信昵称
			"description":"刷锅一枚",	// 个性签名
			"sex":2,			// 用户性别(1-男 2-女)
			"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
			"isVip": true			// 是否为大V用户
		},
		"commentId":"ni78ot9yohn09h89",	// 评论id
		"content":"这个好玩！",			// 评论内容
		"createTime":1477423423456,		// 评论发表时间
	},{...}]
}
```

### 活动列表  GET   /api/event/list

参数			|是否必要		|类型			|说明
--				|--				|--				|--
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)

### 响应数据
```json
"list": [{
	"eventId":"b45h98og6f",				// 活动id
	"title":"耍牛满免费试吃活动",			// 活动标题
	"image":"http://xxxx.com/xx.jpg",		// 活动图片
	"isFav":true,					// 我是否有收藏这个活动
	"join":75445,					// 已报名的人数
	"joinList":[{					// 报名人列表(取前10个)
		"uid": "5921d4c6ea3",			// 用户id
		"nickName": "小丸子",			// 微信昵称
		"description":"刷锅一枚",		// 个性签名
		"sex":2,				// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
		"isVip": true				// 是否为大V用户
	},{...}]
},{...}]
```


### 收藏活动  POST   /api/event/fav

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id

### 响应数据
```json
"data": 1	// 修改成功返回1，错误返回错误码
```

### 取消收藏活动  POST   /api/event/unfav

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id

### 响应数据
```json
"data": 1	// 修改成功返回1，错误返回错误码
```


### 报名参加活动  POST   /api/event/join

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id

### 响应数据
```json
"data": 1	// 修改成功返回1，错误返回错误码
```


### 评论活动  POST   /api/event/commentadd

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id
content			|是				|string			|评论内容
replyUid		|否				|string			|回复的用户id(即@)

### 响应数据
```json
"data": {
	"userBase":{				// 发布评论的用户信息
		"uid": "5921d4c6ea3",		// 用户id
		"nickName": "小丸子",		// 微信昵称
		"description":"刷锅一枚",	// 个性签名
		"sex":2,			// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
		"isVip": true			// 是否为大V用户
	},
	"replyUserBase":{			// 被回复的用户信息(可能没有)
		"uid": "5921d4c6ea3",		// 用户id
		"nickName": "小丸子",		// 微信昵称
		"description":"刷锅一枚",	// 个性签名
		"sex":2,			// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
		"isVip": true			// 是否为大V用户
	},
	"commentId":"ni78ot9yohn09h89",	// 评论id
	"content":"这个好玩！",			// 评论内容
	"createTime":1477423423456,		// 评论发表时间
}
```

### 删除活动评论  POST   /api/event/commentdel

参数			|是否必要		|类型			|说明
--				|--				|--				|--
commentId		|是				|string			|评论id

### 响应数据
```json
"data": 1	// 修改成功返回1，错误返回错误码
```


### 评论列表  GET   /api/event/commentlist

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)


### 响应数据
```json
"list":[{				// 评论列表(取前10个)
	"userBase":{				// 发布评论的用户信息
		"uid": "5921d4c6ea3",		// 用户id
		"nickName": "小丸子",		// 微信昵称
		"description":"刷锅一枚",	// 个性签名
		"sex":2,			// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
		"isVip": true			// 是否为大V用户
	},
	"replyUserBase":{			// 被回复的用户信息(可能没有)
		"uid": "5921d4c6ea3",		// 用户id
		"nickName": "小丸子",		// 微信昵称
		"description":"刷锅一枚",	// 个性签名
		"sex":2,			// 用户性别(1-男 2-女)
		"avatarUrl": "http://xx/0",	// 微信头像(地址是微信的)
		"isVip": true			// 是否为大V用户
	},
	"commentId":"ni78ot9yohn09h89",	// 评论id
	"content":"这个好玩！",			// 评论内容
	"createTime":1477423423456,		// 评论发表时间
},{...}]
```

### 报名列表  GET   /api/event/joinlist

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)


### 响应数据
```json
"list":[{				// 报名人列表(取前10个)
	"uid": "5921d4c6ea3",			// 用户id
	"nickName": "小丸子",			// 微信昵称
	"description":"刷锅一枚",		// 个性签名
	"sex":2,				// 用户性别(1-男 2-女)
	"avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
	"isVip": true				// 是否为大V用户
},{...}]
```


### 分享上报  POST   /api/event/share

参数			|是否必要		|类型			|说明
--				|--				|--				|--
eventId			|是				|string			|活动id

### 响应数据
```json
"data": 1	// 修改成功返回1，错误返回错误码
```
