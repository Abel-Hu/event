/**
 * Created by ken on 2017/5/31.
 */
const {Store, http} = wx.vco
const Api = {
  token: '/api/system/token'
}
module.exports = class extends Store {

  checkToken (cb) {
    http.post(Api.token, {}, (d) => {
      cb && cb(d)
    }).then((data) => {
      cb && cb(data)
    })
  }

}