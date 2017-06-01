/**
 * Created by ken on 2017/5/31.
 */
const {Store, http} = wx.vco
const Api = {
  publish: '/api/event/publish',
  update: '/api/event/update',
  info: '/api/event/info'
}
module.exports = class extends Store {
  state () {
    return {
      list: {
        data: []
      },
      form: {},
      detail: {}
    }
  }

  publish () {

  }

  update () {

  }

  info () {

  }
}