/**
 * Created by ken on 2017/6/4.
 */
const {Store, http} = wx.vco
const Api = {
  joinlist: '/api/user/joinlist',
  favlist: '/api/user/favlist'
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
      }
    }
  }

  getJoinlist (reload = false, cb) {
    this.$list(Api.joinlist, this.joinlist, reload, cb)
  }

  getFavlist (reload = false, cb) {
    this.$list(Api.favlist, this.favlist, reload, cb)
  }
}