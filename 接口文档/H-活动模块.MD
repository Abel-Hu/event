[返回公共文档](/接口文档/1-公共文档.MD)

# H-活动模块


### 用户发布活动  POST   /api/event/publish

#####参数列表
参数			|是否必要		|类型			|说明
--				|--				|--				|--
code			|是				|string			|微信小程序登录返回的code
iv 				|是				|string			|解密偏移量
rawData			|是				|string			|微信小程序登录返回的源数据
encryptedData	|是				|string			|微信小程序登录返回的加密数据

### 响应数据
```json
"data": 1  // 成功返回1，错误返回错误码
```

