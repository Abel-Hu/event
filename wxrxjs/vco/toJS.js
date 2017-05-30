/**
 * Created by ken on 2017/5/29.
 */
const Rx = require('./rx')
const {
  isObservable
} = Rx.Observable

module.exports = function toJS (source) {

  if (isObservable(source)) {
    return
  }

  if (Object.prototype.toString.call(source) === '[object Array]') {
    return source.map(function (value) {
      return toJS(value)
    })
  }
  if (source !== null && typeof source === 'object') {
    let res = {}
    for (let key in source) {
      res[key] = toJS(source[key])
    }
    return res
  }
  return source
}