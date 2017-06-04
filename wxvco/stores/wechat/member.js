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
      member: {}
    }
  }

  getMember (cb) {
    if (cb === true) {
      wx.removeStorageSync(MzMemberKey)
    }
    const returnMember = (member) => {
      this.member = member
      wx.vco.data.token = member.token
      typeof cb === 'function' && cb(member)
    }
    let member = wx.getStorageSync(MzMemberKey) || {}
    if (Object.keys(member).length === 0) {
      Promise.all([
        wx.login(),
        wx.getUserInfo()
      ]).then(([{code}, user]) => {
        const {userInfo, iv, signature, encryptedData, encryptData, rawData} = user
        const params = {code, iv, rawData, encryptedData}
        http.post(Api.login, params).then((data) => {
          member = Object.assign(userInfo, data)
          wx.setStorageSync(MzMemberKey, member)
          returnMember(member)
        })
      })
    } else {
      returnMember(member)
    }
  }

  updateToken (token) {
    this.member.token = token
    wx.vco.data.token = token
    wx.setStorageSync(MzMemberKey, JSON.parse(JSON.stringify(this.member)))
  }
}
