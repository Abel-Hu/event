const vco = require('./vco/index')
wx.vco = vco
const {app} = vco
const o = {
  onLaunch(){
    console.log('onLaunch',this.props)
  }
}
App(app(o, {system: 'system', member: 'wechat/member'}))
