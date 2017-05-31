const mobx = require('./mobx')
const {observer} = require('./observer')
const wxToPromise = require('./wx')
const Store = require('./Store')
const http = require('./http')
//
const page = function (o, inject) {
  injectStore(o, inject)
  return observer(o)
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
// init
wxToPromise()
//
module.exports = {
  mobx,
  page,
  observer,
  Store,
  app,
  http
}
