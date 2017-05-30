[返回公共文档](/接口文档/1-公共文档.MD)

# H-活动模块


### 用户发布活动  POST   /api/event/publish

#####参数列表
参数			|是否必要		|类型			|说明
--				|--				|--				|--
title			|是				|string			|活动标题
description		|是				|string			|活动详情
images			|是				|array			|活动图片
longitude		|是				|float			|活动所在地点的经度(-180 ~ 180)
latitude		|是				|float			|活动所在地点的纬度(-90 ~ 90)
startTime		|是				|date			|活动开始时间(格式：2017-02-14 18:00:00)
endTime			|是				|date			|活动结束时间(格式：2017-02-15 18:00:00)
joinLimit		|是				|int			|报名人数上限(0为不限制)
deadline		|是				|date			|报名截至时间(格式：2017-02-14)


### 响应数据
```json
"data": {
	"eventId":"592dafe8518d2924f022a70d",	// 活动id
	"userEventPublishs":20		// 当前用户发布过的总活动数
}
```

