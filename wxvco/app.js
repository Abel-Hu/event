const vco = require('./vco/index')
wx.vco = vco
const {app} = vco
const o = app({
  vco,
  onLaunch(){
    console.log('onLaunch')
  }
})
App(o)
