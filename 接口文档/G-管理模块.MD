[返回公共文档](/接口文档/1-公共文档.MD)

# G-管理模块


### 用户列表  POST   /api/manage/userlist

参数			|是否必要		|类型			|说明
--				|--				|--				|--
lastSequence	|否				|string			|上一页游标(第一页不传)
pageSize		|否				|int			|页面大小(默认、最大：30)
headSequence	|否				|string			|顶部游标(上拉刷新)
nickName		|否				|string			|搜索用昵称(模糊搜索)
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
	"sex": 1,					// 性别(1-男 2-女)
	"description": "呵呵",				// 个性签名
	"openId": "om0oZ0R0ESHEW_2_d-2nZTOy1AsM",// 微信第三方id
	"updateTime": "1496414030182",		// 最后修改时间
	"createTime": "1496414030182",		// 注册时间
	"ip": "116.23.94.159"				// 注册ip
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
