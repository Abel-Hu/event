/**
 * Created by ken on 2017/5/21.
 */
const {extendObservable} = require('./mobx')
module.exports = class {
  constructor () {
    (this.state && typeof this.state === 'function') && extendObservable(this, this.state())
  }

  $tips (message) {
    let msg = ''
    if (typeof message === 'object') {
      Object.keys(message).map(k => {
        msg += `${message[k]}\n`
      })
    }
    else {
      msg = message
    }
    wx.showToast({
      title: msg,
      icon: 'loading',
      duration: 1500
    })
  }
}
