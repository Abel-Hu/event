const mobx = require('./mobx')
const {observer} = require('./observer')
const wxToPromise = require('./wx')
const regeneratorRuntime = require('./regenerator-runtime')
const co = require('./co')
const Store = require('./Store')
//
const page = function (o, inject) {
  injectStore(o, inject)
  return observer(async(o))
}
const app = function (o, inject) {
  injectStore(o, inject)
  return o
}
const propsCache = {}
const injectStore = function (o, inject) {
  o.props = o.props || {}
  if (typeof inject === 'object') {
    Object.keys(inject).map((key) => {
      if (!propsCache[inject[key]]) {
        const cls = require(`../stores/${inject[key]}`)
        propsCache[inject[key]] = new cls
      }
      o.props[key] = propsCache[inject[key]]
    })
  }
}
const async = function (o) {
  try {
    co.call(o, function *() {
      yield o
    })
    return o // 继承对象返回 关联全局 到page
  } catch (e) {
    console.error(e)
  }
}
// init
wxToPromise()
//
module.exports = {
  mobx,
  page,
  observer,
  co,
  regeneratorRuntime,
  Store,
  app
}
