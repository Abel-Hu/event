const vco = require('./vco/index')
const {app} = vco
const o = {
  onLaunch() {
    this.props.member.getMember(() => {
      this.props.system.checkToken((data) => {
        if (data.code === 200002) {
          this.props.member.getMember(true)
        } else if (data.token) {
          this.props.member.updateToken(data.token)
        }
      })
    })
  }
}
app(o, {system: 'system', member: 'wechat/member'})
