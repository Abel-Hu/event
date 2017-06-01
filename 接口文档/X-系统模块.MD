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
