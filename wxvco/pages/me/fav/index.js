const {page} = wx.vco
const o = {
  onLoad () {
    wx.setNavigationBarTitle({title: '我的收藏'})
    this.props.user.getFavlist(false, () => {})
  },
  onPullDownRefresh(){
    this.props.user.getFavlist(true, () => {
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom(){
    wx.showNavigationBarLoading()
    this.props.user.getFavlist(false, () => {
      wx.hideNavigationBarLoading()
    })
  }
}
page(o, {user: 'user'})