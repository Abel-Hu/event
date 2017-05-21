const {page,regeneratorRuntime}  = getApp().vco;

Page(page({

  onShow(){
    this.props.todo.utxt()
  },
  onHide(){
    this.props.todo.ut()
  },
  * onLoad () {
    const {code} = yield wx.login()
    const member = yield wx.getUserInfo()
    this.props.todo.setUser(member.userInfo)
  }
},{todo:'todo'}))
