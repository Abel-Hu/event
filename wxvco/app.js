const vco = require('./vco/index')
const o = vco.app({
  vco,
  *launch () {
    yield this.props.member.getMember()
  }
}, {member: 'wechat/member'})
App(o)
