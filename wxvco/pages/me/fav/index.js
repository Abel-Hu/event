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
  },
  bindFav(e){
    const {item, index} = e.currentTarget.dataset
    const self = this
    wx.showModal({
      title: '提示',
      content: '确定取消收藏?',
      confirmColor:'#3d98ff',
      success(res) {
        console.log(res)
        if (res.confirm) {
          self.props.event.unfav(item.eventId, index)
          console.log(index)
          self.props.user.delFavItem(index)
        } else if (res.cancel) {
        }
      }
    })
  }
}
page(o, {user: 'user', event: 'event'})