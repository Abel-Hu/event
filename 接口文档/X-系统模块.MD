[返回公共文档](/接口文档/1-公共文档.MD)

# X-系统模块


### 验证token  POST   /api/system/token

无参数

### 响应数据
```json
"data":{
	"token": "xxxxxxxxxx"		// 验证成功后，服务器续期token，用于后续的请求
}
```

### 上传图片  POST   /api/system/upload

参数			|是否必要		|类型			|说明
--				|--				|--				|--
file			|是				|file			|文件上传域的key

### 响应数据
```json
"data": "http://image.ruanzhijun.cn/event/34323434/dPQzP21tlnXVtgBAoZClzz.jpg",	// 图片绝对路径
```
