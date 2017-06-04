/**
 * Created by ken on 2017/6/4.
 */
const {Store, http} = wx.vco
const Api = {
  joinlist: '/api/user/joinlist',
  favlist: '/api/user/favlist',
  info: '/api/user/info',
  update: '/api/user/update',
}
module.exports = class extends Store {
  state () {
    return {
      favlist: {
        data: [],
        headSequence: '',
        lastSequence: '',
        pageSize: 10
      },
      joinlist: {
        data: [],
        headSequence: '',
        lastSequence: '',
        pageSize: 10
      },
      userInfo: {}
    }
  }

  getJoinlist (reload = false, cb) {
    this.$list(Api.joinlist, this.joinlist, reload, cb)
  }

  getFavlist (reload = false, cb) {
    this.$list(Api.favlist, this.favlist, reload, cb)
  }

  delFavItem (index) {
    if (index >= 0) this.favlist.data.splice(index, 1)
  }

  /**
   * 获取用户数据
   * @param uid 为空返回自己的数据
   * @param cb
   */
  getUserInfo (uid, cb) {
    http.get(Api.info, {uid}).then(d => {
      this.userInfo = d
      cb && cb()
    })
  }

  /**
   nickName  否  string  用户昵称
   mobile  否  string  用户手机
   birthday  否  date  用户生日(格式：1990-11-12)
   sex  否  int  用户性别(1-男 2-女)
   description  否  string  个性签名
   */
  update (post, cb) {
    http.post(Api.update, post).then(d => {
      cb && cb()
    })
  }
}