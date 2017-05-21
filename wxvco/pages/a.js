const {page, regeneratorRuntime} = wx.vco
const o = page({

  onShow() {
    this.props.todo.utxt()
  },
  onHide() {
    this.props.todo.ut()
  },
  * onLoad () {
    yield this.props.member.getMember()
  }
}, {todo: 'todo', member: 'wechat/member'})
Page(o)
