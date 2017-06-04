const {page} = wx.vco
const o = {
  onLoad () {
    wx.setNavigationBarTitle({title: '我参与的活动'})
    this.props.user.getJoinlist(false, () => {})
  },
  onPullDownRefresh(){
    this.props.user.getJoinlist(true, () => {
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom(){
    wx.showNavigationBarLoading()
    this.props.user.getJoinlist(false, () => {
      wx.hideNavigationBarLoading()
    })
  }
}
page(o, {user: 'user'})
