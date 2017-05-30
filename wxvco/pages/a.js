const {page,co} = wx.vco
const o = page({

  onShow() {
    this.props.todo.utxt()
  },
  onHide() {
    this.props.todo.ut()
  },
  onLoad () {
    console.log('onload')
   co.call(this,function*(){
     yield this.props.member.getMember()
   })
  }
}, {todo: 'todo', member: 'wechat/member'})
Page(o)
