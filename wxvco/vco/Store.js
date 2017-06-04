/**
 * Created by ken on 2017/5/21.
 */
const {extendObservable} = require('./mobx')
const http = require('./http')
module.exports = class {
  constructor () {
    (this.state && typeof this.state === 'function') && extendObservable(this, this.state())
  }

  /**
   * 公共提示
   * @param message
   */
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

  /**
   * 公共的浮标翻页
   * @param url
   * @param object$
   * @param reload 上拉刷新
   * @param cb
   * @param method 获取数据的方法
   * @returns {*}
   */
  $list (url, object$, reload = false, cb, method = 'get') {
    let params = {
      pageSize: object$.pageSize || 10
    }
    if (reload && this.list.headSequence) {
      params.headSequence = object$.headSequence
    } else if (object$.lastSequence) {
      params.lastSequence = object$.lastSequence
    } else if (object$.lastSequence === false) {
      return cb && cb()
    }

    http[method](url, params).then((d) => {
      const {list, lastSequence, headSequence} = d
      if (!reload) {
        object$.data = object$.data.concat(list)
        object$.lastSequence = lastSequence || false
        object$.headSequence = headSequence
      } else {
        list.map(d => {
          object$.data.unshift(d)
        })
      }
      cb && cb()
    })
  }
}
