/**
 * Created by ken on 2017/5/21.
 */
const {Store, http} = wx.vco
const MzMemberKey = 'member' // 登陆缓存key
const Api = {
  login: '/api/user/login'
}
module.exports = class extends Store {
  state () {
    return {
      member: {},
      ns: 'wechat/member',
      get toMember () {
        return JSON.stringify(this.member)
      }
    }
  }

  getMember () {
    let member = wx.getStorageSync(MzMemberKey) || {}
    if (Object.keys(member).length === 0) {
      Promise.all([
        wx.login(),
        wx.getUserInfo()
      ]).then(([{code}, user]) => {
        const {userInfo, iv, signature, encryptedData, encryptData, rawData} = user
        const params = {code, iv, rawData,encryptedData}
        http.post(Api.login, params).then(({data, code, message}) => {
          member = Object.assign(userInfo, data)
          wx.setStorageSync(MzMemberKey, member)
          this.member = member

        })
      })
      return
    }
    this.member = member
  }
}
