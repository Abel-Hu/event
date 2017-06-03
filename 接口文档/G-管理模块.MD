[返回公共文档](/接口文档/1-公共文档.MD)

# G-管理模块


### 用户列表  POST   /api/manage/userlist

参数			|是否必要		|类型			|说明
--				|--				|--				|--
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)
nickName		|否				|string			|搜索用户昵称(模糊搜索)
order			|否				|string			|可排序属性(可选：uid-注册时间；eventPublishs-发布活动数；eventJoins-参与活动数)，默认注册时间
by				|否				|string			|排序方式(可选：asc-顺序；desc-倒序)，默认倒序

### 响应数据
```json
"list":[{				
	"uid": "5921d4c6ea3",			// 用户id
	"nickName": "小丸子",			// 微信昵称
	"description":"刷锅一枚",		// 个性签名
	"sex":2,				// 用户性别(1-男 2-女)
	"avatarUrl": "http://xx/0",		// 微信头像(地址是微信的)
	"isVip": true,				// 是否为大V用户
	"mobile": "13800138000",		// 手机号
	"birthday": "2016-11-11",		// 生日				
	"sex": 1,				// 性别(1-男 2-女)
	"description": "呵呵",			// 个性签名
	"updateTime": "1496414030182",		// 最后修改时间
	"createTime": "1496414030182",		// 注册时间
	"ip": "116.23.94.159"			// 注册ip
},{...}]
```


### 修改用户数据  POST   /api/manage/userupdate

参数			|是否必要		|类型			|说明
--				|--				|--				|--
uid				|是				|string			|用户id
isVip			|否				|boolean		|是否为大V用户

### 响应数据
```json
"data": 1	// 修改成功返回1，错误返回错误码
```


### 活动列表  POST   /api/manage/eventlist

参数			|是否必要		|类型			|说明
--				|--				|--				|--
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)
title			|否				|string			|搜索活动标题(模糊搜索)
order			|否				|string			|可排序属性(可选：uid-注册时间；eventPublishs-发布活动数；eventJoins-参与活动数)，默认注册时间
by				|否				|string			|排序方式(可选：asc-顺序；desc-倒序)，默认倒序

### 响应数据
```json
"list":[{
	"eventId": "59326d60cc01993204d2f07a",	// 活动id
	"uid": "5931774e6a54be1b0d91e27f",	// 用户id
	"title": "测试活动标题—2",		// 活动标题
	"description": "xxxxxxxxxx",		// 活动描述
	"image": "http://xx.com/1.jpg"		// 活动图片
	"longitude": 115.45,			// 活动所在地点的经度
	"latitude": 21.54,			// 活动所在地点的纬度
	"address": "珠江新城马场路14号",		// 活动所在地址
	"createTime": "1496477024011",		// 活动发布时间
	"deadline": "1497088800000",		// 报名截至时间
	"joinLimit": 3,			// 报名人数限制(0为不限制)
	"comment": 0,			// 评论数
	"join": 0,			// 已报名的人数
	"share": 0,			// 分享人数
	"fav": 0,			// 收藏人数
	"uv": 0,			// 看过的人数
	"status": 1,			// 活动状态(1-正常 2-下架)
	"endTime": "1497434400000",		// 活动结束时间
	"startTime": "1496588400000"	// 活动开始时间
},{...}]
```
