/**
 * Created by ken on 2017/5/31.
 */
const MzMemberKey = 'member' // 登陆缓存key
const Api = {
  login: '/api/user/login'
}
const http = require('./http')
module.exports = function (cb) {
  return Promise.all([
    wx.login(),
    wx.getUserInfo()
  ]).then(([{code}, user]) => {
    const {userInfo, iv, signature, encryptedData, encryptData, rawData} = user
    const params = {code, iv, rawData, encryptedData}
    http.post(Api.login, params).then(({data, code, message}) => {
      cb({userInfo, data, code, message})
    })
  })
}