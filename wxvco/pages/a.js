const {page} = wx.vco
const o = {
  onShow() {
    this.props.todo.utxt()
  },
  onHide() {
    this.props.todo.ut()
  },
  onLoad () {
    this.props.member.getMember()
  }
}
Page(page(o, {todo: 'todo', member: 'wechat/member'}))
