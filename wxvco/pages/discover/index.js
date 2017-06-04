/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o = {

  onLoad () {
    wx.setNavigationBarTitle({
      title: '发现'
    })
    this.props.event.getList(false, () => {

    })
  },
  bindFav(e){
    const {item, index} = e.currentTarget.dataset
    if (item.isFav) {
      this.props.event.unfav(item.eventId, index)
    } else {
      this.props.event.fav(item.eventId, index)
    }
  },
  onPullDownRefresh(){
    this.props.event.getList(true, () => {
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom(){
    wx.showNavigationBarLoading()
    this.props.event.getList(false, () => {
      wx.hideNavigationBarLoading()
    })
  }
}
page(o, {member: 'wechat/member', event: 'event'})