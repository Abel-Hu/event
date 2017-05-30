const vco = require('./vco/index')
wx.vco = vco
const {app} = vco
const o = {
  onLaunch(){
    console.log('onLaunch')
  }
}
App(app(o))
