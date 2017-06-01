const vco = require('./vco/index')
wx.vco = vco
const {app} = vco
const o = class {
  onLaunch(){
    console.log('onLaunch',this.props)
  }
}
app(o, {system: 'system', member: 'wechat/member'})
