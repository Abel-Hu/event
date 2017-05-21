const {page, regeneratorRuntime} = getApp().vco
const o = page({

  onShow() {
    this.props.todo.utxt()
  },
  onHide() {
    this.props.todo.ut()
  },
  onLoad () {

  }
}, {todo: 'todo', member: 'wechat/member'})
Page(o)
