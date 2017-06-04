const {page} = wx.vco
const o = {
  onLoad () {
    wx.setNavigationBarTitle({title: '我发布的活动'})
    this.props.manage.getEventlist(false, () => {})
  },
  onPullDownRefresh(){
    this.props.manage.getEventlist(true, () => {
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom(){
    wx.showNavigationBarLoading()
    this.props.manage.getEventlist(false, () => {
      wx.hideNavigationBarLoading()
    })
  }
}
page(o, {manage: 'manage'})