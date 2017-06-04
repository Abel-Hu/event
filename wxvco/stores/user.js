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
        lastSequence: '',
        headSequence: ''
      },
      joinlist: {
        data: [],
        lastSequence: '',
        headSequence: ''
      }
    }
  }
  getFavList(){

  }
  getJoinList(){

  }
}