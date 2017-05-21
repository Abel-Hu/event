/**
 * Created by ken on 2017/5/21.
 */
const {regeneratorRuntime, Store} = wx.vco
const LoginTimeOut = 604700 //  登陆过期时间 秒为单位 默认为 7天 ：604700
const MzMemberKey = 'member' // 登陆缓存key
const Api = {
  login: '/api/user/login'
}
module.exports = class extends Store {
  state() {
    return {
      member: {},
      ns: 'wechat/member',
      get toMember() {
        return JSON.stringify(this.member)
      }
    }
  }

  * getMember() {
    console.log('getmember')
    let member = yield wx.getStorage({key: MzMemberKey})
    member = member && member.data || {}

    /**
     * 7天时间 7天后退出登陆过
     * @type {number}
     */
    if (Object.keys(member).length > 0) {
      member.now = member.now || 0
      let nowTimeOut = Date.now() / 1000 - member.now
      if (nowTimeOut > LoginTimeOut) {
        yield wx.removeStorage({key: MzMemberKey})
        member = {}
      }
    }
    /**
     * 7天后注销重新登录
     */

    if (Object.keys(member).length === 0) {
      let {code} = yield wx.login()
      const user = yield wx.getUserInfo()
      const {userInfo, iv, signature, encryptedData, encryptData, rawData} = user
      member = userInfo
      member.code = code
      //console.log(userInfo, iv, signature, encryptedData, encryptData, rawData, code)
      /*let {object, code, message} = yield http.post(Api.login, { code, rawData, iv, encryptedData})

       if (code === 1) {
       member = Object.assign(member, object)
       }
       yield wx.setStorage({key: MzMemberKey, data: member}) // 微信异步set*/
      yield wx.setStorage({key: MzMemberKey, data: member}) // debug
    }
    this.member = member
    //
    //getApp().member = member// 约定token
    return this.member
  }
}
